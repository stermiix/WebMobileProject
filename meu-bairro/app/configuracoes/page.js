/*
  Leonardo de Castro Tonon - RA 10426930
  Leonardo Patriani Cardoso - RA 10417188
  Antonio Renilson Bezerra da Silva - RA 10722184
  Bernardo Souza Oliveira - RA 10312871
*/

"use client";

import { useEffect, useState } from "react";
import styles from "./page.module.css";

const conteudosModais = {
  Privacidade: [
    {
      titulo: "Como utilizamos seus dados",
      texto:
        "O Meu Bairro utiliza as informações fornecidas pelo usuário para registrar e acompanhar problemas identificados na comunidade.",
    },
    {
      titulo: "Dados apresentados",
      texto:
        "Informações como nome, localização, descrição e categoria do problema podem ser utilizadas no funcionamento do protótipo.",
    },
    {
      titulo: "Objetivo",
      texto:
        "Os dados têm como finalidade demonstrar o funcionamento do aplicativo e facilitar o acompanhamento de problemas do bairro.",
    },
  ],
  Ajuda: [
    {
      titulo: "Como registrar um problema?",
      texto:
        'Acesse a opção "Registrar" no menu, escolha a categoria do problema, informe a localização, adicione uma descrição e publique o registro.',
    },
    {
      titulo: "Como acompanhar um problema?",
      texto:
        "Os problemas registrados podem ser visualizados na área de notificações e também no mapa do bairro.",
    },
    {
      titulo: "Como funcionam as notificações?",
      texto:
        "As notificações apresentam avisos sobre problemas registrados no bairro. Elas podem ser ativadas ou desativadas nas configurações do aplicativo.",
    },
    {
      titulo: "Posso informar a localização do problema?",
      texto:
        "Sim. Durante o registro de um problema, é possível informar o endereço relacionado à ocorrência.",
    },
  ],
  "Sobre o Meu Bairro": [
    {
      titulo: "Objetivo do projeto",
      texto:
        "O Meu Bairro é um protótipo acadêmico desenvolvido para demonstrar uma solução de participação da comunidade na identificação e acompanhamento de problemas do bairro.",
    },
    {
      titulo: "Principais funcionalidades",
      texto:
        "O projeto permite registrar problemas, visualizar ocorrências no mapa, consultar notificações, visualizar detalhes e acompanhar a situação dos problemas registrados.",
    },
    {
      titulo: "ODS 11",
      texto:
        "O projeto está relacionado à ODS 11 — Cidades e Comunidades Sustentáveis, buscando incentivar a participação da comunidade na identificação de problemas urbanos.",
    },
    {
      titulo: "Tecnologias utilizadas",
      texto:
        "O projeto original utiliza HTML5, CSS3 e JavaScript. A migração atual dá continuidade ao desenvolvimento utilizando React e Next.js.",
    },
  ],
};

function obterIniciais(nome) {
  const partes = nome.trim().split(/\s+/).filter(Boolean);

  if (partes.length === 0) {
    return "JS";
  }

  if (partes.length === 1) {
    return partes[0].substring(0, 2).toUpperCase();
  }

  return (
    partes[0].charAt(0) + partes[partes.length - 1].charAt(0)
  ).toUpperCase();
}

