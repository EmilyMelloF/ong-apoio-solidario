const cpf = document.querySelector("#cpf");
const telefone = document.querySelector("#telefone");
const cep = document.querySelector("#cep");

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

document.querySelector("#cadastro").addEventListener("submit", (evento) => {
  evento.preventDefault();
});
