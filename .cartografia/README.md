# Cartografia das entrelinhas

Se você achou este arquivo, já entendeu a ideia. Aqui estão os **20 easter eggs** do atlas. Este guia fica no repositório, fora do build público do site.

## No atlas

| # | Descoberta | Como encontrar | O que acontece |
|---|---|---|---|
| 01 | A bússola insiste | Clique **3 vezes** na marca do cabeçalho; intervalo máximo de 1,8 s entre cliques. | A marca ganha movimento de bússola. |
| 02 | Terra incognita | Clique no **?** do mundo. | Uma carta sobre territórios sem nome. |
| 03 | A palavra abre a porta | Digite **`mundos`**. | Uma carta de quem continua criando. |
| 04 | Continue? | **↑ ↑ ↓ ↓ ← → ← → B A**. | Uma pequena ilha em pixel art. |
| 05 | Uma resposta na margem | Caderno → Entrelinhas → **42**. | Uma homenagem à resposta e à pergunta. |
| 06 | O outro lado do atlas | Digite **`noite`**. | Alterna a iluminação da página. |
| 07 | O mapa respondeu | Digite **`sinal`** → Ouvir o sinal. | Duas notas sintetizadas; áudio só após o clique. |
| 08 | Fora do enquadramento | Clique **2 vezes** no retrato do GitHub. | Um retrato em moldura e a pessoa por trás do mapa. |
| 09 | Antes da matéria | Digite **`azul`**. | Transforma o atlas em uma planta azul. Repita para voltar. |
| 10 | As ideias têm órbita | Digite **`orbita`**. | Revela as órbitas do mundo. Repita para recolher. |
| 11 | Escutar também é construir | Digite **`eco`**. | Uma breve conversa animada, inspirada no TalkWeave. |
| 12 | Uma semente no código | Digite **`semente`**. | Planta uma árvore entre as construções da ilha. |
| 13 | O fio entre as coisas | Digite **`juntos`**. | Costura backend, memória, voz e colaboração com um fio luminoso. |

## Para quem sai do mapa

Abra **`/coordenada-perdida`** ou qualquer endereço inexistente. A página preserva o status HTTP **404**. Há um atalho discreto em Caderno → Entrelinhas → “e se eu sair do mapa?”.

| # | Descoberta | Como encontrar | O que acontece |
|---|---|---|---|
| 14 | 404 não é o fim | Clique nos algarismos **4 → 0 → 4**, da esquerda para a direita. | Abre um portal de volta aos projetos. Uma ordem errada reinicia a sequência. |
| 15 | O farol de quem se perde | Clique na pequena **✧** sobre o farol da ilha. | Acende o feixe de luz. |
| 16 | A palavra que faltava | Digite **`ainda`** na 404. | Uma frase aparece no céu. |

## Da bancada para os mundos

| # | Descoberta | Como encontrar | O que acontece |
|---|---|---|---|
| 17 | Aos doze, um mundo no terminal | Digite **`doze`** ou vá a Caderno → Origens → “abrir uma velha gaveta”. | A memória de aprender Java aos 12, da cobrinha e dos servidores de Minecraft. |
| 18 | Um primeiro mundo de cobrinha | Digite **`cobrinha`** e pressione Começar. | Uma cobrinha jogável em um terminal de 12 × 12, com setas, pausa, pontuação e controles de toque. |
| 19 | Só mais um bloco | Digite **`blocos`**. | Um terreno isométrico 5 × 5. Clique ou use Tab e Enter para construir até três camadas; o toque seguinte volta ao chão. |
| 20 | O rei da informática | Digite **`bancada`**. | Uma homenagem ao pai de Luh. Escolha Celular, PS2 ou Componentes para abrir cada lembrança da bancada. |

Os comandos comuns também funcionam na 404. Com todas as 20 descobertas, a próxima carta recebe um selo de cartógrafo.

## Sem teclado

No atlas, toque **3 vezes na anotação em itálico** de qualquer página do caderno. Um menu secreto oferece os treze caminhos por palavras/código. Na 404, toque em **“ainda…”** na margem para abrir o mesmo menu e a palavra exclusiva desse território. Bússola, retrato, `?`, `42`, os algarismos e o farol funcionam por toque ou foco + Enter.

## Pequenos detalhes

- Os comandos são ignorados dentro de campos editáveis e diálogos abertos. Feche a carta antes de tentar o próximo.
- As descobertas ficam apenas no `localStorage`, sob `luh-atlas-discoveries`, e acompanham a visita entre o atlas e a 404. O progresso antigo de sete caminhos é preservado.
- Semente, fio, farol e frase reaparecem nas próximas visitas. Luz noturna, planta azul e órbitas são modos da visita atual.
- **Ⅱ** pausa o movimento. **↻** reconstrói o mundo desde o amanhecer. O cenário chega à noite em 45 segundos e mantém sinais, janelas e estrelas visíveis.
- `prefers-reduced-motion` mostra a composição estática e legível. A cobrinha só se move depois de Começar; fechar o diálogo encerra seu timer.
- `/about` leva diretamente a `/#trajetoria`; não é uma coordenada perdida.

As lembranças de infância foram fornecidas por Luh nesta conversa; o código dos minijogos e a arte dos blocos são originais.
