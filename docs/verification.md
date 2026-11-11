# Verificação desta entrega

## Executado

- TypeScript e build Vite de produção.
- Testes de privacidade, paginação, falhas de rede e atualização do currículo.
- Geração dos cinco formatos de currículo com o código real da aplicação.
- Extração de texto do PDF com Poppler e do XML do DOCX: nome, acentos, histórico, projetos e ausência de endereços de e-mail pessoais.
- Inspeção visual da primeira página do PDF: fonte incorporada, texto selecionável e estrutura em uma coluna.
- Testes de lógica de interface em DOM simulado: abas, comandos por teclado, menu para toque, sete descobertas, pausa, abertura/fechamento de diálogos e fallback da API.
- Os registros públicos foram consultados diretamente no GitHub, e os dados profissionais foram fornecidos pelo titular.

## GitHub Actions

O código foi enviado ao repositório público `SorPuti/synthosia-atlas`. As rotinas de verificação e atualização diária foram disparadas, mas o GitHub não iniciou os jobs. A anotação retornada foi: `The job was not started because your account is locked due to a billing issue.`

Oito testes e o build foram executados localmente com sucesso. A rotina diária está configurada, mas sua execução depende da liberação da conta no GitHub Actions. A API online da Vercel não depende dessas rotinas; consulta o GitHub público diretamente. A cópia salva permanece com a data da consulta indicada no site.

## Limite de verificação visual

O ambiente gerenciado desta conversa não ofereceu `cua_repl.js` nem outra ferramenta nativa de controle de Chrome. O desktop foi declarado `enabled: true`, com estado `unknown`, no executor `ccarenv_b64_Y2NhcmVudl8zZDUzZTUxOWE1ZTQ4MTkxODNlNDhmYWRhNmZkYTIwZA`. Não houve revisão renderizada do site em navegador, captura de tela do site ou medição de Lighthouse. Os testes de DOM não verificam o layout, foco nativo de diálogos, downloads reais no navegador ou animações.

Antes de apontar o domínio, conferir no preview da Vercel: telas estreitas e largas, contraste, aba ativa, teclado, `Escape`, exportação dos cinco formatos, preferência por movimento reduzido e `/api/profile`. A imagem `public/og.png` é uma arte de compartilhamento, não uma captura do site.
