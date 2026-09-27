const projetos = [
  {
    id: "frentes",
    titulo: "Apresentação das Frentes de Atuação",
    badge: "Comunidade",
    descricao: "As ações propostas pela ONG envolvem apoio a famílias e atividades que aproximam as pessoas da comunidade. A ideia é reunir quem deseja ajudar e identificar necessidades locais.",
    acao: "Quero ajudar nesta frente"
  },
  {
    id: "doacoes",
    titulo: "Campanhas de Doação",
    badge: "Doações",
    descricao: "As campanhas podem arrecadar alimentos e roupas em bom estado para famílias que precisam de apoio. A organização das doações busca facilitar a entrega dos itens.",
    acao: "Quero ajudar nas doações"
  },
  {
    id: "voluntariado",
    titulo: "Atividades de Voluntariado",
    badge: "Voluntariado",
    descricao: "Voluntários podem participar da separação de doações e de ações comunitárias. Cada pessoa pode contribuir com seu tempo e suas habilidades.",
    acao: "Quero ser voluntário"
  }
];

function templateCartao(projeto) {
  return `
    <section id="${projeto.id}" class="cartao">
      <span class="badge">${projeto.badge}</span>
      <h2>${projeto.titulo}</h2>
      <p>${projeto.descricao}</p>
      <div class="cartao-acoes"><a href="#/cadastro" data-route="cadastro">${projeto.acao}</a></div>
    </section>
  `;
}

export function templateInicio() {
  return `
    <h1>ONG Apoio Solidário</h1>
    <section>
      <h2>Sobre a ONG</h2>
      <p>A ONG Apoio Solidário é uma organização fictícia criada para demonstrar um projeto acadêmico de desenvolvimento Front-End. Seu objetivo é incentivar ações solidárias, campanhas de doação e participação voluntária na comunidade.</p>
      <p>O trabalho voluntário é uma forma de colaborar com outras pessoas e ajudar a construir uma comunidade mais acolhedora.</p>
      <picture>
        <source srcset="../imagens/voluntariado.webp" type="image/webp">
        <img class="foto" src="../imagens/voluntariado.jpg" alt="Participantes de uma ação de limpeza comunitária com um carrinho de mão" width="1200" height="800">
      </picture>
      <p><a href="#/projetos" data-route="projetos">Conheça nossos projetos sociais</a></p>
    </section>
  `;
}

export function templateProjetos() {
  return `
    <h1>Projetos Sociais</h1>
    <div class="grid projetos-grid">
      ${projetos.map(templateCartao).join("")}
    </div>
  `;
}

export function templateCadastro() {
  return `
    <h1>Cadastro de Voluntário</h1>
    <p>Preencha os campos abaixo para simular um cadastro. Os dados não são enviados.</p>
    <div id="mensagem-formulario" class="alerta" role="status" hidden></div>
    <form id="cadastro">
      <fieldset>
        <legend>Dados pessoais</legend>
        <div class="campos">
          <div class="campo">
            <label for="nome">Nome completo</label>
            <input id="nome" name="nome" type="text" autocomplete="name" minlength="3" required>
          </div>
          <div class="campo">
            <label for="email">E-mail</label>
            <input id="email" name="email" type="email" autocomplete="email" required>
          </div>
          <div class="campo">
            <label for="nascimento">Data de nascimento</label>
            <input id="nascimento" name="nascimento" type="date" autocomplete="bday" required>
          </div>
          <div class="campo">
            <label for="cpf">CPF</label>
            <input id="cpf" name="cpf" type="text" inputmode="numeric" maxlength="14" pattern="[0-9]{3}[.][0-9]{3}[.][0-9]{3}-[0-9]{2}" title="Digite o CPF no formato 000.000.000-00" placeholder="000.000.000-00" required>
          </div>
          <div class="campo">
            <label for="telefone">Telefone</label>
            <input id="telefone" name="telefone" type="tel" autocomplete="tel" inputmode="numeric" maxlength="15" pattern="\\([0-9]{2}\\) [0-9]{5}-[0-9]{4}" title="Digite o telefone no formato (00) 00000-0000" placeholder="(00) 00000-0000" required>
          </div>
        </div>
      </fieldset>
      <fieldset>
        <legend>Endereço</legend>
        <div class="campos">
          <div class="campo">
            <label for="cep">CEP</label>
            <input id="cep" name="cep" type="text" autocomplete="postal-code" inputmode="numeric" maxlength="9" pattern="[0-9]{5}-[0-9]{3}" title="Digite o CEP no formato 00000-000" placeholder="00000-000" required>
          </div>
          <div class="campo">
            <label for="endereco">Endereço</label>
            <input id="endereco" name="endereco" type="text" autocomplete="address-line1" required>
          </div>
          <div class="campo">
            <label for="cidade">Cidade</label>
            <input id="cidade" name="cidade" type="text" autocomplete="address-level2" required>
          </div>
          <div class="campo">
            <label for="estado">Estado</label>
            <select id="estado" name="estado" autocomplete="address-level1" required>
              <option value="">Selecione</option>
              <option value="RS">RS</option>
              <option value="SC">SC</option>
              <option value="PR">PR</option>
            </select>
          </div>
        </div>
      </fieldset>
      <button type="submit">Enviar cadastro</button>
    </form>
    <div id="toast" class="toast" role="status" aria-live="polite"></div>
  `;
}
