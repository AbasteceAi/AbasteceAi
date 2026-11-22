
export function confirmarExclusao(mensagem = 'Tem certeza que deseja excluir? Esta ação não pode ser desfeita.') {
  return window.confirm(mensagem)
}

export async function executarOperacao(operacao, { onInicio, onSucesso, onErro, onFim } = {}) {
  onInicio?.()
  try {
    const resultado = await operacao()
    onSucesso?.(resultado)
    return resultado
  } catch (erro) {
    onErro?.(erro)
    return undefined
  } finally {
    onFim?.()
  }
}
