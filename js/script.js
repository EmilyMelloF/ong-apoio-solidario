const botaoMenu = document.querySelector(".nav-toggle");
const cabecalho = document.querySelector("header");

botaoMenu.addEventListener("click", () => {
  const aberto = cabecalho.classList.toggle("menu-aberto");
  botaoMenu.setAttribute("aria-expanded", String(aberto));
  botaoMenu.setAttribute("aria-label", aberto ? "Fechar menu" : "Abrir menu");
});

const formulario = document.querySelector("#cadastro");

if (formulario) {
  const cpf = document.querySelector("#cpf");
  const telefone = document.querySelector("#telefone");
  const cep = document.querySelector("#cep");
  const mensagem = document.querySelector("#mensagem-formulario");
  const toast = document.querySelector("#toast");
  let tempoToast;

  cpf.addEventListener("input", () => {
    const numeros = cpf.value.replace(/\D/g, "").slice(0, 11);
    let valor = numeros.slice(0, 3);
    if (numeros.length > 3) valor += "." + numeros.slice(3, 6);
    if (numeros.length > 6) valor += "." + numeros.slice(6, 9);
    if (numeros.length > 9) valor += "-" + numeros.slice(9, 11);
    cpf.value = valor;
  });

  telefone.addEventListener("input", () => {
    const numeros = telefone.value.replace(/\D/g, "").slice(0, 11);
    let valor = numeros ? "(" + numeros.slice(0, 2) : "";
    if (numeros.length >= 2) valor += ") ";
    if (numeros.length > 2) valor += numeros.slice(2, 7);
    if (numeros.length > 7) valor += "-" + numeros.slice(7, 11);
    telefone.value = valor;
  });

  cep.addEventListener("input", () => {
    const numeros = cep.value.replace(/\D/g, "").slice(0, 8);
    cep.value = numeros.length > 5
      ? numeros.slice(0, 5) + "-" + numeros.slice(5)
      : numeros;
  });

  formulario.addEventListener("invalid", () => {
    formulario.classList.add("tentou-enviar");
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
  });
}
