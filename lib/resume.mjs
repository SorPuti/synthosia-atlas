import { cleanText } from "./github.mjs";
export function buildResume(person, github) {
  const map = new Map(github.repos.map((r) => [r.name, r]));
  const projects = person.projects.map((p) => {
    const live = map.get(p.slug);
    return {
      name: p.name,
      description: p.description,
      highlights: [p.detail],
      url: p.url,
      keywords: p.stack.split(" · "),
      ...(live?.createdAt ? { startDate: live.createdAt.slice(0, 10) } : {}),
      ...(live?.pushedAt ? { lastUpdated: live.pushedAt.slice(0, 10) } : {}),
    };
  });
  const excluded = new Set([
    ...person.projects.map((p) => p.slug),
    "SorPuti",
    "synthosia-atlas",
  ]);
  for (const r of github.repos
    .filter((r) => !excluded.has(r.name))
    .slice(0, 2)) {
    projects.push({
      name: r.name,
      description:
        cleanText(r.description) ||
        "Repositório público de código e experimentos.",
      highlights: [],
      url: r.url,
      keywords: r.language ? [r.language] : [],
      ...(r.createdAt ? { startDate: r.createdAt.slice(0, 10) } : {}),
      ...(r.pushedAt ? { lastUpdated: r.pushedAt.slice(0, 10) } : {}),
    });
  }
  return {
    $schema:
      "https://raw.githubusercontent.com/jsonresume/resume-schema/master/schema.json",
    basics: {
      name: person.name,
      label: person.label,
      url: person.website,
      summary: person.summary,
      location: { city: "Itapoá", region: "Santa Catarina", countryCode: "BR" },
      profiles: [
        { network: "GitHub", username: "SorPuti", url: person.github },
        {
          network: "LinkedIn",
          username: "lucas-gomes-b14a83309",
          url: person.linkedin,
        },
      ],
    },
    work: person.work.map((w) => ({
      name: w.name,
      position: w.position,
      startDate: w.startDate,
      ...(w.endDate ? { endDate: w.endDate } : {}),
      summary: w.summary,
      highlights: w.highlights,
    })),
    education: person.education.map((e) => ({
      institution: e.institution,
      ...(e.startDate ? { startDate: e.startDate } : {}),
      ...(e.endDate ? { endDate: e.endDate } : {}),
      ...(e.studyType ? { studyType: e.studyType } : {}),
      courses: [e.status],
    })),
    skills: person.skills,
    projects,
    meta: {
      version: "1.0.0",
      lastModified: github.checkedAt,
      experienceReviewedAt: person.reviewedAt,
      sources: person.sources.map((s) => s.url),
    },
  };
}
export function period(start, end) {
  return `${dateLabel(start)} – ${end ? dateLabel(end) : "atual"}`;
}
function dateLabel(s) {
  if (!s) return "";
  const [year, month] = s.split("-");
  return month ? `${month}/${year}` : year;
}
export function resumeBlocks(resume) {
  const blocks = [];
  const add = (text, kind = "body") => blocks.push({ text, kind });
  add(resume.basics.name, "name");
  add(resume.basics.label, "subtitle");
  add("Itapoá, Santa Catarina, Brasil");
  resume.basics.profiles.forEach((p) => add(`${p.network}: ${p.url}`, "link"));
  add(`Site: ${resume.basics.url}`, "link");
  add("RESUMO PROFISSIONAL", "heading");
  add(resume.basics.summary);
  add("EXPERIÊNCIA PROFISSIONAL", "heading");
  resume.work.forEach((w) => {
    add(`${w.position} | ${w.name}`, "strong");
    add(period(w.startDate, w.endDate), "muted");
    add(w.summary);
    w.highlights.forEach((h) => add(`• ${h}`));
  });
  add("COMPETÊNCIAS", "heading");
  resume.skills.forEach((s) => add(`${s.name}: ${s.keywords.join(", ")}`));
  add("PROJETOS OPEN SOURCE", "heading");
  resume.projects.forEach((p) => {
    add(`${p.name} | ${p.keywords.join(", ")}`, "strong");
    add(p.description);
    p.highlights.forEach((h) => add(h));
    add(p.url, "link");
    if (p.lastUpdated)
      add(`Última atualização de código no GitHub: ${p.lastUpdated}`, "muted");
  });
  add("FORMAÇÃO ACADÊMICA", "heading");
  resume.education.forEach((e) => {
    add(e.institution, "strong");
    add(
      [
        e.studyType,
        e.startDate && `${e.startDate} – ${e.endDate}`,
        ...e.courses,
      ]
        .filter(Boolean)
        .join(" | "),
    );
  });
  add("FONTES E ATUALIZAÇÃO", "heading");
  add(
    `Experiência e formação: LinkedIn, dados fornecidos pela titular, revisados em ${resume.meta.experienceReviewedAt}. GitHub consultado em ${resume.meta.lastModified}.`,
    "muted",
  );
  return blocks;
}
export function toText(resume) {
  return (
    resumeBlocks(resume)
      .map((b) => (b.kind === "heading" ? `\n${b.text}\n` : b.text))
      .join("\n") + "\n"
  );
}
export function toMarkdown(resume) {
  return (
    resumeBlocks(resume)
      .map((b) =>
        b.kind === "name"
          ? `# ${b.text}`
          : b.kind === "heading"
            ? `\n## ${b.text}\n`
            : b.kind === "strong"
              ? `\n**${b.text}**`
              : b.text.replace(/^• /, "- "),
      )
      .join("\n\n") + "\n"
  );
}
