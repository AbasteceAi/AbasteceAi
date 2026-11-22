import { api, ApiError } from '@/data/api'

const TAMANHO_MAXIMO_FOTO = 1024 * 1024;

export async function buscarPerfil(userId) {
  try {
    return await api.get(`/perfil/${userId}`)
  } catch (erro) {
    if (erro instanceof ApiError && erro.status === 404) return null
    throw erro
  }
}


export async function atualizarPerfil(userId, { nome }) {
  if (!nome?.trim()) throw new Error('O nome não pode ficar vazio')
  return api.patch(`/perfil/${userId}`, { nome: nome.trim() })
}

export async function atualizarNome(userId, nome) {
  return atualizarPerfil(userId, { nome })
}


export function uploadFotoPerfil(file, userId) {
  return new Promise((resolve, reject) => {
    if (!file?.type?.startsWith('image/')) return reject(new Error('Envie um arquivo de imagem'))
    if (file.size > TAMANHO_MAXIMO_FOTO) return reject(new Error('A imagem deve ter no máximo 1 MB'))

    const reader = new FileReader()
    reader.onerror = () => reject(new Error('Não foi possível ler a imagem'))
    reader.onload = async () => {
      try {
        await api.patch(`/perfil/${userId}`, { foto_url: reader.result })
        resolve(reader.result)
      } catch (erro) {
        reject(erro)
      }
    }
    reader.readAsDataURL(file)
  })
}
/*import { supabase } from '@/data/supabaseClient'

export async function buscarPerfil(userId) {
  const { data, error } = await supabase
    .from('perfil')
    .select('*')
    .eq('id', userId)
    .maybeSingle()

  if (error) throw error
  return data
}

export async function atualizarPerfil(userId, { nome }) {
  const { error } = await supabase
    .from('perfil')
    .update({ nome })
    .eq('id', userId)

  if (error) throw error
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
}*/
