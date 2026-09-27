import { readFile, rename, rmdir, writeFile } from "node:fs/promises";
import { minify } from "html-minifier-terser";

const arquivo = new URL("../dist/html/index.html", import.meta.url);
const destino = new URL("../dist/index.html", import.meta.url);
const html = await readFile(arquivo, "utf8");
const resultado = await minify(html, {
  collapseWhitespace: true,
  removeComments: true,
  removeOptionalTags: false,
  removeRedundantAttributes: false
});

await writeFile(arquivo, resultado);
await rename(arquivo, destino);
await rmdir(new URL("../dist/html/", import.meta.url));
