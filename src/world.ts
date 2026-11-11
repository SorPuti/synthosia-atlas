// An authored world: backend terraces, a voice tower, memory rooms and a bridge.
// Its sky settles into night; the buildings and signals remain visible.
export function livingWorld(): string {
  const stars = [
    [55, 75],
    [135, 43],
    [214, 78],
    [309, 40],
    [402, 71],
    [501, 49],
    [472, 139],
    [83, 164],
    [353, 117],
    [173, 129],
    [47, 253],
    [513, 255],
  ];
  return `<div class="living-world" aria-label="Um mundo em construção: linhas viram arquitetura, o céu anoitece e as conexões continuam acesas.">
    <svg class="world-scene" viewBox="0 0 560 520" role="img" aria-labelledby="living-world-title"><title id="living-world-title">O mundo de Luh: construir, lembrar, escutar e conectar.</title>
      <defs><pattern id="world-grid" width="28" height="28" patternUnits="userSpaceOnUse"><path d="M28 0H0V28" fill="none" stroke="currentColor" stroke-width=".6" opacity=".1"/></pattern><radialGradient id="world-lamp"><stop stop-color="#ffd590" stop-opacity=".55"/><stop offset="1" stop-color="#ffd590" stop-opacity="0"/></radialGradient></defs>
      <rect width="560" height="520" fill="url(#world-grid)"/>
      <g class="world-stars" fill="currentColor">${stars.map(([x, y], i) => `<circle cx="${x}" cy="${y}" r="${i % 3 === 0 ? 1.6 : 1}" style="--star-delay:${i * 0.4}s"/>`).join("")}</g>
      <g class="world-construction" fill="none" stroke="currentColor" stroke-width=".8"><ellipse cx="280" cy="279" rx="218" ry="171" stroke-dasharray="2 7"/><path d="M280 67v405M35 279h490" stroke-dasharray="3 8"/><path d="M38 38h18m-9-9v18M504 38h18m-9-9v18M38 477h18m-9-9v18M504 477h18m-9-9v18"/></g>
      <g class="world-orbits" fill="none" stroke="currentColor" opacity=".4"><ellipse cx="280" cy="279" rx="247" ry="82" transform="rotate(-23 280 279)"/><ellipse cx="280" cy="279" rx="225" ry="70" transform="rotate(23 280 279)"/></g>
      <g class="world-island" stroke="currentColor" stroke-width="1.2" stroke-linejoin="round"><path d="m87 317 193-96 193 96-193 109z" fill="var(--world-land)"/><path d="m87 317 193 109 193-109-40 52-153 107-150-104z" fill="var(--world-rock)"/><path d="m130 372 150 72 153-75M280 426v50m-83-94-31 33m197-34 28 35" fill="none" opacity=".5"/></g>
      <g class="world-architecture" fill="var(--world-buildings)" stroke="currentColor" stroke-width="1.1" stroke-linejoin="round">
        <g class="world-backend"><path d="m136 305 51-26 49 26-49 28zM136 305v15l51 28 49-28v-15M136 288l51-26 49 26-49 28zM136 288v14l51 28 49-28v-14M136 270l51-26 49 26-49 28zM136 270v15l51 28 49-28v-15"/><path d="M153 281v9m12-3v9m-12 3v9m12-3v9" stroke="var(--world-light)"/></g>
        <g class="world-memory"><path d="m280 278 51-28 45 26v60l-45 28-51-29z"/><path d="m280 278 51 27 45-29m-45 29v59M291 295v30l26 14v-30z"/><path d="m342 311 20-12v14l-20 12zm0 25 20-12v14l-20 12z" fill="var(--world-light)" stroke-width=".6"/></g>
        <g class="world-voice"><path d="m335 203 29-16 28 15v72l-28 16-29-16z"/><path d="m335 203 29 16 28-17m-28 17v71M343 230v23m5-31v40m6-34v22m18-16v28m6-36v29m6-33v24" stroke="var(--world-light)"/></g>
        <g class="world-collab"><path d="m207 226 27-15 27 15v50l-27 16-27-16zM253 189l25-14 25 14v48l-25 14-25-14z"/><path d="m207 226 27 16 27-16m-27 16v50m19-103 25 14 25-14m-25 14v48"/><path d="m235 258 43-38v10l-43 38z" fill="var(--world-light)"/></g>
      </g>
      <g class="world-windows" fill="var(--world-light)"><path d="m216 245 7 4v12l-7-4zm25 5 7-4v12l-7 4zm20-44 7 4v12l-7-4zm25 1 8-5v12l-8 5z"/><circle cx="187" cy="260" r="3"/><circle cx="333" cy="337" r="3"/></g>
      <g class="world-lights" fill="url(#world-lamp)"><circle cx="186" cy="263" r="35"/><circle cx="278" cy="200" r="35"/><circle cx="365" cy="230" r="38"/><circle cx="332" cy="334" r="30"/></g>
      <g class="world-pulses" fill="none" stroke="var(--world-light)" stroke-width="1.5"><path d="m186 334 49 29 45-25 52 28 72-42"/><path d="m278 249 17-11 31 18 30-16"/></g>
      <g class="shared-thread" fill="none" stroke="var(--world-light)" stroke-width="2"><path pathLength="1" d="M187 260Q145 140 278 195T364 225Q450 370 332 333T187 260"/></g>
      <g class="seed-tree" stroke="currentColor" fill="var(--world-leaf)" stroke-linejoin="round"><path d="M267 353v-48m0 32-13-10m13 3 14-12" fill="none" stroke-width="2"/><path d="M267 313q-25-12-10-27 13-15 21 2 19 1 15 15-2 13-26 10z"/></g>
      <g class="world-lighthouse" stroke="currentColor" stroke-width="1"><path d="m423 296 12-7 12 7v28l-12 7-12-7z" fill="var(--world-buildings)"/><path d="m419 289 16-11 16 11-16 9z" fill="var(--world-light)"/><path class="beacon-rays" d="m435 287-120-55v50zm0 0 97-59v58z" fill="var(--world-light)" stroke="none"/></g>
      <g class="world-satellite"><circle cx="104" cy="211" r="4" fill="var(--world-light)"/><circle cx="104" cy="211" r="11" fill="none" stroke="currentColor" opacity=".4"/></g>
      <g class="world-labels" font-family="IBM Plex Mono,monospace" font-size="7" fill="currentColor" letter-spacing="1"><text x="99" y="249">CONSTRUIR</text><text x="230" y="151">CONECTAR</text><text x="376" y="178">ESCUTAR</text><text x="356" y="378">LEMBRAR</text><text x="38" y="499">UM EXPERIMENTO DE CADA VEZ.</text></g>
      <text class="world-hidden-words" x="280" y="101" text-anchor="middle" font-family="Instrument Serif,serif" font-size="23" font-style="italic" fill="currentColor">o que ainda não existe pode começar aqui.</text>
    </svg>
    <div class="world-phase mono" aria-hidden="true"><span class="world-day-label">LINHAS → IDEIAS → MUNDOS</span><span class="world-night-label">A NOITE CHEGA. O MUNDO CONTINUA.</span></div>
  </div>`;
}
