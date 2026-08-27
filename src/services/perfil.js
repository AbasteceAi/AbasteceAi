import { supabase } from '@/data/supabaseClient'

export async function buscarPerfil(userId) {
  const { data, error } = await supabase
    .from('perfil')
    .select('*')
    .eq('id', userId)
    .maybeSingle()

  if (error) throw error
  return data
}

export async function atualizarNome(userId, nome) {
  const { error } = await supabase
    .from('perfil')
    .update({ nome })
    .eq('id', userId)

  if (error) throw error
}

export async function uploadFotoPerfil(file, userId) {
  const extensao = file.name.split('.').pop()
  const nomeArquivo = `${userId}-${Date.now()}.${extensao}`

  const { error: erroUpload } = await supabase.storage
    .from('fotos-perfil')
    .upload(nomeArquivo, file)

  if (erroUpload) throw erroUpload

  const { data: urlData } = supabase.storage
    .from('fotos-perfil')
    .getPublicUrl(nomeArquivo)

  const { error: erroUpdate } = await supabase
    .from('perfil')
    .update({ foto_url: urlData.publicUrl })
    .eq('id', userId)

  if (erroUpdate) throw erroUpdate

  return urlData.publicUrl
}
