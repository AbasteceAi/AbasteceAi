const BASE_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3000'

const MENSAGENS_POR_STATUS = {
  400: 'Requisição inválida.',
  404: 'Registro não encontrado.',
  409: 'Conflito: o registro já existe.',
  500: 'Erro interno da API.',
}

export class ApiError extends Error {
  constructor(mensagem, status) {
    super(mensagem)
    this.name = 'ApiError'
    this.status = status
  }
}

async function requisicao(metodo, caminho, corpo) {
  const opcoes = { method: metodo }
  if (corpo !== undefined) {
    opcoes.headers = { 'Content-Type': 'application/json' }
    opcoes.body = JSON.stringify(corpo)
  }

  let resposta
  try {
    resposta = await fetch(`${BASE_URL}${caminho}`, opcoes)
  } catch {

    throw new ApiError('Não foi possível conectar à API. O JSON Server está rodando?', 0)
  }

  if (!resposta.ok) {
    throw new ApiError(MENSAGENS_POR_STATUS[resposta.status] ?? `Erro ${resposta.status}`, resposta.status)
  }
  return resposta.status === 204 ? null : resposta.json()
}

export const api = {
  get: (caminho) => requisicao('GET', caminho),
  post: (caminho, corpo) => requisicao('POST', caminho, corpo),
  put: (caminho, corpo) => requisicao('PUT', caminho, corpo),
  patch: (caminho, corpo) => requisicao('PATCH', caminho, corpo),
  delete: (caminho) => requisicao('DELETE', caminho),
}

export function consulta(params) {
  const qs = new URLSearchParams()
  for (const [chave, valor] of Object.entries(params)) {
    if (Array.isArray(valor)) valor.forEach((v) => qs.append(chave, v))
    else if (valor !== undefined && valor !== null) qs.append(chave, valor)
  }
  const texto = qs.toString()
  return texto ? `?${texto}` : ''
}


export async function buscarVarios(colecao, campo, valores) {
  const unicos = [...new Set(valores)]
  if (unicos.length === 0) return []
  const listas = await Promise.all(unicos.map((v) => api.get(`/${colecao}${consulta({ [campo]: v })}`)))
  return listas.flat()
}


export const igual = (a, b) => String(a) === String(b)
