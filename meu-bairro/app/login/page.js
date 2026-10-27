"use client";

/*
  Leonardo de Castro Tonon - RA 10426930
  Leonardo Patriani Cardoso - RA 10417188
  Antonio Renilson Bezerra da Silva - RA 10722184
  Bernardo Souza Oliveira - RA 10312871
*/

import { useRef, useState } from "react";
import styles from "./page.module.css";

export default function LoginPage() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [bairro, setBairro] = useState("");
  const [mensagem, setMensagem] = useState("");

  const campoNome = useRef(null);
  const campoEmail = useRef(null);
  const campoBairro = useRef(null);

  function handleSubmit(evento) {
    evento.preventDefault();

    const nomeInformado = nome.trim();
    const emailInformado = email.trim();
    const bairroInformado = bairro.trim();

    setMensagem("");

    if (nomeInformado === "") {
      setMensagem("Digite seu nome.");
      campoNome.current?.focus();
      return;
    }

    if (emailInformado === "") {
      setMensagem("Digite seu e-mail.");
      campoEmail.current?.focus();
      return;
    }

    if (bairroInformado === "") {
      setMensagem("Digite seu bairro.");
      campoBairro.current?.focus();
      return;
    }

    localStorage.setItem("usuarioLogado", "true");
    localStorage.setItem("nomeUsuario", nomeInformado);
    localStorage.setItem("emailUsuario", emailInformado);
    localStorage.setItem("bairroUsuario", bairroInformado);

    window.location.href = "/";
  }

  return (
    <main className={styles.container}>
      <section className={styles.cartao}>
        <div className={styles.logo}>🏠</div>

        <h1>Meu Bairro</h1>

        <p className={styles.subtitulo}>
          Participe da melhoria da sua comunidade.
        </p>

        <form
          id="form-login"
          className={styles.formulario}
          onSubmit={handleSubmit}
        >
          <div className={styles.grupo}>
            <label htmlFor="nome">Nome</label>

            <input
              ref={campoNome}
              id="nome"
              type="text"
              placeholder="Digite seu nome"
              autoComplete="name"
              value={nome}
              onChange={(evento) => setNome(evento.target.value)}
            />
          </div>

          <div className={styles.grupo}>
            <label htmlFor="email">E-mail</label>

            <input
              ref={campoEmail}
              id="email"
              type="email"
              placeholder="Digite seu e-mail"
              autoComplete="email"
              value={email}
              onChange={(evento) => setEmail(evento.target.value)}
            />
          </div>

          <div className={styles.grupo}>
            <label htmlFor="bairro">Bairro</label>

            <input
              ref={campoBairro}
              id="bairro"
              type="text"
              placeholder="Digite seu bairro"
              autoComplete="address-level2"
              value={bairro}
              onChange={(evento) => setBairro(evento.target.value)}
            />
          </div>

          <button className={styles.botao} type="submit">
            Entrar
          </button>
        </form>

        <p
          id="mensagem-login"
          className={styles.mensagemLogin}
          aria-live="polite"
        >
          {mensagem}
        </p>

        <p className={styles.aviso}>
          Protótipo acadêmico do projeto Meu Bairro.
        </p>
      </section>
    </main>
  );
}