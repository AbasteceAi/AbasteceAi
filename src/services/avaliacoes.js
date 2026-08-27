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
