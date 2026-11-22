import { api, consulta, buscarVarios, igual } from '@/data/api'

const unicos = (lista) => [...new Set(lista)]

const maisRecentes = (a, b) => String(b.created_at ?? '').localeCompare(String(a.created_at ?? ''))

function validarAvaliacao({ nota, comentario }) {
  if (!Number.isInteger(nota) || nota < 1 || nota > 5) throw new Error('A nota deve ser um número inteiro de 1 a 5')
  if (comentario && comentario.length > 500) throw new Error('O comentário deve ter no máximo 500 caracteres')
}


export async function enviarAvaliacao({ postoId, usuarioId, nota, comentario }) {
  validarAvaliacao({ nota, comentario })
  return api.post('/avaliacoes', {
    posto_id: postoId,
    user_id: usuarioId,
    nota,
    comentario: comentario?.trim() ?? '',
    created_at: new Date().toISOString(),
  })
}


export async function buscarAvaliacoesDoUsuario(userId) {
  const avaliacoes = (await api.get('/avaliacoes' + consulta({ user_id: userId }))).sort(maisRecentes)
  const postos = await buscarVarios('postos', 'id', unicos(avaliacoes.map((a) => a.posto_id)))

  return avaliacoes.map((a) => {
    const p = postos.find((x) => igual(x.id, a.posto_id))
    return { ...a, postos: p ? { nome: p.nome, foto_url: p.foto_url, endereco: p.endereco } : null }
  })
}


export async function buscarAvaliacoesDoPosto(postoId, usuarioAtualId) {
  const avaliacoes = (await api.get('/avaliacoes' + consulta({ posto_id: postoId }))).sort(maisRecentes)
  const autorIds = unicos(avaliacoes.map((a) => a.user_id))

  const [perfis, avaliacoesDosAutores, votos] = await Promise.all([
    buscarVarios('perfil', 'id', autorIds),
    buscarVarios('avaliacoes', 'user_id', autorIds),
    buscarVarios('avaliacoes_votos', 'avaliacao_id', avaliacoes.map((a) => a.id)),
  ])

  return avaliacoes.map((a) => {
    const perfil = perfis.find((p) => igual(p.id, a.user_id))
    const votosDaAvaliacao = votos.filter((v) => igual(v.avaliacao_id, a.id))
    const meu = usuarioAtualId ? votosDaAvaliacao.find((v) => igual(v.user_id, usuarioAtualId)) : null

    return {
      ...a,
      perfil: perfil ? { id: perfil.id, nome: perfil.nome, foto_url: perfil.foto_url } : null,
      qtdAvaliacoesAutor: avaliacoesDosAutores.filter((x) => igual(x.user_id, a.user_id)).length || 1,
      souAutor: !!usuarioAtualId && igual(a.user_id, usuarioAtualId),
      utilCount: votosDaAvaliacao.filter((v) => v.tipo === 'util').length,
      inutilCount: votosDaAvaliacao.filter((v) => v.tipo === 'inutil').length,
      meuVoto: meu?.tipo ?? null,
    }
  })
}


export async function buscarAvaliacaoPorId(avaliacaoId) {
  return api.get(`/avaliacoes/${avaliacaoId}`)
}


export async function atualizarAvaliacao({ avaliacaoId, nota, comentario }) {
  validarAvaliacao({ nota, comentario })
  const atual = await api.get(`/avaliacoes/${avaliacaoId}`)
  return api.put(`/avaliacoes/${avaliacaoId}`, {
    ...atual,
    nota,
    comentario: comentario?.trim() ?? '',
    atualizado_em: new Date().toISOString(),
  })
}


export async function excluirAvaliacao(avaliacaoId) {
  const votos = await api.get('/avaliacoes_votos' + consulta({ avaliacao_id: avaliacaoId }))
  await Promise.all(votos.map((v) => api.delete(`/avaliacoes_votos/${v.id}`)))
  await api.delete(`/avaliacoes/${avaliacaoId}`)
}


