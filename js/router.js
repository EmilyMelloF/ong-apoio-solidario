import { templateInicio, templateProjetos, templateCadastro } from "./templates.js";

const templates = {
  inicio: templateInicio,
  projetos: templateProjetos,
  cadastro: templateCadastro
};

const titulos = {
  inicio: "Início",
  projetos: "Projetos",
  cadastro: "Cadastro"
};

export function iniciarRoteador(aoRenderizar) {
  const app = document.querySelector("#app");
  let secaoPendente = null;

  function renderizar(moverFoco = false) {
    let rota = window.location.hash.replace(/^#\//, "");

    if (!Object.hasOwn(templates, rota)) {
      rota = "inicio";
      window.history.replaceState(null, "", "#/inicio");
    }

    app.innerHTML = templates[rota]();
    document.title = `${titulos[rota]} | ONG Apoio Solidário`;
    document.querySelector("#anuncio-rota").textContent = `Página ${titulos[rota]}`;

    document.querySelectorAll(".menu > li > a[data-route]").forEach((link) => {
      if (link.dataset.route === rota) {
        link.setAttribute("aria-current", "page");
      } else {
        link.removeAttribute("aria-current");
      }
    });

    aoRenderizar(rota);

    if (moverFoco) app.focus({ preventScroll: true });

    if (rota === "projetos" && secaoPendente) {
      document.getElementById(secaoPendente)?.scrollIntoView();
    } else {
      window.scrollTo(0, 0);
    }
    secaoPendente = null;
  }

  document.addEventListener("click", (evento) => {
    const link = evento.target.closest("a[data-route]");
    if (!link || !Object.hasOwn(templates, link.dataset.route)) return;

    evento.preventDefault();
    const rota = link.dataset.route;
    const hash = `#/${rota}`;
    secaoPendente = link.dataset.secao || null;

    if (window.location.hash === hash) {
      if (rota === "projetos" && secaoPendente) {
        document.getElementById(secaoPendente)?.scrollIntoView();
      }
      secaoPendente = null;
    } else {
      window.location.hash = hash;
    }
  });

  window.addEventListener("hashchange", () => renderizar(true));
  renderizar();
}
