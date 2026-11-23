//import { supabase } from '@/data/supabaseClient'
/*import { tabela, inserir, atualizar, igual } from '@/data/db'

import { calcularDistancia } from '@/utils/distancia'
import { estaAberto } from '@/utils/horario'

export async function buscarPostos() {
 return tabela('postos').map((posto) => ({
    ...posto,
    avaliacoes: tabela('avaliacoes')
      .filter((a) => igual(a.posto_id, posto.id))
      .map((a) => ({ nota: a.nota })),
    precos: tabela('precos')
      .filter((p) => igual(p.posto_id, posto.id))
      .map(({ tipo_combustivel, preco_litro, atualizado_em }) => ({
        tipo_combustivel,
        preco_litro,
        atualizado_em,
      })),
    aberto: estaAberto(posto.horario),
  }))
}

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

  const termoLower = termoBusca.toLowerCase()
  const contem = (v) => v?.toLowerCase().includes(termoLower)

  const postosData = tabela('postos')
    .filter((p) => contem(p.nome) || contem(p.endereco))
    .slice(0, 10)
  const perfilData = tabela('perfil')
    .filter((p) => contem(p.nome))
    .slice(0, 5)

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
export async function buscarTipoCombustivel() {
  return [...new Set(tabela('precos').map((p) => p.tipo_combustivel.toLowerCase()))]
}

export async function enviarAvaliacao({ postoId, usuarioId, nota, comentario }) {
  inserir('avaliacoes', { posto_id: postoId, user_id: usuarioId, nota, comentario })
}

export async function atualizarPreco({ postoId, tipoCombustivel, novoPreco }) {
  const preco = tabela('precos').find(
    (p) => igual(p.posto_id, postoId) && p.tipo_combustivel === tipoCombustivel,
  )
  if (!preco) throw new Error('Preço não encontrado')
  atualizar('precos', preco.id, { preco_litro: novoPreco, atualizado_em: new Date().toISOString() })
}
*/
import { api, consulta, buscarVarios, igual } from '@/data/api'
import { calcularDistancia } from '@/utils/distancia'
import { estaAberto } from '@/utils/horario'


export { enviarAvaliacao } from '@/services/avaliacoes'

function montarPosto(posto, avaliacoes, precos) {
  return {
    ...posto,
    avaliacoes: avaliacoes.map((a) => ({ nota: a.nota })),
    precos: precos.map(({ tipo_combustivel, preco_litro, atualizado_em }) => ({
      tipo_combustivel,
      preco_litro,
      atualizado_em,
    })),
    aberto: estaAberto(posto.horario),
  }
}


export async function buscarPostos() {
  const [postos, avaliacoes, precos] = await Promise.all([
    api.get('/postos'),
    api.get('/avaliacoes'),
    api.get('/precos'),
  ])
  return postos.map((p) =>
    montarPosto(
      p,
      avaliacoes.filter((a) => igual(a.posto_id, p.id)),
      precos.filter((pr) => igual(pr.posto_id, p.id)),
    ),
  )
}

export async function buscarPostoPorId(postoId) {
  const [posto, avaliacoes, precos] = await Promise.all([
    api.get(`/postos/${postoId}`),
    api.get('/avaliacoes' + consulta({ posto_id: postoId })),
    api.get('/precos' + consulta({ posto_id: postoId })),
  ])
  return montarPosto(posto, avaliacoes, precos)
}

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

  const termoLower = termoBusca.toLowerCase()
  const contem = (v) => v?.toLowerCase().includes(termoLower)

  const [postosBrutos, perfisBrutos] = await Promise.all([
    api.get('/postos'),
    api.get('/perfil'),
  ])
  const postosData = postosBrutos.filter((p) => contem(p.nome) || contem(p.endereco)).slice(0, 10)
  const perfilData = perfisBrutos.filter((p) => contem(p.nome)).slice(0, 5)

  const ruasVistas = new Set()
  const bairrosVistos = new Set()
  const resultados = []

  for (const posto of postosData) {
    if (contem(posto.nome)) {
      resultados.push({ tipo: 'Posto', texto: posto.nome, id: posto.id })
    }

    const rua = extrairRua(posto.endereco)
    if (rua && contem(rua) && !ruasVistas.has(rua)) {
      ruasVistas.add(rua)
      resultados.push({ tipo: 'Rua', texto: rua, id: posto.id })
    }

    const bairro = extrairBairro(posto.endereco)
    if (bairro && contem(bairro) && !bairrosVistos.has(bairro)) {
      bairrosVistos.add(bairro)
      resultados.push({ tipo: 'Bairro', texto: bairro })
    }
  }

  for (const perfil of perfilData) {
    resultados.push({ tipo: 'Usuário', texto: perfil.nome, id: perfil.id })
  }

  return resultados.slice(0, 8)
}

export function obterLoc() {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (position) => resolve({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      }),
      reject,
    )
  })
}

export function ordenarPorDistancia(postos, userLat, userLng) {
  return postos
    .map((p) => ({
      ...p,
      distancia: calcularDistancia(userLat, userLng, p.latitude, p.longitude),
    }))
    .sort((a, b) => a.distancia - b.distancia)
}


export async function buscarTipoCombustivel() {
  const precos = await api.get('/precos')
  return [...new Set(precos.map((p) => p.tipo_combustivel.toLowerCase()))]
}

export async function atualizarPreco({ postoId, tipoCombustivel, novoPreco }) {
  const valor = Number(novoPreco)
  if (!Number.isFinite(valor) || valor <= 0) throw new Error('Informe um preço válido, maior que zero')

  const [preco] = await buscarVarios('precos', 'posto_id', [postoId]).then((lista) =>
    lista.filter((p) => p.tipo_combustivel === tipoCombustivel),
  )
  if (!preco) throw new Error('Preço não encontrado')

  return api.patch(`/precos/${preco.id}`, {
    preco_litro: valor,
    atualizado_em: new Date().toISOString(),
  })
}
