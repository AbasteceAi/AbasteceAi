 export function mostrarConteudo(ponto){
const statusHtml = ponto.aberto ===  true?
`<p class="status aberto">
<span><svg  version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
	 viewBox="0 0 120 120" enable-background="new 0 0 120 120" xml:space="preserve">
<circle cx="60" cy="60.834" r="54.167"/>
</svg></span>
Aberto  </p>`:
ponto.aberto ===false ?
`<p class="status fechado">
<span><svg  version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
	 viewBox="0 0 120 120" enable-background="new 0 0 120 120" xml:space="preserve">
<circle cx="60" cy="60.834" r="54.167"/>
</svg></span>
Fechado  </p>`:""

const distanciaHtml = ponto.distancia
    ? `<p class="distancia">  <svg fill="#FEC12B"  viewBox="0 0 24 24" class="cursor" data-name="Flat Color" xmlns="http://www.w3.org/2000/svg"><path id="primary" d="M21.4,2.6a2,2,0,0,0-2.27-.42h0L3.2,9.4A2,2,0,0,0,2,11.52a2.26,2.26,0,0,0,1.8,2l5.58,1.13,1.13,5.58a2.26,2.26,0,0,0,2,1.8h.25a2,2,0,0,0,1.87-1.2L21.82,4.87A2,2,0,0,0,21.4,2.6Z" style="fill:#FEC12B;"></path></svg>
        ${ponto.distancia.toFixed(1)} km de você</p>`
    : ""
  return `<div class="faixa-mapa" ></div>
  <div class="contMapa">
    <div class="cont1">
        <img src="${ponto.foto_url}" class="img">
        <h3>${ponto.nome}</h3>
        ${statusHtml}
      </div>
     <div class="cont2">
      ${ponto.endereco}
      ${distanciaHtml}
     </div>
  </div>`
 }
