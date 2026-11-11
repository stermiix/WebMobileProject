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

export default function DetalhesPage({ problemaIdInicial = null }) {
  const [problema, setProblema] = useState({});
  const [origem, setOrigem] = useState("notificacoes");
  const [voto, setVoto] = useState("");
  const [mensagemVoto, setMensagemVoto] = useState("");
  const [carregado, setCarregado] = useState(false);
  const [naoEncontrado, setNaoEncontrado] = useState(false);

  useEffect(() => {
    const parametros = new URLSearchParams(window.location.search);
    const id = problemaIdInicial ?? parametros.get("problemaId") ?? "1";
    const origemUrl = parametros.get("origem");

    setOrigem(origemUrl === "mapa" ? "mapa" : "notificacoes");

    fetch(`/api/problemas/${encodeURIComponent(id)}`)
      .then((resposta) => {
        if (!resposta.ok) throw new Error("Não encontrado");
        return resposta.json();
      })
      .then((selecionado) => {
        const nomeSalvo = localStorage.getItem("nomeUsuario");
        const nomeUsuario =
          nomeSalvo && nomeSalvo.trim() !== ""
            ? nomeSalvo
            : "João da Silva";

        const categoriaOriginal =
          selecionado.categoria || selecionado.titulo;

        setProblema({
          ...selecionado,
          categoria: obterCategoria(categoriaOriginal),
          icone: obterIcone(categoriaOriginal),
          endereco: selecionado.endereco || "Endereço não informado",
          data: selecionado.data || "Data não informada",
          horario: selecionado.horario || "Horário não informado",
          morador: selecionado.morador || nomeUsuario,
          descricao: selecionado.descricao || "Sem descrição disponível.",
        });

        setVoto(selecionado.status === "Resolvido" ? "resolvido" : "");
        setCarregado(true);
      })
      .catch(() => {
        setNaoEncontrado(true);
        setCarregado(true);
      });
  }, [problemaIdInicial]);

  async function registrarVoto(novoVoto) {
    const resposta = await fetch(
      `/api/problemas/${encodeURIComponent(problema.id)}`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          status: novoVoto === "resolvido" ? "Resolvido" : "Aberto",
        }),
      }
    ).catch(() => null);

    if (!resposta || !resposta.ok) {
      setMensagemVoto("Não foi possível registrar seu voto. Tente novamente.");
      return;
    }

    setMensagemVoto(
      novoVoto === "resolvido"
        ? "Obrigado! Seu voto indica que o problema foi resolvido."
        : "Obrigado! Seu voto indica que o problema ainda existe."
    );

    setVoto(novoVoto);
  }

  async function excluirProblema() {
    const confirmar = window.confirm(
      "Tem certeza que deseja excluir este problema?"
    );

    if (!confirmar) {
      return;
    }

    const resposta = await fetch(
      `/api/problemas/${encodeURIComponent(problema.id)}`,
      { method: "DELETE" }
    ).catch(() => null);

    if (!resposta || !resposta.ok) {
      window.alert("Não foi possível excluir o problema.");
      return;
    }

    window.location.href =
      origem === "mapa" ? "/" : "/notificacoes";
  }
  if (!carregado) {
    return (
      <main className={styles.container}>
        <p>Carregando detalhes do problema...</p>
      </main>
    );
  }

  if (naoEncontrado) {
    return (
      <main className={styles.container}>
        <h1>Problema não encontrado</h1>
        <p>Não foi possível localizar essa ocorrência.</p>
        <Link href={origem === "mapa" ? "/" : "/notificacoes"}>
          Voltar
        </Link>
      </main>
    );
  }

  const resolvido = voto === "resolvido";

  return (
    <main className={styles.container}>
      <Link
        href={origem === "mapa" ? "/" : "/notificacoes"}
        className={styles.voltar}
      >
        {origem === "mapa"
          ? "← Voltar para o mapa"
          : "← Voltar para notificações"}
      </Link>

      <section className={styles.cartaoPrincipal}>
        <div className={styles.fotoProblema}>
          <span className={styles.categoriaFoto}>
            {problema.icone} {problema.categoria}
          </span>

          {problema.foto ? (
            <img
              className={styles.imagemProblema}
              src={problema.foto}
              alt={`Foto de ${problema.titulo}`}
            />
          ) : (
            <span className={styles.iconeGrande}>{problema.icone}</span>
          )}
        </div>

        <div className={styles.conteudoDetalhes}>
          <h1 className={styles.tituloProblema}>{problema.titulo}</h1>

          <div className={styles.informacoes}>
            <div className={styles.info}>
              <strong>📍 Endereço</strong>
              <span>{problema.endereco}</span>
            </div>

            <div className={styles.info}>
              <strong>📅 Data</strong>
              <span>{problema.data}</span>
            </div>

            <div className={styles.info}>
              <strong>🕐 Horário</strong>
              <span>{problema.horario}</span>
            </div>

            <div className={styles.info}>
              <strong>👤 Registrado por</strong>
              <span>{problema.morador}</span>
            </div>
          </div>

          <section className={styles.descricaoDetalhes}>
            <h2>Descrição</h2>
            <p>{problema.descricao}</p>
          </section>

          <section className={styles.mapaContainer}>
            <h2>Localização</h2>

            <div className={styles.mapaIlustrativo}>
              <div className={styles.ruaHorizontal}></div>
              <div className={styles.ruaVertical}></div>
              <div className={styles.marcador}>📍</div>
            </div>

            <p className={styles.enderecoMapa}>{problema.endereco}</p>

            <p className={styles.ajuda}>
              Esta representação é ilustrativa e não utiliza um mapa real.
            </p>

            <Link href="/" className={styles.verMapa}>
              🗺️ Ver no mapa
            </Link>
          </section>

          <section className={styles.votacao}>
            <h2>Esse problema ainda existe?</h2>

            <p>Ajude a comunidade informando a situação atual.</p>

            <div className={styles.acoes}>
              <button
                type="button"
                className={`${styles.botaoPrincipal} ${
                  voto === "existe" ? styles.votoSelecionado : ""
                }`}
                onClick={() => registrarVoto("existe")}
              >
                ⚠️ Ainda existe
              </button>

              <button
                type="button"
                className={`${styles.botaoSecundario} ${
                  resolvido ? styles.votoResolvido : ""
                }`}
                onClick={() => registrarVoto("resolvido")}
              >
                ✅ Resolvido
              </button>
            </div>

            {mensagemVoto && (
              <p className={styles.mensagemVoto}>{mensagemVoto}</p>
            )}
          </section>

          <button
            type="button"
            className={styles.botaoExcluir}
            onClick={excluirProblema}
          >
            🗑️ Excluir problema
          </button>
        </div>
      </section>
    </main>
  );
}
