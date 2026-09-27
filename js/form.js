import { lerRascunho, salvarRascunho, removerRascunho } from "./storage.js";

const camposRascunho = ["nome", "email", "nascimento", "cpf", "telefone", "cep", "endereco", "cidade", "estado"];

function mascaraCpf(valor) {
  const numeros = valor.replace(/\D/g, "").slice(0, 11);
  let resultado = numeros.slice(0, 3);
  if (numeros.length > 3) resultado += "." + numeros.slice(3, 6);
  if (numeros.length > 6) resultado += "." + numeros.slice(6, 9);
  if (numeros.length > 9) resultado += "-" + numeros.slice(9, 11);
  return resultado;
}

function mascaraTelefone(valor) {
  const numeros = valor.replace(/\D/g, "").slice(0, 11);
  let resultado = numeros ? "(" + numeros.slice(0, 2) : "";
  if (numeros.length >= 2) resultado += ") ";
  if (numeros.length > 2) resultado += numeros.slice(2, 7);
  if (numeros.length > 7) resultado += "-" + numeros.slice(7, 11);
  return resultado;
}

function mascaraCep(valor) {
  const numeros = valor.replace(/\D/g, "").slice(0, 8);
  return numeros.length > 5 ? numeros.slice(0, 5) + "-" + numeros.slice(5) : numeros;
}

function atualizarAparencia(campo) {
  campo.classList.toggle("campo-valido", campo.value !== "" && campo.validity.valid);
  campo.classList.toggle("campo-invalido", campo.value !== "" && !campo.validity.valid);
}

function mensagemDeErro(campo) {
  if (campo.validity.valueMissing) return "Preencha este campo.";
  if (campo.validity.typeMismatch) return "Digite um e-mail válido.";
  if (campo.validity.tooShort) return `Digite pelo menos ${campo.minLength} caracteres.`;
  if (campo.validity.patternMismatch) return campo.title;
  return "Confira o valor informado.";
}

function atualizarErro(campo) {
  const idErro = `${campo.id}-erro`;
  let erro = document.getElementById(idErro);

  if (campo.validity.valid) {
    erro?.remove();
    campo.removeAttribute("aria-invalid");
    campo.removeAttribute("aria-describedby");
    return;
  }

  if (!erro) {
    erro = document.createElement("small");
    erro.id = idErro;
    erro.className = "erro-campo";
    campo.insertAdjacentElement("afterend", erro);
  }
  erro.textContent = mensagemDeErro(campo);
  campo.setAttribute("aria-invalid", "true");
  campo.setAttribute("aria-describedby", idErro);
}

export function iniciarFormulario() {
  const formulario = document.querySelector("#cadastro");
  const mensagem = document.querySelector("#mensagem-formulario");
  const toast = document.querySelector("#toast");
  let tempoToast;

  const rascunho = lerRascunho();
  if (rascunho) {
    camposRascunho.forEach((id) => {
      if (typeof rascunho[id] !== "string") return;
      const campo = formulario.elements.namedItem(id);
      if (campo) {
        campo.value = rascunho[id];
        atualizarAparencia(campo);
      }
    });
  }

  function salvarCampos() {
    const dados = Object.fromEntries(camposRascunho.map((id) => [id, formulario.elements.namedItem(id).value]));
    salvarRascunho(dados);
  }

  function atualizarCampo(evento) {
    const campo = evento.target;
    if (!camposRascunho.includes(campo.name)) return;

    if (campo.name === "cpf") campo.value = mascaraCpf(campo.value);
    if (campo.name === "telefone") campo.value = mascaraTelefone(campo.value);
    if (campo.name === "cep") campo.value = mascaraCep(campo.value);

    atualizarAparencia(campo);
    if (campo.hasAttribute("aria-invalid") || formulario.classList.contains("tentou-enviar")) {
      atualizarErro(campo);
    }
    salvarCampos();
  }

  formulario.addEventListener("input", atualizarCampo);
  formulario.addEventListener("change", atualizarCampo);

  formulario.addEventListener("invalid", (evento) => {
    formulario.classList.add("tentou-enviar");
    atualizarAparencia(evento.target);
    atualizarErro(evento.target);
    mensagem.hidden = false;
    mensagem.className = "alerta alerta-erro";
    mensagem.textContent = "Confira os campos destacados antes de enviar.";
    clearTimeout(tempoToast);
    toast.classList.remove("visivel");
    toast.textContent = "";
  }, true);

  formulario.addEventListener("submit", (evento) => {
    evento.preventDefault();
    formulario.classList.add("tentou-enviar");

    if (!formulario.checkValidity()) {
      formulario.reportValidity();
      return;
    }

    removerRascunho();
    mensagem.hidden = false;
    mensagem.className = "alerta alerta-sucesso";
    mensagem.textContent = "Formulário validado. Nenhum dado foi enviado.";
    toast.textContent = "Cadastro realizado com sucesso! Este é um projeto demonstrativo.";
    toast.classList.add("visivel");
    clearTimeout(tempoToast);
    tempoToast = setTimeout(() => {
      toast.classList.remove("visivel");
      toast.textContent = "";
    }, 4000);

    if (window.Swal?.fire) {
      window.Swal.fire({
        icon: "success",
        title: "Cadastro realizado com sucesso!",
        text: "Os dados foram processados apenas como demonstração acadêmica.",
        confirmButtonText: "OK",
        confirmButtonColor: "#145f83"
      });
    }
  });
}
