import person from "./data/person.json";
import {
  buildResume,
  resumeBlocks,
  toText,
  toMarkdown,
} from "../lib/resume.mjs";
import type { PublicData } from "./live";

function save(blob: Blob, extension: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `Lucas-Luh-Gomes-Curriculo.${extension}`;
  document.body.append(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 30_000);
}
export async function downloadResume(format: string, data: PublicData) {
  const resume = buildResume(person, data);
  if (format === "json")
    return save(
      new Blob([JSON.stringify(resume, null, 2)], {
        type: "application/json;charset=utf-8",
      }),
      "json",
    );
  if (format === "txt")
    return save(
      new Blob([toText(resume)], { type: "text/plain;charset=utf-8" }),
      "txt",
    );
  if (format === "md")
    return save(
      new Blob([toMarkdown(resume)], { type: "text/markdown;charset=utf-8" }),
      "md",
    );
  const blocks = resumeBlocks(resume);
  if (format === "pdf") {
    const [{ PDFDocument, rgb }, { default: fontkit }] = await Promise.all([
      import("pdf-lib"),
      import("@pdf-lib/fontkit"),
    ]);
    const pdf = await PDFDocument.create();
    pdf.setTitle(`Currículo — ${person.name}`);
    pdf.setAuthor(person.name);
    pdf.setSubject(
      "Experiência profissional, competências e projetos open source",
    );
    pdf.setLanguage("pt-BR");
    pdf.registerFontkit(fontkit);
    const fonts = await Promise.all(
      ["/fonts/font-0.ttf", "/fonts/font-2.ttf"].map(async (url) => {
        const response = await fetch(url);
        if (!response.ok) throw new Error("Fonte local indisponível");
        return response.arrayBuffer();
      }),
    );
    const regular = await pdf.embedFont(fonts[0], { subset: true });
    const bold = await pdf.embedFont(fonts[1], { subset: true });
    let page = pdf.addPage([595.28, 841.89]);
    let y = 791;
    for (const block of blocks) {
      const isHeading = block.kind === "heading";
      if (isHeading && block.text === "PROJETOS OPEN SOURCE" && y < 500) {
        page = pdf.addPage([595.28, 841.89]);
        y = 791;
      }
      const font = ["heading", "name", "strong"].includes(block.kind)
        ? bold
        : regular;
      const size =
        block.kind === "name"
          ? 19
          : isHeading
            ? 11
            : block.kind === "muted"
              ? 9
              : 10;
      const lineHeight = size * 1.3;
      const safeText = block.text;
      const words = safeText.split(/\s+/);
      const lines: string[] = [];
      let line = "";
      for (const word of words) {
        if (font.widthOfTextAtSize(`${line} ${word}`.trim(), size) > 495) {
          if (line) lines.push(line);
          line = "";
        }
        // Wrap long URLs and identifiers without cutting them off the page.
        let fragment = "";
        for (const char of word) {
          if (font.widthOfTextAtSize(fragment + char, size) > 495) {
            lines.push(fragment);
            fragment = "";
          }
          fragment += char;
        }
        line = line ? `${line} ${fragment}` : fragment;
      }
      if (line) lines.push(line);
      const required =
        lineHeight * (isHeading ? 3 : Math.min(lines.length, 2)) + 12;
      if (y - required < 50) {
        page = pdf.addPage([595.28, 841.89]);
        y = 791;
      }
      if (isHeading) y -= 10;
      for (const text of lines) {
        if (y - lineHeight < 50) {
          page = pdf.addPage([595.28, 841.89]);
          y = 791;
        }
        page.drawText(text, {
          x: 50,
          y,
          font,
          size,
          color: rgb(0.08, 0.08, 0.08),
        });
        y -= lineHeight;
      }
      y -= block.kind === "strong" ? 3 : 4;
    }
    pdf
      .getPages()
      .forEach((p, i) =>
        p.drawText(`${i + 1} / ${pdf.getPageCount()}`, {
          x: 520,
          y: 27,
          font: regular,
          size: 8,
          color: rgb(0.35, 0.35, 0.35),
        }),
      );
    const bytes = await pdf.save();
    return save(
      new Blob([bytes as BlobPart], { type: "application/pdf" }),
      "pdf",
    );
  }
  if (format === "docx") {
    const { Document, Packer, Paragraph, TextRun, HeadingLevel } = await import(
      "docx"
    );
    const document = new Document({
      creator: person.name,
      title: `Currículo — ${person.name}`,
      styles: {
        default: {
          document: {
            run: { font: "Arial", size: 21 },
            paragraph: { spacing: { after: 100 } },
          },
        },
      },
      sections: [
        {
          properties: {
            page: { margin: { top: 800, bottom: 800, left: 900, right: 900 } },
          },
          children: blocks.map(
            (b) =>
              new Paragraph({
                ...(b.kind === "heading"
                  ? { heading: HeadingLevel.HEADING_1 }
                  : b.kind === "name"
                    ? { heading: HeadingLevel.TITLE }
                    : {}),
                keepNext: ["heading", "name", "strong"].includes(b.kind),
                children: [
                  new TextRun({
                    text: b.text,
                    bold: ["heading", "name", "strong"].includes(b.kind),
                    size:
                      b.kind === "name" ? 38 : b.kind === "heading" ? 24 : 21,
                    color: "141414",
                  }),
                ],
              }),
          ),
        },
      ],
    });
    return save(await Packer.toBlob(document), "docx");
  }
  throw new Error("Formato de currículo inválido.");
}
