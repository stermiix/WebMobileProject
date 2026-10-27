/*
  Leonardo de Castro Tonon - RA 10426930
  Leonardo Patriani Cardoso - RA 10417188
  Antonio Renilson Bezerra da Silva - RA 10722184
  Bernardo Souza Oliveira - RA 10312871
*/

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import styles from "./page.module.css";

const problemasFixos = [
  {
    id: 1,
    titulo: "Lixo acumulado",
    categoria: "limpeza",
    icone: "🗑️",
    posicao: "m1",
    endereco: "Rua das Flores",
  },
  {
    id: 2,
    titulo: "Iluminação pública",
    categoria: "iluminacao",
    icone: "💡",
    posicao: "m2",
    endereco: "Rua da Educação",
  },
  {
    id: 3,
    titulo: "Buraco na rua",
    categoria: "vias",
    icone: "🕳️",
    posicao: "m3",
    endereco: "Avenida Central",
  },
  {
    id: 4,
    titulo: "Calçada danificada",
    categoria: "acessibilidade",
    icone: "🚧",
    posicao: "m4",
    endereco: "Avenida Principal",
  },
  {
    id: 5,
    titulo: "Vazamento",
    categoria: "saneamento",
    icone: "💧",
    posicao: "m5",
    endereco: "Rua da Paz",
  },
];

const posicoesNovosMarcadores = [
  { left: "350px", top: "80px" },
  { left: "595px", top: "250px" },
  { left: "835px", top: "80px" },
  { left: "110px", top: "250px" },
  { left: "595px", top: "430px" },
  { left: "835px", top: "430px" },
  { left: "110px", top: "430px" },
];

