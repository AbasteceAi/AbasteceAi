import { api, consulta, buscarVarios, igual } from '@/data/api'
import { usuarioAtual } from '@/services/auth'

async function exigirUsuario() {
  const user = await usuarioAtual()
  if (!user) throw new Error('Você precisa estar logado')
  return user
}

const doUsuarioNoPosto = (userId, postoId) =>
  api.get('/favoritos' + consulta({ user_id: userId, posto_id: postoId }))


export async function adicionarFavorito(postoId) {
  const user = await exigirUsuario()
  const existentes = await doUsuarioNoPosto(user.id, postoId)
  if (existentes.length > 0) return existentes[0]
  return api.post('/favoritos', {
    user_id: user.id,
    posto_id: postoId,
    created_at: new Date().toISOString(),
  })
}


export async function removerFavorito(postoId) {
  const user = await exigirUsuario()
  const existentes = await doUsuarioNoPosto(user.id, postoId)
  await Promise.all(existentes.map((f) => api.delete(`/favoritos/${f.id}`)))
}


export async function buscarFavoritos() {
  const user = await usuarioAtual()
  if (!user) return []

  const favoritos = await api.get('/favoritos' + consulta({ user_id: user.id }))
  const postoIds = [...new Set(favoritos.map((f) => f.posto_id))]

  const [postos, precos] = await Promise.all([
    buscarVarios('postos', 'id', postoIds),
    buscarVarios('precos', 'posto_id', postoIds),
  ])

  return favoritos
    .map((f) => postos.find((p) => igual(p.id, f.posto_id)))
    .filter(Boolean)
    .map((p) => ({
      ...p,
      precos: precos
        .filter((pr) => igual(pr.posto_id, p.id))
        .map(({ tipo_combustivel, preco_litro }) => ({ tipo_combustivel, preco_litro })),
    }))
}


export async function ehFavorito(postoId) {
  const user = await usuarioAtual()
  if (!user) return false
  const existentes = await doUsuarioNoPosto(user.id, postoId)
  return existentes.length > 0
}
/*import { supabase } from '@/data/supabaseClient'

export async function adicionarFavorito(postoId) {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Você precisa estar logado')

  const { error } = await supabase
    .from('favoritos')
    .insert({ user_id: user.id, posto_id: postoId })

  if (error) throw error
}

export async function removerFavorito(postoId) {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Você precisa estar logado')

  const { error } = await supabase
    .from('favoritos')
    .delete()
    .eq('user_id', user.id)
    .eq('posto_id', postoId)

  if (error) throw error
}

export async function buscarFavoritos() {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return []

  const { data, error } = await supabase
    .from('favoritos')
    .select('posto_id, postos(*, precos(tipo_combustivel, preco_litro))')
    .eq('user_id', user.id)

  if (error) throw error

  return data.map(f => f.postos)
}

export async function ehFavorito(postoId) {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return false

  const { data, error } = await supabase
    .from('favoritos')
    .select('id')
    .eq('user_id', user.id)
    .eq('posto_id', postoId)
    .maybeSingle()

  if (error) throw error
  return !!data
}*/
