# Synthosia — Mundos em construção

Portfólio interativo de **Lucas (Luh) Gomes**, engenheiro de software. Um atlas pessoal sobre backend, ferramentas para desenvolvedores e projetos open source.

[Visitar o site](https://synthosia.com) · [GitHub](https://github.com/SorPuti) · [LinkedIn](https://www.linkedin.com/in/lucas-gomes-b14a83309/)

## O projeto

- Identidade editorial, retrato do GitHub e ilustrações vetoriais originais.
- Um mundo animado que atravessa o dia e a noite.
- Projetos, trajetória e atividade pública do GitHub.
- Currículo em PDF, DOCX, TXT, Markdown e JSON Resume.
- Página 404 própria, minijogos e caminhos escondidos para explorar.
- Movimento reduzido, navegação por teclado e dados de reserva quando a API está indisponível.

## Tecnologias

TypeScript, Vite, SVG/CSS, Vercel Functions, GitHub API, pdf-lib e docx. Fontes hospedadas localmente; sem analytics.

## Desenvolvimento

Node.js 24.

```sh
npm ci
npm run dev
npm test
npm run build
```

O build gera `dist/`. Os testes de documentos utilizam Poppler (`pdftotext`) e `unzip`.

## Licença

Código sob a [licença MIT](LICENSE). Identidade, conteúdo pessoal, fotografia e fontes seguem os termos de [NOTICE.md](NOTICE.md).
