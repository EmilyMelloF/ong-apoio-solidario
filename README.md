# ONG Apoio Solidário

Projeto acadêmico fictício de Desenvolvimento Front-End. A aplicação apresenta uma ONG, três frentes sociais e um cadastro demonstrativo de voluntários.

## Funcionalidades e tecnologias

- SPA em HTML5, CSS3 e JavaScript puro com módulos ES e rotas `#/inicio`, `#/projetos` e `#/cadastro`.
- Cartões gerados a partir de dados JavaScript, menu responsivo e formulário com máscaras e validação nativa.
- Rascunho salvo no `localStorage` e restaurado ao voltar ao cadastro. O envio válido limpa o rascunho e exibe SweetAlert2 ou feedback da página.
- Modo de alto contraste com preferência salva no navegador.
- Vite apenas para desenvolvimento e build; `html-minifier-terser` minifica o HTML de produção.

O cadastro não envia dados a um servidor. Use dados fictícios: nome, CPF, endereço e demais campos do rascunho ficam no navegador até o envio demonstrativo válido.

## Requisitos e execução local

Use Node.js 22.12 ou superior e npm. Na raiz do repositório:

```sh
npm ci
npm run dev
```

Abra <http://localhost:5173/ong-apoio-solidario/html/>. O SweetAlert2 depende de internet; sem ele, a mensagem de sucesso da página continua disponível.

Para gerar e testar a versão de produção:

```sh
npm run build
npm run preview
```

Abra <http://localhost:4173/ong-apoio-solidario/>. O build fica em `dist/`, que não é versionado. Também é possível servir os arquivos fonte com `python -m http.server 5500` e abrir <http://localhost:5500/html/>.

## Estrutura

- `html/index.html`: estrutura fixa, navegação e carregamento do SweetAlert2.
- `css/style.css`: visual, responsividade, foco e alto contraste.
- `imagens/`: logo e foto em JPG/WebP nos tamanhos 700 e 1200 px.
- `js/`: inicialização, rotas, templates, formulário e armazenamento.
- `scripts/`: minificação do HTML e verificação de contraste.
- `.github/workflows/pages.yml`: build e publicação automática.
- `evidencias/`: capturas de estados testados.

## Acessibilidade e otimizações

O layout usa `header`, `nav`, `main`, `footer`, títulos em ordem, labels e textos alternativos. Há link para pular o menu, foco visível, anúncio de mudanças de rota, erros ligados aos campos, estados do menu e do alto contraste, além de fechamento por Escape. A interface respeita `prefers-reduced-motion`. Execute `npm run contraste` para medir pares de cores pela fórmula WCAG.

A foto usa `<picture>`, WebP com fallback JPG e `srcset`/`sizes`. O navegador pode selecionar 700 px para telas comuns e 1200 px para maior densidade. A imagem mantém largura e altura declaradas. O build minifica HTML, CSS e JavaScript e gera arquivos de assets com hash.

## Git e deploy

`main` contém a versão estável, `develop` reúne mudanças e `feature/acessibilidade` e `feature/producao` se integram por pull requests. Os commits do Projeto 4 seguem Conventional Commits (`feat:`, `build:`, `perf:`, `docs:`). As tags dos Projetos 1, 2 e 3 preservam entregas anteriores; `v1.0.0` e `projeto-4-final` identificam a versão final após a integração.

O GitHub Actions executa `npm ci` e `npm run build` nos PRs. Ao receber alterações em `main`, também envia `dist/` ao GitHub Pages. URL configurada: <https://emilymellof.github.io/ong-apoio-solidario/>.

Fotografia: [Shadrack D Nantomah / Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Community_Clean_up_exercise.jpg), disponibilizada em [CC0](https://creativecommons.org/publicdomain/zero/1.0/). Versões JPG e WebP redimensionadas para o projeto.