function obterClasseMarcador(categoria) {
  const nome = String(categoria || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();

  if (nome.includes("lixo") || nome.includes("limpeza")) {
    return "limpeza";
  }

  if (nome.includes("iluminacao")) {
    return "iluminacao";
  }

  if (nome.includes("buraco") || nome.includes("vias")) {
    return "vias";
  }

  if (nome.includes("calcada") || nome.includes("acessibilidade")) {
    return "acessibilidade";
  }

  if (nome.includes("vazamento") || nome.includes("saneamento")) {
    return "saneamento";
  }

  return "vias";
}

function obterIcone(categoria) {
  const classe = obterClasseMarcador(categoria);

  const icones = {
    limpeza: "🗑️",
    iluminacao: "💡",
    vias: "🕳️",
    acessibilidade: "🚧",
    saneamento: "💧",
  };

  return icones[classe];
}

export default function Home() {
  const [categoriaSelecionada, setCategoriaSelecionada] = useState("todas");
  const [problemasSalvos, setProblemasSalvos] = useState([]);
  const [problemasExcluidos, setProblemasExcluidos] = useState([]);

  useEffect(() => {
    try {
      const problemas = JSON.parse(
        localStorage.getItem("problemas") || "[]"
      );

      const excluidos = JSON.parse(
        localStorage.getItem("problemasExcluidos") || "[]"
      );

      setProblemasSalvos(Array.isArray(problemas) ? problemas : []);
      setProblemasExcluidos(
        Array.isArray(excluidos) ? excluidos.map(String) : []
      );
    } catch {
      setProblemasSalvos([]);
      setProblemasExcluidos([]);
    }
  }, []);

  const fixosVisiveis = problemasFixos.filter(
    (problema) => !problemasExcluidos.includes(String(problema.id))
  );

  const novosVisiveis = problemasSalvos
    .filter(
      (problema) => !problemasExcluidos.includes(String(problema.id))
    )
    .map((problema, index) => ({
      ...problema,
      classe: obterClasseMarcador(problema.categoria),
      icone: obterIcone(problema.categoria),
      posicao:
        posicoesNovosMarcadores[
          index % posicoesNovosMarcadores.length
        ],
    }));

  const fixosFiltrados = fixosVisiveis.filter(
    (problema) =>
      categoriaSelecionada === "todas" ||
      problema.categoria === categoriaSelecionada
  );

  const novosFiltrados = novosVisiveis.filter(
    (problema) =>
      categoriaSelecionada === "todas" ||
      problema.classe === categoriaSelecionada
  );

  const totalProblemas = fixosVisiveis.length + novosVisiveis.length;

  return (
    <main className={styles.container}>
      <section className={styles.pageHeader}>
        <h1>Mapa do bairro</h1>
        <p>Veja os problemas registrados pela comunidade.</p>
      </section>

      <section className={styles.mapaCard}>
        <div className={styles.filtroMapa}>
          <label htmlFor="filtro-categoria-mapa">
            Filtrar por categoria:
          </label>

          <select
            id="filtro-categoria-mapa"
            value={categoriaSelecionada}
            onChange={(evento) =>
              setCategoriaSelecionada(evento.target.value)
            }
          >
            <option value="todas">Todas</option>
            <option value="limpeza">Limpeza</option>
            <option value="iluminacao">Iluminação</option>
            <option value="vias">Vias públicas</option>
            <option value="acessibilidade">Acessibilidade</option>
            <option value="saneamento">Saneamento</option>
          </select>
        </div>

        <div className={styles.mapa}>
          <div className={`${styles.quadra} ${styles.q1}`}></div>
          <div className={`${styles.quadra} ${styles.q2}`}></div>
          <div className={`${styles.quadra} ${styles.q3}`}></div>
          <div className={`${styles.quadra} ${styles.q4}`}></div>
          <div className={`${styles.quadra} ${styles.q5}`}></div>
          <div className={`${styles.quadra} ${styles.q6}`}></div>
          <div className={`${styles.quadra} ${styles.q7}`}></div>
          <div className={`${styles.quadra} ${styles.q8}`}></div>
          <div className={`${styles.quadra} ${styles.q9}`}></div>
          <div className={`${styles.quadra} ${styles.q10}`}></div>
          <div className={`${styles.quadra} ${styles.q11}`}></div>
          <div className={`${styles.quadra} ${styles.q12}`}></div>

          <div className={`${styles.ruaHorizontal} ${styles.rua1}`}>
            Rua das Flores
          </div>
          <div className={`${styles.ruaHorizontal} ${styles.rua2}`}>
            Rua da Educação
          </div>
          <div className={`${styles.ruaHorizontal} ${styles.rua3}`}>
            Rua da Paz
          </div>

          <div className={`${styles.ruaVertical} ${styles.ruav1}`}>
            Avenida Central
          </div>
          <div className={`${styles.ruaVertical} ${styles.ruav2}`}>
            Rua Central
          </div>
          <div className={`${styles.ruaVertical} ${styles.ruav3}`}>
            Avenida Principal
          </div>

          {fixosFiltrados.map((problema) => (
            <Link
              key={`fixo-${problema.id}`}
              href={`/detalhes?problemaId=${problema.id}&origem=mapa`}
              className={`${styles.marcador} ${
                styles[problema.categoria]
              } ${styles[problema.posicao]}`}
              title={problema.titulo}
              aria-label={`Ver detalhes: ${problema.titulo}`}
            >
              {problema.icone}
            </Link>
          ))}

          {novosFiltrados.map((problema) => (
            <Link
              key={`novo-${problema.id}`}
              href={`/detalhes?problemaId=${problema.id}&origem=mapa`}
              className={`${styles.marcador} ${styles[problema.classe]}`}
              style={{
                left: problema.posicao.left,
                top: problema.posicao.top,
                textDecoration: "none",
              }}
              title={`${problema.titulo || problema.categoria} - ${
                problema.endereco || "Local não informado"
              }`}
              aria-label={`Ver detalhes: ${
                problema.titulo || problema.categoria
              }`}
            >
              {problema.icone}
            </Link>
          ))}
        </div>

        <div className={styles.legenda}>
          <h2>Legenda:</h2>

          <div className={styles.legendaItem}>
            <span className={`${styles.legendaCor} ${styles.limpeza}`}></span>
            Limpeza
          </div>

          <div className={styles.legendaItem}>
            <span
              className={`${styles.legendaCor} ${styles.iluminacao}`}
            ></span>
            Iluminação
          </div>

          <div className={styles.legendaItem}>
            <span className={`${styles.legendaCor} ${styles.vias}`}></span>
            Vias públicas
          </div>

          <div className={styles.legendaItem}>
            <span
              className={`${styles.legendaCor} ${styles.acessibilidade}`}
            ></span>
            Acessibilidade
          </div>

          <div className={styles.legendaItem}>
            <span
              className={`${styles.legendaCor} ${styles.saneamento}`}
            ></span>
            Saneamento
          </div>
        </div>

        <div className={styles.mapaInfo}>
          📍 Existem {totalProblemas} problemas registrados atualmente no
          bairro. Clique em um marcador para visualizar os detalhes do
          problema.
        </div>
      </section>
    </main>
  );
}