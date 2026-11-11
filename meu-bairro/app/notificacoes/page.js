
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
  const [problemas, setProblemas] = useState([]);
  const [termoBusca, setTermoBusca] = useState("");
  const [categoriaSelecionada, setCategoriaSelecionada] = useState("todas");
  const [problemasVisualizados, setProblemasVisualizados] = useState([]);
  const [problemasResolvidos, setProblemasResolvidos] = useState([]);
  const [notificacoesAtivas, setNotificacoesAtivas] = useState(true);

  useEffect(() => {
    const visualizados = lerLista("problemasVisualizados");
    const nomeUsuario = localStorage.getItem("nomeUsuario") || "João da Silva";
    const preferencia = localStorage.getItem("notificacoesAtivas");

    setProblemasVisualizados(visualizados.map(String));
    setNotificacoesAtivas(preferencia !== "false");

    fetch("/api/notificacoes")
      .then((resposta) => {
        if (!resposta.ok) throw new Error("Falha na API");
        return resposta.json();
      })
      .then((dados) => {
        const lista = Array.isArray(dados) ? dados : [];

        setProblemas(
          lista.map((problema) => ({
            ...problema,
            categoria: obterCategoria(problema.categoria),
            morador: problema.morador || nomeUsuario,
            endereco: problema.endereco || "Localização não informada",
            descricao: problema.descricao || "Sem descrição disponível.",
            data: problema.data || "Data não informada",
            icone: obterIcone(problema.categoria),
            cor: obterCor(problema.categoria),
          }))
        );

        setProblemasResolvidos(
          lista.filter((p) => p.status === "Resolvido").map((p) => String(p.id))
        );
      })
      .catch(() => setProblemas([]));
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

  const problemasVisiveis = problemas;

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
              href={`/detalhes/${encodeURIComponent(
                problema.id
              )}?origem=notificacoes`}
              className={styles.linkProblema}
              onClick={() => marcarComoVisualizado(problema.id)}
            >
              <article
                className={`${styles.card} ${
                  novo ? styles.naoVisualizado : ""
                }`}
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
