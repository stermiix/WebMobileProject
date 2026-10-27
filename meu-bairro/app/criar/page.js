/*
  Leonardo de Castro Tonon - RA 10426930
  Leonardo Patriani Cardoso - RA 10417188
  Antonio Renilson Bezerra da Silva - RA 10722184
  Bernardo Souza Oliveira - RA 10312871
*/

"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import styles from "./page.module.css";

const categorias = [
  { nome: "Lixo acumulado", icone: "🗑️" },
  { nome: "Iluminação", icone: "💡" },
  { nome: "Buraco na rua", icone: "🕳️" },
  { nome: "Calçada danificada", icone: "🚧" },
  { nome: "Vazamento", icone: "💧" },
  { nome: "Outro", icone: "❓" },
];

export default function CriarPage() {
  const [categoriaSelecionada, setCategoriaSelecionada] = useState("");
  const [localizacao, setLocalizacao] = useState("");
  const [descricao, setDescricao] = useState("");
  const [fotoSelecionada, setFotoSelecionada] = useState("");
  const [publicado, setPublicado] = useState(false);

  const campoLocalizacaoRef = useRef(null);
  const campoDescricaoRef = useRef(null);
  const campoFotoRef = useRef(null);

  function selecionarLocalizacao() {
    setLocalizacao("Rua das Flores, 125");
  }

  function selecionarFoto(evento) {
    const arquivo = evento.target.files?.[0];

    if (!arquivo) {
      return;
    }

    const leitor = new FileReader();

    leitor.onload = () => {
      setFotoSelecionada(String(leitor.result || ""));
    };

    leitor.readAsDataURL(arquivo);
  }

  function publicarProblema(evento) {
    evento.preventDefault();

    if (!categoriaSelecionada) {
      alert("Selecione uma categoria para continuar.");
      return;
    }

    if (!localizacao.trim()) {
      alert("Informe a localização do problema.");
      campoLocalizacaoRef.current?.focus();
      return;
    }

    if (!descricao.trim()) {
      alert("Informe uma descrição do problema.");
      campoDescricaoRef.current?.focus();
      return;
    }

    const agora = new Date();

    const dia = String(agora.getDate()).padStart(2, "0");
    const mes = String(agora.getMonth() + 1).padStart(2, "0");
    const ano = agora.getFullYear();
    const hora = String(agora.getHours()).padStart(2, "0");
    const minutos = String(agora.getMinutes()).padStart(2, "0");

    const nomeSalvo = localStorage.getItem("nomeUsuario");
    const nomeUsuario =
      nomeSalvo && nomeSalvo.trim() !== ""
        ? nomeSalvo
        : "João da Silva";

    const novoProblema = {
      id: Date.now(),
      titulo: categoriaSelecionada,
      categoria: categoriaSelecionada,
      endereco: localizacao.trim(),
      data: `${dia}/${mes}/${ano}`,
      horario: `${hora}:${minutos}`,
      morador: nomeUsuario,
      descricao: descricao.trim(),
      foto: fotoSelecionada || null,
    };

    try {
      const dadosSalvos = JSON.parse(
        localStorage.getItem("problemas") || "[]"
      );

      const problemasSalvos = Array.isArray(dadosSalvos)
        ? dadosSalvos
        : [];

      problemasSalvos.push(novoProblema);

      localStorage.setItem("problemas", JSON.stringify(problemasSalvos));

      setPublicado(true);
    } catch {
      alert(
        "Não foi possível salvar o problema. Tente novamente com uma foto menor."
      );
    }
  }

  if (publicado) {
    return (
      <main className={styles.container}>
        <section className={styles.mensagemSucesso}>
          <div className={styles.sucessoIcon}>✓</div>

          <h2>Problema publicado com sucesso!</h2>

          <p>Obrigado por ajudar a melhorar a comunidade.</p>

          <Link href="/">Voltar para o mapa</Link>
        </section>
      </main>
    );
  }

  return (
    <main className={styles.container}>
      <section className={styles.cabecalho}>
        <h1>Registrar problema</h1>

        <p>
          Ajude a comunidade registrando um problema encontrado no bairro.
        </p>
      </section>

      <form className={styles.formulario} onSubmit={publicarProblema}>
        <section className={styles.grupo}>
          <h2>Tipo de problema</h2>

          <p className={styles.ajuda}>
            Selecione a categoria que melhor representa o problema encontrado.
          </p>

          <div className={styles.categorias}>
            {categorias.map((categoria) => (
              <button
                className={`${styles.categoria} ${
                  categoriaSelecionada === categoria.nome
                    ? styles.selecionada
                    : ""
                }`}
                type="button"
                key={categoria.nome}
                onClick={() => setCategoriaSelecionada(categoria.nome)}
                aria-pressed={categoriaSelecionada === categoria.nome}
              >
                <span>{categoria.icone}</span>
                <span>{categoria.nome}</span>
              </button>
            ))}
          </div>
        </section>

        <section className={styles.grupo}>
          <h2>Localização</h2>

          <p className={styles.ajuda}>
            Informe onde o problema foi encontrado.
          </p>

          <label htmlFor="localizacao">Endereço</label>

          <div className={styles.campoLocalizacao}>
            <input
              ref={campoLocalizacaoRef}
              id="localizacao"
              name="localizacao"
              type="text"
              value={localizacao}
              onChange={(evento) => setLocalizacao(evento.target.value)}
              placeholder="Ex.: Rua das Flores, 125"
            />

            <button
              type="button"
              className={styles.botaoLocalizacao}
              onClick={selecionarLocalizacao}
            >
              📍 Usar minha localização
            </button>
          </div>
        </section>

        <section className={styles.grupo}>
          <h2>Foto do problema</h2>

          <p className={styles.ajuda}>
            Adicione uma foto para ajudar a identificar a situação.
          </p>

          <input
            ref={campoFotoRef}
            id="foto"
            type="file"
            accept=".jpg,.jpeg,.png,image/jpeg,image/png"
            hidden
            onChange={selecionarFoto}
          />

          <button
            type="button"
            className={styles.areaFoto}
            onClick={() => campoFotoRef.current?.click()}
          >
            {fotoSelecionada ? (
              <img
                className={styles.previaFoto}
                src={fotoSelecionada}
                alt="Pré-visualização do problema"
              />
            ) : (
              <>
                <span className={styles.iconeFoto}>📷</span>
                <span>Adicionar foto</span>
                <small>JPG, PNG ou JPEG</small>
              </>
            )}
          </button>
        </section>

        <section className={styles.grupo}>
          <h2>Descrição</h2>

          <p className={styles.ajuda}>
            Explique brevemente o problema encontrado.
          </p>

          <label htmlFor="descricao">Descrição do problema</label>

          <textarea
            ref={campoDescricaoRef}
            id="descricao"
            name="descricao"
            value={descricao}
            onChange={(evento) => setDescricao(evento.target.value)}
            maxLength={300}
            placeholder="Descreva o problema encontrado..."
            rows={5}
          />

          <div className={styles.contadorDescricao}>
            {descricao.length}/300 caracteres
          </div>
        </section>

        <section className={styles.grupo}>
          <button className={styles.botaoPublicar} type="submit">
            Publicar problema
          </button>

          <p className={styles.ajuda}>
            Ao publicar, o problema ficará disponível para os moradores da
            comunidade.
          </p>
        </section>
      </form>
    </main>
  );
}