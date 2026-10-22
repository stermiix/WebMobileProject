// ==============================
// CONFIGURAÇÕES - JAVASCRIPT
// ==============================


// ==============================
// DADOS DO USUÁRIO
// ==============================

// Pega os dados salvos no login
const nomeUsuario =
    localStorage.getItem("nomeUsuario") || "João da Silva";

const emailUsuario =
    localStorage.getItem("emailUsuario") ||
    "joao.silva@email.com";

const bairroUsuario =
    localStorage.getItem("bairroUsuario") ||
    "Jardim São Paulo";


// Elementos do perfil
const avatar =
    document.querySelector(".avatar");

const nomePerfil =
    document.querySelector(".perfil-info h2");

const informacoesPerfil =
    document.querySelectorAll(".perfil-info p");


// ==============================
// ATUALIZA O PERFIL
// ==============================

// Mostra o nome informado no login
if (nomePerfil) {

    nomePerfil.innerText =
        nomeUsuario;

}


// Mostra o e-mail informado no login
if (informacoesPerfil.length > 0) {

    informacoesPerfil[0].innerText =
        emailUsuario;

}


// Mostra o bairro informado no login
if (informacoesPerfil.length > 1) {

    informacoesPerfil[1].innerText =
        "📍 " + bairroUsuario;

}


// ==============================
// INICIAIS DO USUÁRIO
// ==============================

function obterIniciais(nome) {

    const partesNome =
        nome.trim().split(" ");


    // Caso tenha apenas um nome
    if (partesNome.length === 1) {

        return partesNome[0]
            .substring(0, 2)
            .toUpperCase();

    }


    // Pega a primeira letra do primeiro nome
    // e a primeira letra do último nome
    const primeiraLetra =
        partesNome[0].charAt(0);


    const ultimaLetra =
        partesNome[partesNome.length - 1].charAt(0);


    return (
        primeiraLetra +
        ultimaLetra
    ).toUpperCase();

}


// Atualiza o avatar
if (avatar) {

    avatar.innerText =
        obterIniciais(nomeUsuario);

}



// ==============================
// TOGGLE DE NOTIFICAÇÕES
// ==============================

const toggleNotificacoes =
    document.querySelector(".toggle");


let notificacoesAtivas =
    localStorage.getItem("notificacoesAtivas");


// Caso não exista uma preferência salva,
// as notificações começam ativadas
if (notificacoesAtivas === null) {

    notificacoesAtivas =
        "true";

    localStorage.setItem(
        "notificacoesAtivas",
        notificacoesAtivas
    );

}


// Converte o texto salvo para verdadeiro ou falso
notificacoesAtivas =
    notificacoesAtivas === "true";


// Atualiza o visual do botão
function atualizarToggle() {

    if (notificacoesAtivas) {

        toggleNotificacoes.classList.remove(
            "desativado"
        );

    } else {

        toggleNotificacoes.classList.add(
            "desativado"
        );

    }

}


// Atualiza ao abrir a página
atualizarToggle();


// Clique no toggle
toggleNotificacoes.addEventListener(
    "click",
    function () {

        notificacoesAtivas =
            !notificacoesAtivas;


        localStorage.setItem(
            "notificacoesAtivas",
            notificacoesAtivas
        );


        atualizarToggle();

    }
);



// ==============================
// MODAL
// ==============================


// Cria uma função para abrir o modal
function abrirModal(
    tituloModal,
    conteudoModal
) {

    // Cria o fundo
    const fundoModal =
        document.createElement("div");


    fundoModal.classList.add(
        "modal-fundo"
    );


    // Cria a janela
    const modal =
        document.createElement("div");


    modal.classList.add(
        "modal"
    );


    // Monta o conteúdo
    modal.innerHTML = `

        <div class="modal-cabecalho">

            <h2>
                ${tituloModal}
            </h2>

            <button class="modal-fechar">
                ×
            </button>

        </div>


        <div class="modal-conteudo">

            ${conteudoModal}

        </div>


        <div class="modal-rodape">

            <button class="modal-botao-fechar">
                Fechar
            </button>

        </div>

    `;


    // Coloca o modal dentro do fundo
    fundoModal.appendChild(
        modal
    );


    // Coloca tudo na página
    document.body.appendChild(
        fundoModal
    );


    // Botão X
    const botaoFechar =
        modal.querySelector(
            ".modal-fechar"
        );


    // Botão Fechar
    const botaoFecharRodape =
        modal.querySelector(
            ".modal-botao-fechar"
        );


    // Função para fechar o modal
    function fecharModal() {

        fundoModal.remove();

    }


    // Eventos dos botões
    botaoFechar.addEventListener(
        "click",
        fecharModal
    );


    botaoFecharRodape.addEventListener(
        "click",
        fecharModal
    );


    // Fecha ao clicar fora da janela
    fundoModal.addEventListener(
        "click",
        function (evento) {

            if (
                evento.target === fundoModal
            ) {

                fecharModal();

            }

        }
    );

}



// ==============================
// PRIVACIDADE
// ==============================

const linksInformacoes =
    document.querySelectorAll(
        ".opcao-link"
    );


