export const CHAVE_RASCUNHO = "apoioSolidario:rascunhoCadastro";

export function salvarRascunho(dados) {
  try {
    localStorage.setItem(CHAVE_RASCUNHO, JSON.stringify(dados));
    return true;
  } catch {
    return false;
  }
}

export function lerRascunho() {
  try {
    const valor = localStorage.getItem(CHAVE_RASCUNHO);
    if (valor === null) return null;
    const dados = JSON.parse(valor);
    return dados !== null && typeof dados === "object" && !Array.isArray(dados) ? dados : null;
  } catch {
    return null;
  }
}

export function removerRascunho() {
  try {
    localStorage.removeItem(CHAVE_RASCUNHO);
    return true;
  } catch {
    return false;
  }
}
