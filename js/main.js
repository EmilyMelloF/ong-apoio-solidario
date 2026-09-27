import { iniciarRoteador } from "./router.js";
import { iniciarFormulario } from "./form.js";

document.addEventListener("DOMContentLoaded", () => {
  const cabecalho = document.querySelector("header");
  const botaoMenu = document.querySelector(".nav-toggle");

  function fecharMenu() {
    cabecalho.classList.remove("menu-aberto");
    botaoMenu.setAttribute("aria-expanded", "false");
    botaoMenu.setAttribute("aria-label", "Abrir menu");
  }

  botaoMenu.addEventListener("click", () => {
    const aberto = cabecalho.classList.toggle("menu-aberto");
    botaoMenu.setAttribute("aria-expanded", String(aberto));
    botaoMenu.setAttribute("aria-label", aberto ? "Fechar menu" : "Abrir menu");
  });

  document.addEventListener("click", (evento) => {
    if (evento.target.closest("a[data-route]")) fecharMenu();
  });

  iniciarRoteador((rota) => {
    if (rota === "cadastro") iniciarFormulario();
  });
});
