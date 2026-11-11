export function globe(): string {
  const meridians = [22, 47, 75, 104, 130, 152]
    .map((r) => `<ellipse cx="280" cy="270" rx="${r}" ry="168"/>`)
    .join("");
  const parallels = [-130, -96, -52, 0, 52, 96, 130]
    .map(
      (y) =>
        `<ellipse cx="280" cy="${270 + y}" rx="${Math.sqrt(168 ** 2 - y ** 2)}" ry="${Math.max(8, (1 - Math.abs(y) / 190) * 38)}"/>`,
    )
    .join("");
  return `<svg viewBox="0 0 560 570" class="atlas-globe" role="img" aria-labelledby="globe-title"><title id="globe-title">Um mundo em linhas, conectado a quatro territórios: backend, voz, agentes e colaboração.</title>
  <defs><pattern id="map-grid" width="28" height="28" patternUnits="userSpaceOnUse"><path d="M28 0H0V28" fill="none" stroke="currentColor" opacity=".08"/></pattern><clipPath id="sphere"><circle cx="280" cy="270" r="168"/></clipPath></defs>
  <rect x="10" y="15" width="540" height="530" fill="url(#map-grid)"/>
  <g class="map-guides" fill="none" stroke="currentColor" stroke-width=".65"><circle cx="280" cy="270" r="224" stroke-dasharray="2 7"/><path d="M280 25V515M35 270H525" stroke-dasharray="3 6"/><path d="M35 45h20m-10-10v20M505 45h20m-10-10v20M35 505h20m-10-10v20M505 505h20m-10-10v20"/></g>
  <g class="sphere-lines" clip-path="url(#sphere)" fill="none" stroke="currentColor" stroke-width=".65" transform="rotate(-23 280 270)">${meridians}${parallels}</g><circle cx="280" cy="270" r="168" fill="none" stroke="currentColor" stroke-width=".9"/>
  <g class="orbit-path" fill="none" stroke="var(--accent)" stroke-width="1.2"><ellipse cx="280" cy="270" rx="244" ry="83" transform="rotate(-33 280 270)"/><ellipse cx="280" cy="270" rx="202" ry="209" transform="rotate(18 280 270)" opacity=".3" stroke-dasharray="3 8"/></g>
  <g stroke="var(--paper)" stroke-width="5" fill="var(--accent)"><circle cx="435" cy="144" r="7"/><circle cx="107" cy="369" r="6"/><circle cx="361" cy="404" r="6"/><circle cx="205" cy="113" r="5"/></g>
  <g fill="currentColor" font-family="IBM Plex Mono,monospace" font-size="9" letter-spacing="1.2"><text x="436" y="124">01 / COLABORAÇÃO</text><text x="37" y="399">02 / VOZ</text><text x="370" y="432">03 / AGENTES</text><text x="105" y="94">04 / BACKEND</text><text x="271" y="30">N</text><text x="271" y="534">S</text><text x="32" y="259">O</text><text x="515" y="259">L</text></g>
  <g class="satellite" aria-hidden="true"><circle cx="280" cy="46" r="4" fill="var(--accent)"/><circle cx="280" cy="46" r="11" fill="none" stroke="var(--accent)" opacity=".5"/></g>
  <path d="M272 270h16m-8-8v16" stroke="var(--accent)" stroke-width="1.5"/></svg>`;
}
export function projectArt(index: number): string {
  if (index === 0)
    return `<svg viewBox="0 0 600 360" aria-label="Diagrama de documentos conectados por um relay" role="img"><g fill="none" stroke="currentColor" stroke-width="1"><path d="M120 120H230L300 180L380 115H490M120 250H230L300 180L385 250H490" class="signal-lines"/><circle cx="300" cy="180" r="54"/><circle cx="300" cy="180" r="67" stroke-dasharray="2 7"/><rect x="64" y="77" width="112" height="85"/><rect x="435" y="70" width="112" height="85"/><rect x="64" y="208" width="112" height="85"/><rect x="435" y="208" width="112" height="85"/><path d="M80 100h52m-52 13h76m-76 13h60M451 93h52m-52 13h76m-76 13h60M80 231h52m-52 13h76m-76 13h60M451 231h52m-52 13h76m-76 13h60" opacity=".6"/></g><g fill="var(--accent)"><circle cx="300" cy="180" r="6"/><circle cx="120" cy="120" r="3"/><circle cx="490" cy="115" r="3"/><circle cx="120" cy="250" r="3"/><circle cx="490" cy="250" r="3"/></g><g class="diagram-text"><text x="277" y="211">RELAY</text><text x="65" y="62">LUH / DOCUMENTO A</text><text x="434" y="55">VOCÊ / DOCUMENTO A</text><text x="65" y="315">VERSÃO LOCAL</text><text x="434" y="315">VERSÃO LOCAL</text></g></svg>`;
  if (index === 1) {
    const wave = (y: number, phase: number) =>
      Array.from(
        { length: 100 },
        (_, i) =>
          `${i ? "L" : "M"}${55 + i * 5} ${y + Math.sin(i * 0.45 + phase) * Math.sin(i * 0.065) * 30}`,
      ).join(" ");
    return `<svg viewBox="0 0 600 360" role="img" aria-label="Duas ondas de áudio em direções simultâneas"><g fill="none" stroke="currentColor"><path d="M55 105h490M55 245h490" opacity=".25"/><path d="${wave(105, 0)}"/><path d="${wave(245, 2)}" stroke="var(--accent)"/><path d="M55 176H545m-10-5 10 5-10 5M545 190H55m10-5-10 5 10 5" opacity=".4"/></g><g class="diagram-text"><text x="55" y="55">ENTRADA / ESCUTAR</text><text x="55" y="309">SAÍDA / RESPONDER</text><text x="428" y="55">FULL-DUPLEX</text></g><circle cx="300" cy="176" r="4" fill="var(--accent)"/></svg>`;
  }
  if (index === 2)
    return `<svg viewBox="0 0 600 360" role="img" aria-label="Mapa estrutural com validação entre memória e estado atual"><g fill="none" stroke="currentColor"><rect x="55" y="80" width="180" height="210"/><path d="M55 110h180M70 95h4m6 0h4m6 0h4M75 134h140v35H75zm0 52h63v78H75zm78 0h63v78h-63zM235 185h80m-10-5 10 5-10 5M390 185h155"/><circle cx="350" cy="185" r="35"/><path d="m337 185 9 9 18-21M457 120v130M457 120h65m-65 65h65m-65 65h65"/></g><g fill="var(--accent)"><circle cx="535" cy="120" r="7"/><circle cx="535" cy="185" r="7"/><circle cx="535" cy="250" r="7"/></g><g class="diagram-text"><text x="55" y="60">CURRENT / PÁGINA</text><text x="313" y="245">VALIDAÇÃO</text><text x="451" y="60">KNOWN / MAPA</text><text x="55" y="323">O ESTADO ATUAL TEM A ÚLTIMA PALAVRA.</text></g></svg>`;
  return `<svg viewBox="0 0 600 360" role="img" aria-label="Camadas de uma API assíncrona"><g fill="none" stroke="currentColor">${[0, 1, 2, 3].map((i) => `<path d="m100 ${95 + i * 48} 200-60 200 60-200 60z"/>`).join("")}<path d="M300 35v264" stroke="var(--accent)" stroke-dasharray="3 5"/></g><g class="diagram-text"><text x="432" y="56">ROUTES</text><text x="465" y="117">VIEWSETS</text><text x="475" y="179">SCHEMAS</text><text x="450" y="247">PERSISTÊNCIA</text><text x="80" y="329">UMA IDEIA → UMA API → OUTRAS POSSIBILIDADES</text></g><circle cx="300" cy="155" r="6" fill="var(--accent)"/></svg>`;
}