export async function votarAvaliacao({ avaliacaoId, userId, tipo }) {
  if (!['util', 'inutil'].includes(tipo)) throw new Error('Tipo de voto inválido')

  const [existente] = await api.get(
    '/avaliacoes_votos' + consulta({ avaliacao_id: avaliacaoId, user_id: userId }),
  )

  if (!existente) {
    await api.post('/avaliacoes_votos', {
      avaliacao_id: avaliacaoId,
      user_id: userId,
      tipo,
    })
    return tipo
  }
  if (existente.tipo === tipo) {
    await api.delete(`/avaliacoes_votos/${existente.id}`)
    return null
  }
  await api.patch(`/avaliacoes_votos/${existente.id}`, { tipo })
  return tipo
}
/*import { supabase } from "@/data/supabaseClient"

export async function buscarAvaliacoesDoUsuario(userId) {
  const { data, error } = await supabase
    .from('avaliacoes')
    .select('*, postos(nome, foto_url, endereco)')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })

  if (error) throw error
  return data
}

export async function buscarAvaliacoesDoPosto(postoId, usuarioAtualId) {
  const { data, error } = await supabase
    .from('avaliacoes')
    .select('*')
    .eq('posto_id', postoId)
    .order('created_at', { ascending: false })

  if (error) throw error

  const autorIds = [...new Set(data.map((a) => a.user_id))]
  const avaliacaoIds = data.map((a) => a.id)

  const [qtdPorAutor, perfilPorAutor, votosPorAvaliacao] = await Promise.all([
    contarAvaliacoesPorUsuarios(autorIds),
    buscarPerfisPorIds(autorIds),
    buscarVotosDasAvaliacoes(avaliacaoIds, usuarioAtualId),
  ])

  return data.map((a) => ({
    ...a,
    perfil: perfilPorAutor[a.user_id] ?? null,
    qtdAvaliacoesAutor: qtdPorAutor[a.user_id] ?? 1,
    souAutor: !!usuarioAtualId && a.user_id === usuarioAtualId,
    utilCount: votosPorAvaliacao[a.id]?.util ?? 0,
    inutilCount: votosPorAvaliacao[a.id]?.inutil ?? 0,
    meuVoto: votosPorAvaliacao[a.id]?.meuVoto ?? null,
  }))
}

async function buscarPerfisPorIds(userIds) {
  if (userIds.length === 0) return {}

  const { data, error } = await supabase.from('perfil').select('id, nome, foto_url').in('id', userIds)

  if (error) {
    console.error('Erro ao buscar perfis dos autores:', error)
    return {}
  }

  return data.reduce((acc, perfil) => {
    acc[perfil.id] = perfil
    return acc
  }, {})
}

async function contarAvaliacoesPorUsuarios(userIds) {
  if (userIds.length === 0) return {}

  const { data, error } = await supabase.from('avaliacoes').select('user_id').in('user_id', userIds)

  if (error) {
    console.error('Erro ao contar avaliações por usuário:', error)
    return {}
  }

  return data.reduce((acc, row) => {
    acc[row.user_id] = (acc[row.user_id] ?? 0) + 1
    return acc
  }, {})
}


async function buscarVotosDasAvaliacoes(avaliacaoIds, usuarioAtualId) {
  if (avaliacaoIds.length === 0) return {}

  const { data, error } = await supabase
    .from('avaliacoes_votos')
    .select('avaliacao_id, user_id, tipo')
    .in('avaliacao_id', avaliacaoIds)

  if (error) {
    console.error('Erro ao buscar votos das avaliações:', error)
    return {}
  }

  return data.reduce((acc, voto) => {
    if (!acc[voto.avaliacao_id]) {
      acc[voto.avaliacao_id] = { util: 0, inutil: 0, meuVoto: null }
    }

    if (voto.tipo === 'util') acc[voto.avaliacao_id].util++
    if (voto.tipo === 'inutil') acc[voto.avaliacao_id].inutil++

    if (usuarioAtualId && voto.user_id === usuarioAtualId) {
      acc[voto.avaliacao_id].meuVoto = voto.tipo
    }

    return acc
  }, {})
}


export async function votarAvaliacao({ avaliacaoId, userId, tipo }) {
  const { data: existente, error: erroBusca } = await supabase
    .from('avaliacoes_votos')
    .select('id, tipo')
    .eq('avaliacao_id', avaliacaoId)
    .eq('user_id', userId)
    .maybeSingle()

  if (erroBusca) throw erroBusca

  if (!existente) {
    const { error } = await supabase
      .from('avaliacoes_votos')
      .insert({ avaliacao_id: avaliacaoId, user_id: userId, tipo })
    if (error) throw error
    return tipo
  }

  if (existente.tipo === tipo) {
    const { error } = await supabase.from('avaliacoes_votos').delete().eq('id', existente.id)
    if (error) throw error
    return null
  }

  const { error } = await supabase.from('avaliacoes_votos').update({ tipo }).eq('id', existente.id)
  if (error) throw error
  return tipo
}

export async function atualizarAvaliacao({ avaliacaoId, nota, comentario }) {
  const { error } = await supabase
    .from('avaliacoes')
    .update({ nota, comentario })
    .eq('id', avaliacaoId)

  if (error) throw error
}

export async function excluirAvaliacao(avaliacaoId) {
  const { error } = await supabase.from('avaliacoes').delete().eq('id', avaliacaoId)
  if (error) throw error
}*/
