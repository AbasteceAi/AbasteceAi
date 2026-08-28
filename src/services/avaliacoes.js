import { supabase } from "@/data/supabaseClient"

export async function buscarAvaliacoesDoUsuario(userId) {
  const { data, error } = await supabase
    .from('avaliacoes')
    .select('*, postos(nome, foto_url, endereco)') // já traz os dados do posto junto
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
  const [qtdPorAutor, perfilPorAutor] = await Promise.all([
    contarAvaliacoesPorUsuarios(autorIds),
    buscarPerfisPorIds(autorIds),
  ])

  return data.map((a) => ({
    ...a,
    perfil: perfilPorAutor[a.user_id] ?? null,
    qtdAvaliacoesAutor: qtdPorAutor[a.user_id] ?? 1,
    souAutor: !!usuarioAtualId && a.user_id === usuarioAtualId,
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