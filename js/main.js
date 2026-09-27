import { iniciarRoteador } from "./router.js";
import { iniciarFormulario } from "./form.js";

document.addEventListener("DOMContentLoaded", () => {
  const cabecalho = document.querySelector("header");
  const botaoMenu = document.querySelector(".nav-toggle");
  const botaoContraste = document.querySelector(".modo-contraste");
  const chaveContraste = "apoioSolidario:altoContraste";
  let contrasteAtivo = false;

  try {
    contrasteAtivo = localStorage.getItem(chaveContraste) === "true";
  } catch {
    contrasteAtivo = false;
  }

  function aplicarContraste() {
    document.documentElement.dataset.contraste = contrasteAtivo ? "alto" : "normal";
    botaoContraste.setAttribute("aria-pressed", String(contrasteAtivo));
  }

  aplicarContraste();
  botaoContraste.addEventListener("click", () => {
    contrasteAtivo = !contrasteAtivo;
    aplicarContraste();
    try {
      localStorage.setItem(chaveContraste, String(contrasteAtivo));
    } catch {
      // O controle continua funcionando durante esta visita.
    }
  });

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

  document.querySelector(".pular-conteudo").addEventListener("click", (evento) => {
    evento.preventDefault();
    document.querySelector("#app").focus();
  });

  const itemSubmenu = document.querySelector(".tem-submenu");
  itemSubmenu.addEventListener("focusout", (evento) => {
    if (!itemSubmenu.contains(evento.relatedTarget)) itemSubmenu.classList.remove("submenu-fechado");
  });
  itemSubmenu.addEventListener("mouseenter", () => itemSubmenu.classList.remove("submenu-fechado"));

  document.addEventListener("keydown", (evento) => {
    if (evento.key !== "Escape") return;

    if (cabecalho.classList.contains("menu-aberto")) {
      fecharMenu();
      botaoMenu.focus();
    } else if (itemSubmenu.contains(document.activeElement)) {
      itemSubmenu.classList.add("submenu-fechado");
      itemSubmenu.querySelector("a").focus();
    }
  });

  document.addEventListener("click", (evento) => {
    if (evento.target.closest("a[data-route]")) fecharMenu();
  });

  iniciarRoteador((rota) => {
    if (rota === "cadastro") iniciarFormulario();
  });
});
