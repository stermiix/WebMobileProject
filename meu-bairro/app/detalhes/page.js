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

const problemasFixos = {
  1: {
    id: 1,
    titulo: "Lixo acumulado",
    categoria: "Limpeza",
    icone: "🗑️",
    endereco: "Rua das Flores, 125",
    data: "02/09/2026",
    horario: "14:30",
    morador: "João da Silva",
    descricao:
      "Foi identificado um grande acúmulo de lixo próximo à calçada. O local está com bastante sujeira e precisa de limpeza para evitar problemas para os moradores da região.",
  },
  2: {
    id: 2,
    titulo: "Iluminação pública",
    categoria: "Iluminação",
    icone: "💡",
    endereco: "Avenida Central, 450",
    data: "01/09/2026",
    horario: "20:15",
    morador: "Maria Oliveira",
    descricao:
      "O poste de iluminação está sem funcionar durante a noite, deixando a região com pouca iluminação.",
  },
  3: {
    id: 3,
    titulo: "Buraco na rua",
    categoria: "Vias públicas",
    icone: "🕳️",
    endereco: "Rua da Educação, 80",
    data: "30/08/2026",
    horario: "09:40",
    morador: "Carlos Mendes",
    descricao:
      "Existe um buraco grande na rua que pode causar acidentes para motoristas, motociclistas e pedestres.",
  },
  4: {
    id: 4,
    titulo: "Calçada danificada",
    categoria: "Acessibilidade",
    icone: "🚧",
    endereco: "Rua da Paz, 210",
    data: "29/08/2026",
    horario: "16:20",
    morador: "Ana Costa",
    descricao:
      "A calçada apresenta partes quebradas e dificulta a passagem dos pedestres.",
  },
  5: {
    id: 5,
    titulo: "Vazamento",
    categoria: "Saneamento",
    icone: "💧",
    endereco: "Rua Central, 300",
    data: "28/08/2026",
    horario: "11:10",
    morador: "Pedro Santos",
    descricao: "Foi identificado um vazamento próximo à calçada.",
  },
};

function lerLista(chave) {
  try {
    const dados = JSON.parse(localStorage.getItem(chave) || "[]");
    return Array.isArray(dados) ? dados : [];
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

export default function DetalhesPage({ problemaIdInicial = null }) {
  const [problema, setProblema] = useState(problemasFixos[1]);
  const [origem, setOrigem] = useState("notificacoes");
  const [voto, setVoto] = useState("");
  const [mensagemVoto, setMensagemVoto] = useState("");
  const [carregado, setCarregado] = useState(false);
  const [naoEncontrado, setNaoEncontrado] = useState(false);

  useEffect(() => {
    const parametros = new URLSearchParams(window.location.search);
    const id = problemaIdInicial ?? parametros.get("problemaId");
    const origemUrl = parametros.get("origem");

    setOrigem(origemUrl === "mapa" ? "mapa" : "notificacoes");

    const problemasSalvos = lerLista("problemas");
    const resolvidos = lerLista("problemasResolvidos");

    let selecionado = null;

    if (id) {
      selecionado = problemasSalvos.find(
        (item) => String(item.id) === String(id)
      );

      if (!selecionado) {
        selecionado = problemasFixos[id] || null;
      }
    } else {
      selecionado = problemasFixos[1];
    }

    if (!selecionado) {
      setNaoEncontrado(true);
      setCarregado(true);
      return;
    }

    const nomeSalvo = localStorage.getItem("nomeUsuario");
    const nomeUsuario =
      nomeSalvo && nomeSalvo.trim() !== ""
        ? nomeSalvo
        : "João da Silva";

    const categoriaOriginal =
      selecionado.categoria || selecionado.titulo;

    const categoria = obterCategoria(categoriaOriginal);

    setProblema({
      ...selecionado,
      categoria,
      icone: obterIcone(categoriaOriginal),
      endereco: selecionado.endereco || "Endereço não informado",
      data: selecionado.data || "Data não informada",
      horario: selecionado.horario || "Horário não informado",
      morador: selecionado.morador || nomeUsuario,
      descricao: selecionado.descricao || "Sem descrição disponível.",
    });

    const votoResolvido = resolvidos.some(
      (item) => String(item) === String(selecionado.id)
    );

    setVoto(votoResolvido ? "resolvido" : "");
    setCarregado(true);
  }, [problemaIdInicial]);

  function registrarVoto(novoVoto) {
    const resolvidos = lerLista("problemasResolvidos");
    let atualizados = resolvidos;

    if (novoVoto === "resolvido") {
      if (
        !atualizados.some(
          (item) => String(item) === String(problema.id)
        )
      ) {
        atualizados = [...atualizados, problema.id];
      }

      setMensagemVoto(
        "Obrigado! Seu voto indica que o problema foi resolvido."
      );
    } else {
      atualizados = atualizados.filter(
        (item) => String(item) !== String(problema.id)
      );

      setMensagemVoto(
        "Obrigado! Seu voto indica que o problema ainda existe."
      );
    }

    localStorage.setItem(
      "problemasResolvidos",
      JSON.stringify(atualizados)
    );

    setVoto(novoVoto);
  }

  function excluirProblema() {
    const confirmar = window.confirm(
      "Tem certeza que deseja excluir este problema?"
    );

    if (!confirmar) {
      return;
    }

    const problemasSalvos = lerLista("problemas");
    const problemasAtualizados = problemasSalvos.filter(
      (item) => String(item.id) !== String(problema.id)
    );

    localStorage.setItem(
      "problemas",
      JSON.stringify(problemasAtualizados)
    );

    const excluidos = lerLista("problemasExcluidos");

    if (
      !excluidos.some(
        (item) => String(item) === String(problema.id)
      )
    ) {
      excluidos.push(problema.id);
    }

    localStorage.setItem(
      "problemasExcluidos",
      JSON.stringify(excluidos)
    );

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