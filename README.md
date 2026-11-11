# Mundos em construção — o atlas de Luh Gomes

Um site pessoal para ocupar `synthosia.com` depois do encerramento do antigo produto. Um lugar para a trajetória de Lucas (Luh) Gomes, seus projetos e a vontade de criar mundos.

Papel, tinta, diagramas de arquitetura e sete caminhos escondidos. Sem rastreadores, formulário de contato, e-mail exposto ou dependência de serviços de IA.

## Rodar

Node.js 22.12+ (recomendado: 24).

```sh
npm ci
npm run dev
npm run build
```

`npm run dev` abre o atlas com a cópia salva dos dados. A função `/api/profile` é executada na Vercel. Para testar a função localmente, use `vercel dev` com a CLI da Vercel. Uma resposta indisponível mantém o snapshot e exibe sua data real.

## Publicar na Vercel

1. Importe este repositório em **Add New → Project**.
2. Mantenha o preset **Vite**, `npm run build` e a saída `dist` (já definidos em `vercel.json`).
3. Faça o primeiro deploy e confira projetos, currículo e versão móvel.
4. Em **Settings → Domains**, adicione `synthosia.com` e siga os registros DNS mostrados pela Vercel. Configure também `www` se quiser o redirecionamento.
5. Depois de o novo deploy responder no domínio, desligue o antigo site.

O projeto antigo e seus subdomínios não precisam ser apagados para trocar o site raiz. Em particular, `collab.synthosia.com` aparece no projeto OpenIDEA Collab: mantenha o registro se o relay continuar em uso.

Não é preciso token para publicar. Opcionalmente, defina `GITHUB_PUBLIC_DATA_TOKEN` nas variáveis **server-side** da Vercel para ampliar o limite da API pública. Use acesso mínimo e nunca um prefixo `VITE_`. Não coloque tokens nos arquivos.

## Dados recentes, sem inventar currículo

- `src/data/person.json`: experiência, formação, competências, textos e projetos revisados. Os dados do LinkedIn foram fornecidos pelo titular em 11/11/2026. Curso e diploma da Unifacvest não foram inferidos; a conclusão é prevista para 2026.
- `api/profile.ts`: consulta somente `/users/SorPuti/repos` na API pública. Retorna uma allowlist de campos, exclui forks, arquivos, outros proprietários e repositórios privados e remove endereços de e-mail das descrições. Nenhum endpoint de conta privada é consultado.
- `src/data/github.json`: cópia pública de segurança. Atualize com `npm run refresh` e faça commit; falhas não sobrescrevem o arquivo.
- A Vercel mantém a consulta por 15 minutos, com até uma hora de revalidação em segundo plano. A data da consulta fica visível. O currículo consulta novamente antes do download; usa a cópia salva quando a consulta falha.
- Os quatro projetos selecionados têm descrições revisadas; datas de código são atuais. Até dois outros repositórios públicos próprios recentes também entram no currículo. Forks não são apresentados como trabalhos originais.

A rotina diária de renovação da cópia pública está em `.github/workflows/refresh.yml`. Nesta entrega, o GitHub bloqueou os jobs antes de iniciar por um problema de cobrança da conta. A consulta online na Vercel é independente. Veja [a verificação](docs/verification.md).

**LinkedIn não tem sincronização automática.** A leitura pública foi bloqueada; não há scraping autenticado nem integração que prometa ler a conta. Para atualizar cargos e formação, edite `person.json` com os dados revisados e avance `reviewedAt`. O deploy seguinte aplica a atualização. Não inclua e-mail, telefone, documentos, credenciais ou informações privadas nesse arquivo público.

## Currículo

PDF de texto selecionável, DOCX, TXT, Markdown e JSON Resume. Uma coluna, seções convencionais, datas explícitas, links textuais e nenhuma foto, e-mail ou telefone. A experiência vem do perfil revisado; os projetos incorporam a última consulta ao GitHub. O arquivo informa as datas das duas fontes. A estrutura facilita a leitura por ATS; não existe garantia universal de interpretação ou classificação por sistemas de terceiros.

Os geradores de PDF e Word são carregados só ao exportar. Os dados e o documento são processados no navegador. Não existe envio do currículo para um serviço externo.

## Verificação

```sh
npm test
npm run build
```

Os testes verificam filtragem de dados públicos, ausência de endereços de e-mail, paginação, falhas do GitHub, preservação de datas e os cinco arquivos exportados. O teste de PDF usa `pdftotext` (Poppler); o de DOCX usa `unzip`. Os downloads verificados ficam em `work/verified-cv` (ignorado pelo Git).

Antes da troca de domínio, confira manualmente a navegação com teclado, as abas, o fechamento dos diálogos, os downloads, telas de 320px até desktop e a preferência por movimento reduzido.

## Acessibilidade e privacidade

Navegação sem mouse, abas com setas/Home/End, diálogos nativos, foco visível, alternativa sem JavaScript, respeito a `prefers-reduced-motion` e botão de pausa. O som só toca após clique explícito. As descobertas ficam apenas no `localStorage`; bloquear o armazenamento não interrompe o site. Não há cookies de publicidade nem analytics.

Fontes locais: DM Sans, IBM Plex Mono e Instrument Serif, sob SIL Open Font License. Licenças em `public/fonts/`.

Os mecanismos dos segredos estão em `src/main.ts`. Para uma lista de revisão com spoilers, veja [docs/secrets.md](docs/secrets.md).
