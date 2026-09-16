const categorias = document.querySelectorAll(".category-option");

let categoriaSelecionada = null;

categorias.forEach(function(categoria) {

    categoria.addEventListener("click", function() {

        categorias.forEach(function(item) {
            item.classList.remove("selected");
        });

        categoria.classList.add("selected");

        categoriaSelecionada =
            categoria.querySelector(".category-name").innerText;

        console.log(
            "Categoria selecionada:",
            categoriaSelecionada
        );

    });

});



const descricao = document.querySelector("#descricao");
const contador = document.querySelector(".description-footer span");

descricao.addEventListener("input", function() {

    let quantidadeCaracteres = descricao.value.length;

    contador.innerText =
        quantidadeCaracteres + "/300 caracteres";

});



const botaoLocalizacao = document.querySelector(".location-button");
const campoLocalizacao = document.querySelector("#localizacao");

botaoLocalizacao.addEventListener("click", function() {

    campoLocalizacao.value = "Rua das Flores, 125";

    console.log(
        "Localização preenchida:",
        campoLocalizacao.value
    );

});



const areaFoto = document.querySelector(".photo-upload");
const campoFoto = document.querySelector("#foto");

let fotoSelecionada = null;

areaFoto.addEventListener("click", function() {

    campoFoto.click();

});



campoFoto.addEventListener("change", function() {

    let arquivo = campoFoto.files[0];

    if (arquivo) {

        let leitor = new FileReader();

        leitor.addEventListener("load", function() {

            fotoSelecionada = leitor.result;

            areaFoto.innerHTML = "";

            let imagem = document.createElement("img");

            imagem.src = leitor.result;

            imagem.classList.add("photo-preview");

            areaFoto.appendChild(imagem);

        });

        leitor.readAsDataURL(arquivo);

        console.log(
            "Foto selecionada:",
            arquivo.name
        );

    }

});



const formulario = document.querySelector(".form-card");

formulario.addEventListener("submit", function(event) {

    event.preventDefault();


    if (categoriaSelecionada === null) {

        alert(
            "Selecione uma categoria para continuar."
        );

        return;
    }


    if (campoLocalizacao.value.trim() === "") {

        alert(
            "Informe a localização do problema."
        );

        campoLocalizacao.focus();

        return;
    }


    if (descricao.value.trim() === "") {

        alert(
            "Informe uma descrição do problema."
        );

        descricao.focus();

        return;
    }



    /* =========================
       DATA E HORA
    ========================== */

    const agora = new Date();

    let dia = String(agora.getDate()).padStart(2, "0");

    let mes = String(
        agora.getMonth() + 1
    ).padStart(2, "0");

    let ano = agora.getFullYear();

    let hora = String(
        agora.getHours()
    ).padStart(2, "0");

    let minutos = String(
        agora.getMinutes()
    ).padStart(2, "0");


    let dataAtual =
        dia + "/" + mes + "/" + ano;

    let horarioAtual =
        hora + ":" + minutos;



    /* =========================
       NOVO PROBLEMA
    ========================== */

    const novoProblema = {

        id: Date.now(),

        titulo: categoriaSelecionada,

        categoria: categoriaSelecionada,

        endereco: campoLocalizacao.value.trim(),

        data: dataAtual,

        horario: horarioAtual,

        morador: "João da Silva",

        descricao: descricao.value.trim(),

        foto: fotoSelecionada

    };



    /* =========================
       SALVAR PROBLEMA
    ========================== */

    let problemasSalvos =
        JSON.parse(
            localStorage.getItem("problemas")
        ) || [];


    problemasSalvos.push(novoProblema);


    localStorage.setItem(
        "problemas",
        JSON.stringify(problemasSalvos)
    );



    console.log(
        "Novo problema salvo:",
        novoProblema
    );

    console.log(
        "Problemas salvos:",
        problemasSalvos
    );



    /* =========================
       MENSAGEM DE SUCESSO
    ========================== */

    const mensagem =
        document.createElement("div");

    mensagem.classList.add(
        "mensagem-sucesso"
    );

    mensagem.innerHTML = `
        <div class="sucesso-icon">✓</div>

        <h2>
            Problema publicado com sucesso!
        </h2>

        <p>
            Obrigado por ajudar a melhorar a comunidade.
        </p>

        <a href="index.html">
            Voltar para o mapa
        </a>
    `;


    formulario.innerHTML = "";

    formulario.appendChild(mensagem);

});
