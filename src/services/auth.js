import { api, consulta } from '@/data/api'

const CHAVE = 'abasteceai_user'

function abrirSessao(user) {
  const sessao = { id: user.id, email: user.email }
  localStorage.setItem(CHAVE, JSON.stringify(sessao))
  return { user: sessao, session: sessao }
}


export async function cadastrar(email, senha, nome) {
  if (!email?.includes('@')) throw new Error('Informe um e-mail válido')
  if (!senha || senha.length < 6) throw new Error('A senha deve ter pelo menos 6 caracteres')
  if (!nome?.trim()) throw new Error('Informe seu nome')

  const existentes = await api.get('/users' + consulta({ email }))
  if (existentes.length > 0) throw new Error('E-mail já cadastrado')

  const user = await api.post('/users', { email, password: senha })
  try {
    await api.post('/perfil', { id: user.id, nome: nome.trim(), foto_url: null })
  } catch (erro) {
    await api.delete(`/users/${user.id}`)
    throw erro
  }
  return abrirSessao(user)
}


export async function login(email, senha) {
  const encontrados = await api.get('/users' + consulta({ email, password: senha }))
  if (encontrados.length === 0) throw new Error('Invalid login credentials')
  return abrirSessao(encontrados[0])
}

export async function logout() {
  localStorage.removeItem(CHAVE)
}

export async function usuarioAtual() {
  try {
    return JSON.parse(localStorage.getItem(CHAVE))
  } catch {
    return null
  }
}

export async function reenviarVerificacao() {}
/*import { supabase } from "@/data/supabaseClient";

export async function cadastrar(email, senha, nome) {
 const {data, error} =  await supabase.auth.signUp(
  {
    email,
    password:senha,
    options:{
     emailRedirectTo:window.location.origin + '/perfil'
    }
  }
 )
 if (error) throw error
 if (data.user){
  await  supabase.from('perfil').insert({id:data.user.id, nome})
 }
 return data
}

export async function login(email,senha){
  const {data, error} = await supabase.auth.signInWithPassword ({email, password:senha})
  if (error) throw error
  return data
}
export async function logout() {
  const { error } = await supabase.auth.signOut()
  if (error) throw error
}
export async function usuarioAtual() {
  const { data: { user } } = await supabase.auth.getUser()
  return user
}
export async function reenviarVerificacao(email) {
  const { error } = await supabase.auth.resend({ type: 'signup', email })
  if (error) throw error
}*/
