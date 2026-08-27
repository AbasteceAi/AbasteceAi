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
  const match = endereco.match(/-\s*([^,]+),\s*Joinville/i)
  return match ? match[1].trim() : null
}

export function extrairRua(endereco) {
  const match = endereco?.match(/^([^-]+)-/)
  return match ? match[1].trim() : null
}

export async function pesquisarGlobal(termo) {
  const termoBusca = termo.trim()
  if (!termoBusca) return []

  const [{ data: postosData, error: erroPostos }, { data: perfilData, error: erroPerfil }] =
    await Promise.all([
      supabase
        .from('postos')
        .select('id, nome, endereco')
        .or(`nome.ilike.%${termoBusca}%,endereco.ilike.%${termoBusca}%`)
        .limit(10),
      supabase.from('perfil').select('id, nome').ilike('nome', `%${termoBusca}%`).limit(5),
    ])

  if (erroPostos) console.error('Erro ao pesquisar postos:', erroPostos)
  if (erroPerfil) console.error('Erro ao pesquisar perfis:', erroPerfil)

  const termoLower = termoBusca.toLowerCase()
  const ruasVistas = new Set()
  const bairrosVistos = new Set()
  const resultados = []

  for (const posto of postosData ?? []) {
    if (posto.nome?.toLowerCase().includes(termoLower)) {
      resultados.push({ tipo: 'Posto', texto: posto.nome, id: posto.id })
    }

    const rua = extrairRua(posto.endereco)
    if (rua && rua.toLowerCase().includes(termoLower) && !ruasVistas.has(rua)) {
      ruasVistas.add(rua)
      resultados.push({ tipo: 'Rua', texto: rua, id: posto.id })
    }

    const bairro = extrairBairro(posto.endereco)
    if (bairro && bairro.toLowerCase().includes(termoLower) && !bairrosVistos.has(bairro)) {
      bairrosVistos.add(bairro)
      resultados.push({ tipo: 'Bairro', texto: bairro })
    }
  }

  for (const perfil of perfilData ?? []) {
    resultados.push({ tipo: 'Usuário', texto: perfil.nome, id: perfil.id })
  }

  return resultados.slice(0, 8)
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

export async function enviarAvaliacao({ postoId, usuarioId, nota, comentario }) {
  const { error } = await supabase
    .from('avaliacoes')
    .insert({ posto_id: postoId, usuario_id: usuarioId, nota, comentario })

  if (error) {
    console.error('Erro ao enviar avaliação:', error)
    throw error
  }
}

export async function atualizarPreco({ postoId, tipoCombustivel, novoPreco }) {
  const { error } = await supabase
    .from('precos')
    .update({ preco_litro: novoPreco, atualizado_em: new Date().toISOString() })
    .eq('posto_id', postoId)
    .eq('tipo_combustivel', tipoCombustivel)

  if (error) {
    console.error('Erro ao atualizar preço:', error)
    throw error
  }
}