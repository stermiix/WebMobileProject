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
    categoria: "Limpeza",
    morador: "João da Silva",
    endereco: "Rua das Flores, 125",
    descricao: "Há bastante lixo acumulado próximo à calçada.",
    data: "02/09/2026",
    icone: "🗑️",
    cor: "red",
    novoInicial: true,
  },
  {
    id: 2,
    titulo: "Iluminação pública",
    categoria: "Iluminação",
    morador: "Maria Oliveira",
    endereco: "Avenida Central, 450",
    descricao: "O poste de iluminação está sem funcionar durante a noite.",
    data: "01/09/2026",
    icone: "💡",
    cor: "yellow",
    novoInicial: true,
  },
  {
    id: 3,
    titulo: "Buraco na rua",
    categoria: "Vias públicas",
    morador: "Carlos Mendes",
    endereco: "Rua da Educação, 80",
    descricao: "Existe um buraco grande na rua que pode causar acidentes.",
    data: "30/08/2026",
    icone: "🕳️",
    cor: "orange",
    novoInicial: false,
  },
  {
    id: 4,
    titulo: "Calçada danificada",
    categoria: "Acessibilidade",
    morador: "Ana Costa",
    endereco: "Rua da Paz, 210",
    descricao: "A calçada apresenta partes quebradas e dificulta a passagem dos pedestres.",
    data: "29/08/2026",
    icone: "🚧",
    cor: "purple",
    novoInicial: false,
  },
  {
    id: 5,
    titulo: "Vazamento",
    categoria: "Saneamento",
    morador: "Pedro Santos",
    endereco: "Rua Central, 300",
    descricao: "Foi identificado um vazamento próximo à calçada.",
    data: "28/08/2026",
    icone: "💧",
    cor: "blue",
    novoInicial: false,
  },
];

function lerLista(chave) {
  try {
    const valor = JSON.parse(localStorage.getItem(chave) || "[]");
    return Array.isArray(valor) ? valor : [];
  } catch {
    return [];
  }
}

