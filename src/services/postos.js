import { supabase } from '@/data/supabaseClient'
import { calcularDistancia } from '@/utils/distancia'
import { estaAberto } from '@/utils/horario'
export async function buscarPostos() {
  const { data, error } = await supabase
    .from('postos')
    .select(`*, avaliacoes (nota), precos (tipo_combustivel, preco_litro, atualizado_em)`)

  if (error) {
    console.error('Erro ao buscar postos:', error)
    return []
  }

  return data.map(posto => ({
    ...posto,
    aberto:estaAberto(posto.horario)
}))}
export function extrairBairro(endereco) {
  // pega o texto entre " - " e ", Joinville"
  const match = endereco.match(/-\s*([^,]+),\s*Joinville/i)
  return match ? match[1].trim() : null
}

export function obterLoc() {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (position) => resolve({
        lat: position.coords.latitude,
        lng: position.coords.longitude
      }),
      reject
    )
  })
}

export function ordenarPorDistancia(postos, userLat, userLng) {
  return postos.map(p => ({
    ...p,
    distancia: calcularDistancia(userLat, userLng, p.latitude, p.longitude)
  })).sort((a, b) => a.distancia - b.distancia)
}

export async function buscarTipoCombustivel(){
  const {data, error} = await supabase
  .from('precos')
  .select('tipo_combustivel')

  if (error) {
    console.error(error)
    return []
  }
  return [...new Set(data.map(p => p.tipo_combustivel.toLowerCase()))]
}