export default function ConfiguracoesPage() {
  const [nome, setNome] = useState("João da Silva");
  const [email, setEmail] = useState("joao.silva@email.com");
  const [bairro, setBairro] = useState("Jardim São Paulo");
  const [notificacoesAtivas, setNotificacoesAtivas] = useState(true);
  const [modalAberto, setModalAberto] = useState(null);

  useEffect(() => {
    const nomeSalvo = localStorage.getItem("nomeUsuario");
    const emailSalvo = localStorage.getItem("emailUsuario");
    const bairroSalvo = localStorage.getItem("bairroUsuario");
    let preferencia = localStorage.getItem("notificacoesAtivas");

    if (nomeSalvo && nomeSalvo.trim()) {
      setNome(nomeSalvo);
    }

    if (emailSalvo && emailSalvo.trim()) {
      setEmail(emailSalvo);
    }

    if (bairroSalvo && bairroSalvo.trim()) {
      setBairro(bairroSalvo);
    }

    if (preferencia === null) {
      preferencia = "true";
      localStorage.setItem("notificacoesAtivas", preferencia);
    }

    setNotificacoesAtivas(preferencia === "true");
  }, []);

  function alternarNotificacoes() {
    const novoEstado = !notificacoesAtivas;

    setNotificacoesAtivas(novoEstado);
    localStorage.setItem("notificacoesAtivas", String(novoEstado));
  }

  function sairDaConta() {
    const confirmar = window.confirm(
      "Deseja realmente sair da sua conta?"
    );

    if (!confirmar) {
      return;
    }

    localStorage.removeItem("usuarioLogado");
    localStorage.removeItem("nomeUsuario");
    localStorage.removeItem("emailUsuario");
    localStorage.removeItem("bairroUsuario");

    window.alert("Você saiu da conta com sucesso.");
    window.location.href = "/login";
  }

  return (
    <main className={styles.container}>
      <section className={styles.cabecalho}>
        <h1>Configurações</h1>
        <p>Gerencie seu perfil e as preferências do aplicativo.</p>
      </section>

      <section className={styles.cartao}>
        <h2>Meu perfil</h2>

        <div className={styles.perfil}>
          <div className={styles.avatar}>{obterIniciais(nome)}</div>

          <div className={styles.perfilInfo}>
            <h3>{nome}</h3>
            <p>{email}</p>
            <p>📍 {bairro}</p>
          </div>
        </div>
      </section>

      <section className={styles.cartao}>
        <h2>Preferências</h2>

        <div className={styles.opcao}>
          <div className={styles.opcaoInfo}>
            <div className={styles.icone}>🔔</div>

            <div className={styles.opcaoTexto}>
              <h3>Notificações</h3>
              <p>Receber avisos sobre problemas do bairro.</p>
            </div>
          </div>

          <button
            type="button"
            className={`${styles.toggle} ${
              notificacoesAtivas ? "" : styles.desativado
            }`}
            role="switch"
            aria-checked={notificacoesAtivas}
            aria-label="Ativar ou desativar notificações"
            onClick={alternarNotificacoes}
          >
            <span />
          </button>
        </div>

        <p className={styles.texto}>
          Notificações {notificacoesAtivas ? "ativadas" : "desativadas"}.
        </p>
      </section>

      <section className={styles.cartao}>
        <h2>Informações</h2>

        <button
          type="button"
          className={styles.opcaoLink}
          onClick={() => setModalAberto("Privacidade")}
        >
          <span className={styles.opcaoInfo}>
            <span className={styles.icone}>🔒</span>

            <span className={styles.opcaoTexto}>
              <strong>Privacidade</strong>
              <span>Informações sobre seus dados.</span>
            </span>
          </span>

          <span className={styles.seta}>›</span>
        </button>

        <button
          type="button"
          className={styles.opcaoLink}
          onClick={() => setModalAberto("Ajuda")}
        >
          <span className={styles.opcaoInfo}>
            <span className={styles.icone}>❓</span>

            <span className={styles.opcaoTexto}>
              <strong>Ajuda</strong>
              <span>Veja respostas para dúvidas frequentes.</span>
            </span>
          </span>

          <span className={styles.seta}>›</span>
        </button>

        <button
          type="button"
          className={styles.opcaoLink}
          onClick={() => setModalAberto("Sobre o Meu Bairro")}
        >
          <span className={styles.opcaoInfo}>
            <span className={styles.icone}>ℹ️</span>

            <span className={styles.opcaoTexto}>
              <strong>Sobre o Meu Bairro</strong>
              <span>Conheça o projeto e seus objetivos.</span>
            </span>
          </span>

          <span className={styles.seta}>›</span>
        </button>
      </section>

      <button
        type="button"
        className={styles.sair}
        onClick={sairDaConta}
      >
        Sair da Conta
      </button>

      {modalAberto && (
        <div
          className={styles.modalFundo}
          onClick={(evento) => {
            if (evento.target === evento.currentTarget) {
              setModalAberto(null);
            }
          }}
        >
          <section
            className={styles.modal}
            role="dialog"
            aria-modal="true"
            aria-labelledby="titulo-modal"
          >
            <header className={styles.modalCabecalho}>
              <h2 id="titulo-modal">{modalAberto}</h2>

              <button
                type="button"
                className={styles.modalFechar}
                aria-label="Fechar janela"
                onClick={() => setModalAberto(null)}
              >
                ×
              </button>
            </header>

            <div className={styles.modalConteudo}>
              {conteudosModais[modalAberto].map((item) => (
                <div key={item.titulo}>
                  <h3>{item.titulo}</h3>
                  <p>{item.texto}</p>
                </div>
              ))}
            </div>

            <footer className={styles.modalRodape}>
              <button
                type="button"
                className={styles.modalBotaoFechar}
                onClick={() => setModalAberto(null)}
              >
                Fechar
              </button>
            </footer>
          </section>
        </div>
      )}
    </main>
  );
}