export function estaAberto(horarioTexto) {
  if (!horarioTexto) return null // sem informação

  const texto = horarioTexto.toLowerCase()

  if (texto.includes('não informado')) return null
  if (texto.includes('24 horas')) return true

  const match = texto.match(/(\d{1,2})h\s*-\s*(\d{1,2})h/)
  if (!match) return null 
  const abre = parseInt(match[1])
  const fecha = parseInt(match[2])
  const agora = new Date().getHours()

  if (fecha > abre) {
    return agora >= abre && agora < fecha
  } else {
    return agora >= abre || agora < fecha
  }
}