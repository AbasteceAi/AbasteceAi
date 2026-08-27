<script setup>
import { ref, onMounted } from 'vue'
import { usuarioAtual } from '@/services/auth'
import { buscarAvaliacoesDoUsuario } from '@/services/avaliacoes'
import { extrairBairro } from '@/services/postos'

const avaliacoes = ref([])
const carregando = ref(true)

onMounted(async () => {
  const user = await usuarioAtual()
  if (!user) return

  avaliacoes.value = await buscarAvaliacoesDoUsuario(user.id)
  carregando.value = false
})

function formatarData(dataISO) {
  return new Date(dataISO).toLocaleDateString('pt-BR')
}

</script>
<template>
<div class="avaliacoes">
   <h1 class="avaliacoesH">Avaliações Recentes</h1>
  <div v-if="carregando"><img src="/imgs/perso.gif" ></div>
  <div v-else-if="avaliacoes == 0">Você ainda não avaliou nenhum posto</div>
  <div v-else class="lista">
<div v-for="avaliacao in avaliacoes" :key="avaliacao.id" class="card">
<div class="imgExib">
 <img :src="avaliacao.postos?.foto_url" alt="avaliacao.postos?.nome" class="img">
 </div>
 <div class="conteudo">
 <div class="bloco1">
 <div>
   <h2 class="nome">{{ avaliacao.postos?.nome ?? 'posto removido'}} - {{ extrairBairro(avaliacao.postos?.endereco) }} </h2>
          <span class="estrelas">
<svg v-for="n in 5" :key="n" :class="{ ativa: n <= avaliacao.nota }"
   xmlns:dc="http://purl.org/dc/elements/1.1/"
   xmlns:cc="http://creativecommons.org/ns#"
   xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
   xmlns:svg="http://www.w3.org/2000/svg"
   xmlns="http://www.w3.org/2000/svg"
   xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd"
   xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape"

   viewBox="0 0 30 30"
   version="1.1"
   id="svg822"
   inkscape:version="0.92.4 (f8dce91, 2019-08-02)"
   sodipodi:docname="star-empty.svg">
  <defs
     id="defs816" />
  <sodipodi:namedview
     id="base"
     pagecolor="#ffffff"
     bordercolor="#666666"
     borderopacity="1.0"
     inkscape:pageopacity="0.0"
     inkscape:pageshadow="2"
     inkscape:zoom="12.610071"
     inkscape:cx="2.4316787"
     inkscape:cy="24.093449"
     inkscape:document-units="px"
     inkscape:current-layer="layer1"
     showgrid="true"
     units="px"
     inkscape:window-width="1366"
     inkscape:window-height="713"
     inkscape:window-x="0"
     inkscape:window-y="0"
     inkscape:window-maximized="1"
     showguides="false"
     inkscape:guide-bbox="true">
    <sodipodi:guide
       position="21.126168,22.794393"
       orientation="1,0"
       id="guide1575"
       inkscape:locked="false" />
    <sodipodi:guide
       position="22.682243,23.285047"
       orientation="1,0"
       id="guide1635"
       inkscape:locked="false" />
    <sodipodi:guide
       position="22.682243,7.6455921"
       orientation="0,1"
       id="guide1639"
       inkscape:locked="false" />
    <sodipodi:guide
       position="18.859863,18.859863"
       orientation="1,0"
       id="guide1242"
       inkscape:locked="false" />
    <inkscape:grid
       type="xygrid"
       id="grid1103" />
  </sodipodi:namedview>
  <metadata
     id="metadata819">
    <rdf:RDF>
      <cc:Work
         rdf:about="">
        <dc:format>image/svg+xml</dc:format>
        <dc:type
           rdf:resource="http://purl.org/dc/dcmitype/StillImage" />
        <dc:title />
      </cc:Work>
    </rdf:RDF>
  </metadata>
  <g
     inkscape:label="Layer 1"
     inkscape:groupmode="layer"
     id="layer1"
     transform="translate(0,-289.0625)">
    <path
       sodipodi:type="star"
       style=" stroke:#fff ;stroke-width:2;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
       id="path861"
       sodipodi:sides="5"
       sodipodi:cx="15.059202"
       sodipodi:cy="305.21106"
       sodipodi:r1="10.35945"
       sodipodi:r2="5.1797247"
       sodipodi:arg1="0.92729522"
       sodipodi:arg2="1.5556137"
       inkscape:flatsided="false"
       inkscape:rounded="0"
       inkscape:randomized="0"
       d="m 21.274872,313.49862 -6.137031,-3.10843 -6.0398293,3.29332 1.0598483,-6.79722 -4.9985463,-4.72653 6.7920533,-1.09248 2.950558,-6.21448 3.137872,6.12203 6.822091,0.88577 -4.852742,4.87611 z"
       inkscape:transform-center-x="0.048601351"
       inkscape:transform-center-y="-0.94290851" />
  </g></svg>
          </span>
          </div>
          <p class="data">{{ formatarData(avaliacao.created_at) }}</p>
</div>
 <div class="comentario">
 <p>"{{ avaliacao.comentario }}"</p>
 </div>
 </div>
</div>
  </div>
</div>
</template>
<style scoped>
.avaliacoesH{
  font-size: 2rem;
  color: #1F2B54;
  margin: 40px;
}
.card{
  display: flex;
  align-items: center;
  gap: 20px;
  margin: 20px;
  padding: 20px;
  background-color: #334582;
  color: #ffffff;
  border-radius: 20px;

}
.imgExib{
  border-radius: 50%;
  background-color:#1F2B54 ;
 padding: 5px;
}
.img {
  width: 80px;
   height: 80px;
  border-radius: 30%;;
  padding: 10px;
}
.conteudo {
  width: 100%;
}
.bloco1{
  display: flex;
 justify-content: space-between;
}
.bloco1 div {
  display: flex;
align-items: center;
gap: 40px;
  justify-content: space-between;
}
.nome{
  font-size: 2rem;
}
.estrelas {
  margin: 6px 0;
 width: 160px;
display: flex;

}
.estrelas svg {
  fill: #334582;
}

.estrelas svg.ativa {
  fill: #ffffff;
}
.data{
  font-size: 20px;
}
.comentario{
  font-size: 15px;
  margin: 20px 0;
}
</style>