linksInformacoes.forEach(
    function (link) {

        const titulo =
            link.querySelector("h3");


        if (
            titulo &&
            titulo.innerText === "Privacidade"
        ) {

            link.addEventListener(
                "click",
                function (evento) {

                    evento.preventDefault();


                    abrirModal(
                        "Privacidade",

                        `
                        <h3>
                            Como utilizamos seus dados
                        </h3>

                        <p>
                            O Meu Bairro utiliza as informações
                            fornecidas pelo usuário para registrar
                            e acompanhar problemas identificados
                            na comunidade.
                        </p>


                        <h3>
                            Dados apresentados
                        </h3>

                        <p>
                            Informações como nome, localização,
                            descrição e categoria do problema podem
                            ser utilizadas no funcionamento do
                            protótipo.
                        </p>


                        <h3>
                            Objetivo
                        </h3>

                        <p>
                            Os dados têm como finalidade demonstrar
                            o funcionamento do aplicativo e facilitar
                            o acompanhamento de problemas do bairro.
                        </p>
                        `
                    );

                }
            );

        }

    }
);



// ==============================
// AJUDA
// ==============================

const linksAjuda =
    document.querySelectorAll(
        ".opcao-link"
    );


linksAjuda.forEach(
    function (link) {

        const titulo =
            link.querySelector("h3");


        if (
            titulo &&
            titulo.innerText === "Ajuda"
        ) {

            link.addEventListener(
                "click",
                function (evento) {

                    evento.preventDefault();


                    abrirModal(
                        "Ajuda",

                        `
                        <h3>
                            Como registrar um problema?
                        </h3>

                        <p>
                            Acesse a opção "Registrar" no menu,
                            escolha a categoria do problema,
                            informe a localização, adicione uma
                            descrição e publique o registro.
                        </p>


                        <h3>
                            Como acompanhar um problema?
                        </h3>

                        <p>
                            Os problemas registrados podem ser
                            visualizados na área de notificações
                            e também no mapa do bairro.
                        </p>


                        <h3>
                            Como funcionam as notificações?
                        </h3>

                        <p>
                            As notificações apresentam avisos sobre
                            problemas registrados no bairro. Elas
                            podem ser ativadas ou desativadas nas
                            configurações do aplicativo.
                        </p>


                        <h3>
                            Posso informar a localização
                            do problema?
                        </h3>

                        <p>
                            Sim. Durante o registro de um problema,
                            é possível informar o endereço
                            relacionado à ocorrência.
                        </p>
                        `
                    );

                }
            );

        }

    }
);



// ==============================
// SOBRE O MEU BAIRRO
// ==============================

const linksSobre =
    document.querySelectorAll(
        ".opcao-link"
    );


linksSobre.forEach(
    function (link) {

        const titulo =
            link.querySelector("h3");


        if (
            titulo &&
            titulo.innerText ===
            "Sobre o Meu Bairro"
        ) {

            link.addEventListener(
                "click",
                function (evento) {

                    evento.preventDefault();


                    abrirModal(
                        "Sobre o Meu Bairro",

                        `
                        <h3>
                            Objetivo do projeto
                        </h3>

                        <p>
                            O Meu Bairro é um protótipo acadêmico
                            desenvolvido para demonstrar uma solução
                            de participação da comunidade na
                            identificação e acompanhamento de
                            problemas do bairro.
                        </p>


                        <h3>
                            Principais funcionalidades
                        </h3>

                        <p>
                            O projeto permite registrar problemas,
                            visualizar ocorrências no mapa, consultar
                            notificações, visualizar detalhes e
                            acompanhar a situação dos problemas
                            registrados.
                        </p>


                        <h3>
                            ODS 11
                        </h3>

                        <p>
                            O projeto está relacionado à ODS 11 —
                            Cidades e Comunidades Sustentáveis,
                            buscando incentivar a participação da
                            comunidade na identificação de problemas
                            urbanos.
                        </p>


                        <h3>
                            Tecnologias utilizadas
                        </h3>

                        <p>
                            O protótipo foi desenvolvido utilizando
                            HTML5, CSS3 e JavaScript.
                        </p>
                        `
                    );

                }
            );

        }

    }
);



// ==============================
// SAIR DA CONTA
// ==============================

const botaoSair =
    document.querySelector(".sair");


botaoSair.addEventListener(
    "click",
    function () {

        // Confirma a saída
        const confirmarSaida =
            confirm(
                "Deseja realmente sair da sua conta?"
            );


        // Caso o usuário confirme
        if (confirmarSaida) {

            // Encerra a sessão
            localStorage.removeItem(
                "usuarioLogado"
            );


            // Remove o nome
            localStorage.removeItem(
                "nomeUsuario"
            );


            // Remove o e-mail
            localStorage.removeItem(
                "emailUsuario"
            );


            // Remove o bairro
            localStorage.removeItem(
                "bairroUsuario"
            );


            // Mensagem de confirmação
            alert(
                "Você saiu da conta com sucesso."
            );


            // Volta para o login
            window.location.href =
                "login.html";

        }

    }
);
