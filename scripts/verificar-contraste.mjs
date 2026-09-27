import { readFileSync } from "node:fs";

const css = readFileSync(new URL("../css/style.css", import.meta.url), "utf8");

function tokens(seletor) {
  const bloco = css.match(new RegExp(`${seletor}\\s*\\{([^}]+)\\}`));
  if (!bloco) throw new Error(`Bloco CSS ausente: ${seletor}`);
  return Object.fromEntries([...bloco[1].matchAll(/(--[\w-]+):\s*(#[0-9a-f]{6})/gi)].map((item) => [item[1], item[2]]));
}

function luminancia(hex) {
  const canais = hex.slice(1).match(/../g).map((canal) => parseInt(canal, 16) / 255);
  const linear = canais.map((valor) => valor <= 0.04045 ? valor / 12.92 : ((valor + 0.055) / 1.055) ** 2.4);
  return linear[0] * 0.2126 + linear[1] * 0.7152 + linear[2] * 0.0722;
}

function contraste(frente, fundo) {
  const valores = [luminancia(frente), luminancia(fundo)].sort((a, b) => b - a);
  return (valores[0] + 0.05) / (valores[1] + 0.05);
}

const normal = tokens(":root");
const alto = tokens(':root\\[data-contraste="alto"\\]');
const pares = [
  ["Texto principal", normal["--cor-texto"], normal["--cor-fundo"], 4.5],
  ["Navegação", normal["--cor-superficie"], normal["--cor-primaria"], 4.5],
  ["Foco em fundo claro", normal["--cor-foco"], normal["--cor-superficie"], 3],
  ["Texto em alto contraste", alto["--cor-texto"], alto["--cor-fundo"], 4.5],
  ["Destaque em alto contraste", alto["--cor-secundaria"], alto["--cor-fundo"], 4.5]
];

for (const [nome, frente, fundo, minimo] of pares) {
  const razao = contraste(frente, fundo);
  console.log(`${nome}: ${frente} / ${fundo} = ${razao.toFixed(2)}:1 (mínimo ${minimo}:1)`);
  if (razao < minimo) process.exitCode = 1;
}
