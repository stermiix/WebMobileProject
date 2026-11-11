// Persistência em arquivo JSON (data/problemas.json).
// Os dados sobrevivem a refresh da página e a reinício do servidor.
import { promises as fs } from "fs";
import path from "path";

const ARQUIVO = path.join(process.cwd(), "data", "problemas.json");

const SEMENTE = [
  {
    id: 1,
    titulo: "Lixo acumulado",
    categoria: "Limpeza",
    endereco: "Rua das Flores, 125",
    data: "02/09/2026",
    horario: "14:30",
    morador: "João da Silva",
    descricao:
      "Foi identificado um grande acúmulo de lixo próximo à calçada. O local está com bastante sujeira e precisa de limpeza para evitar problemas para os moradores da região.",
    foto: null,
    status: "Aberto",
    posicao: "m1",
    novoInicial: true,
  },
  {
    id: 2,
    titulo: "Iluminação pública",
    categoria: "Iluminação",
    endereco: "Avenida Central, 450",
    data: "01/09/2026",
    horario: "20:15",
    morador: "Maria Oliveira",
    descricao:
      "O poste de iluminação está sem funcionar durante a noite, deixando a região com pouca iluminação.",
    foto: null,
    status: "Aberto",
    posicao: "m2",
    novoInicial: true,
  },
  {
    id: 3,
    titulo: "Buraco na rua",
    categoria: "Vias públicas",
    endereco: "Rua da Educação, 80",
    data: "30/08/2026",
    horario: "09:40",
    morador: "Carlos Mendes",
    descricao:
      "Existe um buraco grande na rua que pode causar acidentes para motoristas, motociclistas e pedestres.",
    foto: null,
    status: "Aberto",
    posicao: "m3",
    novoInicial: false,
  },
  {
    id: 4,
    titulo: "Calçada danificada",
    categoria: "Acessibilidade",
    endereco: "Rua da Paz, 210",
    data: "29/08/2026",
    horario: "16:20",
    morador: "Ana Costa",
    descricao:
      "A calçada apresenta partes quebradas e dificulta a passagem dos pedestres.",
    foto: null,
    status: "Aberto",
    posicao: "m4",
    novoInicial: false,
  },
  {
    id: 5,
    titulo: "Vazamento",
    categoria: "Saneamento",
    endereco: "Rua Central, 300",
    data: "28/08/2026",
    horario: "11:10",
    morador: "Pedro Santos",
    descricao: "Foi identificado um vazamento próximo à calçada.",
    foto: null,
    status: "Aberto",
    posicao: "m5",
    novoInicial: false,
  },
];

// Serializa as escritas para evitar corrida entre requisições.
let fila = Promise.resolve();

export async function lerProblemas() {
  try {
    const texto = await fs.readFile(ARQUIVO, "utf8");
    const dados = JSON.parse(texto);
    return Array.isArray(dados) ? dados : [];
  } catch {
    await salvarProblemas(SEMENTE);
    return SEMENTE.map((p) => ({ ...p }));
  }
}

export function salvarProblemas(lista) {
  fila = fila.then(async () => {
    await fs.mkdir(path.dirname(ARQUIVO), { recursive: true });
    const tmp = `${ARQUIVO}.tmp`;
    await fs.writeFile(tmp, JSON.stringify(lista, null, 2), "utf8");
    await fs.rename(tmp, ARQUIVO);
  });
  return fila;
}

// Executa leitura+alteração+gravação de forma atômica.
export function alterarProblemas(funcao) {
  const resultado = fila.then(async () => {
    const lista = await lerProblemas();
    const { lista: nova, retorno } = await funcao(lista);
    if (nova) {
      await fs.mkdir(path.dirname(ARQUIVO), { recursive: true });
      const tmp = `${ARQUIVO}.tmp`;
      await fs.writeFile(tmp, JSON.stringify(nova, null, 2), "utf8");
      await fs.rename(tmp, ARQUIVO);
    }
    return retorno;
  });
  fila = resultado.catch(() => {});
  return resultado;
}

export function categoriaPadrao(categoria) {
  const t = String(categoria || "")
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase();
  if (t.includes("lixo") || t.includes("limpeza")) return "Limpeza";
  if (t.includes("iluminacao")) return "Iluminação";
  if (t.includes("buraco") || t.includes("vias")) return "Vias públicas";
  if (t.includes("calcada") || t.includes("acessibilidade"))
    return "Acessibilidade";
  if (t.includes("vazamento") || t.includes("saneamento")) return "Saneamento";
  return "Outros";
}
