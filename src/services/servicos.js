import { supabase } from '@/data/supabaseClient'

const ICONES_POR_CATEGORIA = {
  automotivo: 'mecanica',
  'conveniência': 'loja',
  conveniencia: 'loja',
  limpeza: 'limpeza',
  higiene: 'banheiro',
}

export async function buscarServicosDoPosto(postoId) {
  const { data, error } = await supabase
    .from('servicos')
    .select('desc_servico, nome_servico')
    .eq('posto_id', postoId)

  if (error) {
    console.error('Erro ao buscar serviços do posto:', error)
    return []
  }

  const porCategoria = data.reduce((acc, servico) => {
    if (!acc[servico.desc_servico]) acc[servico.desc_servico] = []
    acc[servico.desc_servico].push(servico.nome_servico)
    return acc
  }, {})

  return Object.entries(porCategoria).map(([categoria, itens]) => ({
    id: categoria,
    icone: ICONES_POR_CATEGORIA[categoria] ?? categoria,
    itens,
  }))
}