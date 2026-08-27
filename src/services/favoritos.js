import { supabase } from '@/data/supabaseClient'

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
}