function obterCategoria(categoria) {
  const texto = String(categoria || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();

  if (texto.includes("lixo") || texto.includes("limpeza")) {
    return "Limpeza";
  }

  if (texto.includes("iluminacao")) {
    return "Iluminação";
  }

  if (texto.includes("buraco") || texto.includes("vias")) {
    return "Vias públicas";
  }

  if (texto.includes("calcada") || texto.includes("acessibilidade")) {
    return "Acessibilidade";
  }

  if (texto.includes("vazamento") || texto.includes("saneamento")) {
    return "Saneamento";
  }

  return "Outros";
}

function obterIcone(categoria) {
  const nome = obterCategoria(categoria);

  const icones = {
    Limpeza: "🗑️",
    Iluminação: "💡",
    "Vias públicas": "🕳️",
    Acessibilidade: "🚧",
    Saneamento: "💧",
  };

  return icones[nome] || "⚠️";
}

function obterCor(categoria) {
  const nome = obterCategoria(categoria);

  const cores = {
    Limpeza: "red",
    Iluminação: "yellow",
    "Vias públicas": "orange",
    Acessibilidade: "purple",
    Saneamento: "blue",
  };

  return cores[nome] || "orange";
}

export default function NotificacoesPage() {
  const [problemas, setProblemas] = useState(problemasFixos);
  const [termoBusca, setTermoBusca] = useState("");
  const [categoriaSelecionada, setCategoriaSelecionada] = useState("todas");
  const [problemasVisualizados, setProblemasVisualizados] = useState([]);
  const [problemasResolvidos, setProblemasResolvidos] = useState([]);
  const [problemasExcluidos, setProblemasExcluidos] = useState([]);
  const [notificacoesAtivas, setNotificacoesAtivas] = useState(true);

  useEffect(() => {
    const salvos = lerLista("problemas");
    const visualizados = lerLista("problemasVisualizados");
    const resolvidos = lerLista("problemasResolvidos");
    const excluidos = lerLista("problemasExcluidos");

    const nomeUsuario = localStorage.getItem("nomeUsuario") || "João da Silva";
    const preferencia = localStorage.getItem("notificacoesAtivas");

    const novosProblemas = salvos
      .filter(
        (problema) =>
          !excluidos.some((id) => String(id) === String(problema.id))
      )
      .map((problema) => ({
        ...problema,
        categoria: obterCategoria(problema.categoria),
        morador: problema.morador || nomeUsuario,
        endereco: problema.endereco || "Localização não informada",
        descricao: problema.descricao || "Sem descrição disponível.",
        data: problema.data || "Data não informada",
        icone: obterIcone(problema.categoria),
        cor: obterCor(problema.categoria),
        novoInicial: true,
        fixo: false,
      }));

    setProblemas([
      ...problemasFixos.map((problema) => ({
        ...problema,
        fixo: true,
      })),
      ...novosProblemas,
    ]);

    setProblemasVisualizados(visualizados.map(String));
    setProblemasResolvidos(resolvidos.map(String));
    setProblemasExcluidos(excluidos.map(String));
    setNotificacoesAtivas(preferencia !== "false");
  }, []);

  function marcarComoVisualizado(id) {
    const idTexto = String(id);

    const atualizados = problemasVisualizados.includes(idTexto)
      ? problemasVisualizados
      : [...problemasVisualizados, idTexto];

    setProblemasVisualizados(atualizados);

    localStorage.setItem(
      "problemasVisualizados",
      JSON.stringify(atualizados)
    );
  }

  const problemasVisiveis = problemas.filter(
    (problema) => !problemasExcluidos.includes(String(problema.id))
  );

  function estaVisualizado(problema) {
    return problemasVisualizados.includes(String(problema.id));
  }

  function estaResolvido(problema) {
    return (
      problemasResolvidos.includes(String(problema.id)) ||
      problema.status === "Resolvido"
    );
  }

  function estaNovo(problema) {
    if (estaVisualizado(problema) || estaResolvido(problema)) {
      return false;
    }

    return problema.novoInicial;
  }

  const problemasFiltrados = problemasVisiveis.filter((problema) => {
    const termo = termoBusca.trim().toLowerCase();

    const combinaBusca =
      problema.titulo.toLowerCase().includes(termo) ||
      problema.endereco.toLowerCase().includes(termo) ||
      problema.descricao.toLowerCase().includes(termo);

    const combinaCategoria =
      categoriaSelecionada === "todas" ||
      obterCategoria(problema.categoria) === categoriaSelecionada;

    return combinaBusca && combinaCategoria;
  });

  const quantidadeNovos = problemasVisiveis.filter(estaNovo).length;

  return (
    <main className={styles.container}>
      <section className={styles.cabecalho}>
        <h1>Notificações</h1>
        <p>
          Confira os problemas registrados recentemente pelos moradores do
          bairro.
        </p>
      </section>

      <div className={styles.filtros}>
        <input
          type="text"
          value={termoBusca}
          onChange={(evento) => setTermoBusca(evento.target.value)}
          placeholder="🔍 Buscar por título, endereço ou descrição..."
          aria-label="Buscar problemas"
        />

        <select
          value={categoriaSelecionada}
          onChange={(evento) => setCategoriaSelecionada(evento.target.value)}
          aria-label="Filtrar por categoria"
        >
          <option value="todas">Todas as categorias</option>
          <option value="Limpeza">Limpeza</option>
          <option value="Iluminação">Iluminação</option>
          <option value="Vias públicas">Vias públicas</option>
          <option value="Acessibilidade">Acessibilidade</option>
          <option value="Saneamento">Saneamento</option>
        </select>
      </div>

      <div className={styles.cabecalhoLista}>
        <h2>Problemas recentes</h2>

        {notificacoesAtivas && (
          <span className={styles.indicador}>
            {quantidadeNovos > 0
              ? `${quantidadeNovos} novos`
              : "Nenhum novo"}
          </span>
        )}
      </div>

      <section className={styles.lista}>
        {problemasFiltrados.map((problema) => {
          const novo = estaNovo(problema);
          const resolvido = estaResolvido(problema);

          let status = "Visualizado";

          if (resolvido) {
            status = "Resolvido";
          } else if (novo) {
            status = "Novo";
          }

          return (
            <Link
              key={problema.id}
              href={`/detalhes?problemaId=${encodeURIComponent(
                problema.id
              )}&origem=notificacoes`}
              className={styles.linkProblema}
              onClick={() => marcarComoVisualizado(problema.id)}
            >
              <article
                className={`${styles.card} ${novo ? styles.naoVisualizado : ""}`}
              >
                <div className={`${styles.icone} ${styles[problema.cor]}`}>
                  {problema.icone}
                </div>

                <div className={styles.conteudo}>
                  <div className={styles.linhaTitulo}>
                    <h3>{problema.titulo}</h3>

                    <span className={styles.categoria}>
                      {obterCategoria(problema.categoria)}
                    </span>

                    {novo && notificacoesAtivas && (
                      <span className={styles.pontoNotificacao} />
                    )}
                  </div>

                  <div className={styles.informacoes}>
                    <span>👤 {problema.morador}</span>
                    <span>📍 {problema.endereco}</span>
                  </div>

                  <p className={styles.descricao}>{problema.descricao}</p>

                  <span
                    className={`${styles.status} ${
                      novo ? styles.statusNovo : ""
                    } ${resolvido ? styles.statusResolvido : ""}`}
                  >
                    {status}
                  </span>
                </div>

                <div className={styles.data}>📅 {problema.data}</div>
              </article>
            </Link>
          );
        })}
      </section>

      <p className={styles.rodape}>
        Exibindo {problemasFiltrados.length} de {problemasVisiveis.length}{" "}
        problemas registrados.
      </p>
    </main>
  );
}