import { supabase } from "@/data/supabaseClient";

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
}
