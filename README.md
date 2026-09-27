# ONG Apoio Solidário

Projeto acadêmico de desenvolvimento Front-End para apresentar uma ONG fictícia, seus projetos sociais e um cadastro demonstrativo de voluntários.

## Executar

Na raiz do projeto, inicie um servidor HTTP:

```sh
python -m http.server 5500
```

Acesse <http://localhost:5500/html/>. Os módulos JavaScript precisam de HTTP; abrir o arquivo diretamente no navegador não é suficiente.

## Estrutura

- `html/index.html`: estrutura fixa da aplicação e carregamento do SweetAlert2 por CDN.
- `css/style.css`: Design System, responsividade e estados do formulário.
- `imagens/`: logo e fotografia em JPG e WebP.
- `js/main.js`: inicialização e menu responsivo.
- `js/router.js`: rotas `#/inicio`, `#/projetos` e `#/cadastro` sem recarregar a página.
- `js/templates.js`: conteúdo das páginas e cartões gerados a partir de um array.
- `js/form.js`: máscaras, validação e confirmação demonstrativa.
- `js/storage.js`: rascunho do formulário no `localStorage`.
- `evidencias/`: capturas dos projetos e testes visuais.

O rascunho é salvo apenas no navegador com a chave `apoioSolidario:rascunhoCadastro`. Ele é restaurado ao voltar ao cadastro e removido após uma submissão válida. Nenhum dado é enviado a um servidor. Se o SweetAlert2 estiver indisponível, a confirmação aparece na página.

Fotografia: [Shadrack D Nantomah / Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Community_Clean_up_exercise.jpg), disponibilizada em [CC0](https://creativecommons.org/publicdomain/zero/1.0/). Versões JPG e WebP redimensionadas para o projeto.
