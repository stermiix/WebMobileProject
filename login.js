// ==============================
// LOGIN - JAVASCRIPT
// ==============================


// Formulário
const formularioLogin =
    document.querySelector("#form-login");


// Campo nome
const campoNome =
    document.querySelector("#nome");


// Campo e-mail
const campoEmail =
    document.querySelector("#email");


// Campo bairro
const campoBairro =
    document.querySelector("#bairro");


// Mensagem
const mensagemLogin =
    document.querySelector("#mensagem-login");



// ==============================
// ENTRAR
// ==============================

formularioLogin.addEventListener(
    "submit",
    function (evento) {

        evento.preventDefault();


        const nome =
            campoNome.value.trim();


        const email =
            campoEmail.value.trim();


        const bairro =
            campoBairro.value.trim();



        // ==========================
        // VALIDAÇÃO
        // ==========================

        if (nome === "") {

            mensagemLogin.innerText =
                "Digite seu nome.";

            campoNome.focus();

            return;

        }


        if (email === "") {

            mensagemLogin.innerText =
                "Digite seu e-mail.";

            campoEmail.focus();

            return;

        }


        if (bairro === "") {

            mensagemLogin.innerText =
                "Digite seu bairro.";

            campoBairro.focus();

            return;

        }



        // ==========================
        // SALVA A SESSÃO
        // ==========================

        localStorage.setItem(
            "usuarioLogado",
            "true"
        );



        // ==========================
        // SALVA OS DADOS DO USUÁRIO
        // ==========================

        // Salva o nome
        localStorage.setItem(
            "nomeUsuario",
            nome
        );


        // Salva o e-mail
        localStorage.setItem(
            "emailUsuario",
            email
        );


        // Salva o bairro
        localStorage.setItem(
            "bairroUsuario",
            bairro
        );



        // ==========================
        // ENTRA NO APLICATIVO
        // ==========================

        window.location.href =
            "index.html";

    }
);
