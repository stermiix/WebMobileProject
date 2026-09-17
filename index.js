// ========================================
// MAPA DO BAIRRO
// ========================================


// Pega o mapa

const mapa =
    document.querySelector(".mapa");


// Problemas excluídos pelo usuário

let problemasExcluidos =
    JSON.parse(
        localStorage.getItem("problemasExcluidos")
    ) || [];


// ========================================
// MARCADORES FIXOS
// ========================================


// Pega os cinco marcadores que já existem
// no HTML

const marcadores =
    document.querySelectorAll(
        ".mapa > a"
    );


// Cada marcador fixo recebe seu
// respectivo problema
// (ou é removido, se tiver sido excluído)

marcadores.forEach(
    function(marcador, index) {

        const idProblema =
            index + 1;


        if (problemasExcluidos.includes(idProblema)) {

            marcador.remove();

            return;

        }


        marcador.href =
            "detalhes.html?problemaId=" +
            idProblema +
            "&origem=mapa";


        console.log(
            "Marcador fixo configurado:",
            idProblema
        );

    }
);


// ========================================
// PROBLEMAS NOVOS
// ========================================


// Recupera os problemas cadastrados
// pelo usuário, já removendo os
// que foram excluídos

let problemasSalvos =
    (JSON.parse(
        localStorage.getItem("problemas")
    ) || []).filter(
        function(problema) {

            return !problemasExcluidos.includes(
                problema.id
            );

        }
    );


// ========================================
// POSIÇÕES DOS NOVOS MARCADORES
// ========================================


// Como o mapa é uma ilustração,
// vamos colocar os novos problemas
// em diferentes quadras.

const posicoesNovosMarcadores = [

    {
        left: "350px",
        top: "80px"
    },

    {
        left: "595px",
        top: "250px"
    },

    {
        left: "835px",
        top: "80px"
    },

    {
        left: "110px",
        top: "250px"
    },

    {
        left: "595px",
        top: "430px"
    },

    {
        left: "835px",
        top: "430px"
    },

    {
        left: "110px",
        top: "430px"
    }

];


// ========================================
// FUNÇÃO - ÍCONE
// ========================================

function obterIcone(categoria) {

    if (
        categoria === "Lixo acumulado"
    ) {

        return "🗑️";

    }


    if (
        categoria === "Iluminação"
    ) {

        return "💡";

    }


    if (
        categoria === "Buraco na rua"
    ) {

        return "🕳️";

    }


    if (
        categoria === "Calçada danificada"
    ) {

        return "🚧";

    }


    if (
        categoria === "Vazamento"
    ) {

        return "💧";

    }


    return "⚠️";

}


// ========================================
// FUNÇÃO - CLASSE DO MARCADOR
// ========================================

function obterClasseMarcador(categoria) {

    if (
        categoria === "Lixo acumulado"
    ) {

        return "limpeza";

    }


    if (
        categoria === "Iluminação"
    ) {

        return "iluminacao";

    }


    if (
        categoria === "Buraco na rua"
    ) {

        return "vias";

    }


    if (
        categoria === "Calçada danificada"
    ) {

        return "acessibilidade";

    }


    if (
        categoria === "Vazamento"
    ) {

        return "saneamento";

    }


    return "vias";

}


// ========================================
// CRIA MARCADOR DE PROBLEMA NOVO
// ========================================

function criarMarcadorNovo(
    problema,
    index
) {


    // Cria o link

    const link =
        document.createElement("a");


    // Link para os detalhes
    // usando o ID real do problema
    // e informando que veio do mapa

    link.href =
        "detalhes.html?problemaId=" +
        problema.id +
        "&origem=mapa";


    // Título ao passar o mouse

    link.title =
        problema.titulo +
        " - " +
        problema.endereco;


    // Cria o marcador

    const marcador =
        document.createElement("div");


    marcador.classList.add(
        "marcador"
    );


    // Adiciona a cor correspondente

    marcador.classList.add(
        obterClasseMarcador(
            problema.categoria
        )
    );


    // Define o ícone

    marcador.innerText =
        obterIcone(
            problema.categoria
        );


    // ====================================
    // POSIÇÃO
    // ====================================

    const posicao =
        posicoesNovosMarcadores[
            index % posicoesNovosMarcadores.length
        ];


    marcador.style.left =
        posicao.left;


    marcador.style.top =
        posicao.top;


    // ====================================
    // ADICIONA AO MAPA
    // ====================================

    link.appendChild(
        marcador
    );


    mapa.appendChild(
        link
    );


    console.log(
        "Novo marcador criado:",
        problema.titulo,
        problema.endereco
    );

}


// ========================================
// ADICIONA OS PROBLEMAS NOVOS AO MAPA
// ========================================

problemasSalvos.forEach(
    function(problema, index) {

        criarMarcadorNovo(
            problema,
            index
        );

    }
);


// ========================================
// ATUALIZA O AVISO DO MAPA
// ========================================


// Quantos dos 5 problemas fixos
// foram excluídos

const fixosExcluidos =
    problemasExcluidos.filter(
        function(id) {

            return id >= 1 && id <= 5;

        }
    ).length;


// Total de problemas

const totalProblemas =
    (5 - fixosExcluidos) +
    problemasSalvos.length;


// Pega o aviso

const mapaInfo =
    document.querySelector(".mapa-info");


if (mapaInfo) {

    mapaInfo.innerText =
        "📍 Existem " +
        totalProblemas +
        " problemas registrados atualmente no bairro. " +
        "Clique em um marcador para visualizar os detalhes do problema.";

}


// ========================================
// INFORMAÇÃO NO CONSOLE
// ========================================

console.log(
    "Total de problemas no mapa:",
    totalProblemas
);


// ========================================
// FILTRO POR CATEGORIA
// ========================================

const seletorCategoriaMapa =
    document.querySelector(
        "#filtro-categoria-mapa"
    );


function filtrarMarcadores() {

    const categoriaEscolhida =
        seletorCategoriaMapa.value;


    // Pega todos os marcadores atuais
    // (fixos e novos, já que os novos
    // também são links dentro do mapa)

    const todosMarcadores =
        document.querySelectorAll(
            ".mapa > a"
        );


    todosMarcadores.forEach(
        function(link) {

            const marcador =
                link.querySelector(
                    ".marcador"
                );


            const combina =
                categoriaEscolhida === "todas" ||
                marcador.classList.contains(
                    categoriaEscolhida
                );


            link.style.display =
                combina ? "" : "none";

        }
    );

}


if (seletorCategoriaMapa) {

    seletorCategoriaMapa.addEventListener(
        "change",
        filtrarMarcadores
    );

}
