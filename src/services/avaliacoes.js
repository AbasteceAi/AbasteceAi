import { supabase } from "@/data/supabaseClient"

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
}