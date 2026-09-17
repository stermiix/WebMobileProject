// ========================================
// NOTIFICAÇÕES
// ========================================


// Problemas excluídos pelo usuário

let problemasExcluidos =
    JSON.parse(localStorage.getItem("problemasExcluidos")) || [];


// Problemas marcados como resolvidos

let problemasResolvidos =
    JSON.parse(localStorage.getItem("problemasResolvidos")) || [];


// Pega os problemas criados pelo usuário,
// já removendo os que foram excluídos

let problemasSalvos =
    (JSON.parse(localStorage.getItem("problemas")) || [])
        .filter(function(problema) {

            return !problemasExcluidos.includes(problema.id);

        });


// Elementos da página

const listaProblemas =
    document.querySelector(".problems-list");

const badge =
    document.querySelector(".new-badge");

const footerInfo =
    document.querySelector(".footer-info");


// ========================================
// FUNÇÃO - ÍCONE
// ========================================

function obterIcone(categoria) {

    if (categoria === "Lixo acumulado") {
        return "🗑️";
    }

    if (categoria === "Iluminação") {
        return "💡";
    }

    if (categoria === "Buraco na rua") {
        return "🕳️";
    }

    if (categoria === "Calçada danificada") {
        return "🚧";
    }

    if (categoria === "Vazamento") {
        return "💧";
    }

    return "⚠️";
}


// ========================================
// FUNÇÃO - CLASSE DO ÍCONE
// ========================================

function obterClasseIcone(categoria) {

    if (categoria === "Lixo acumulado") {
        return "red";
    }

    if (categoria === "Iluminação") {
        return "yellow";
    }

    if (categoria === "Buraco na rua") {
        return "orange";
    }

    if (categoria === "Calçada danificada") {
        return "purple";
    }

    if (categoria === "Vazamento") {
        return "blue";
    }

    return "orange";
}


// ========================================
// FUNÇÃO - NOME DA CATEGORIA
// ========================================

function obterNomeCategoria(categoria) {

    if (categoria === "Lixo acumulado") {
        return "Limpeza";
    }

    if (categoria === "Iluminação") {
        return "Iluminação";
    }

    if (categoria === "Buraco na rua") {
        return "Vias públicas";
    }

    if (categoria === "Calçada danificada") {
        return "Acessibilidade";
    }

    if (categoria === "Vazamento") {
        return "Saneamento";
    }

    return "Outros";
}


// ========================================
// PROBLEMAS FIXOS
// ========================================

// Pega os 5 problemas que já estão no HTML

const problemasFixos =
    document.querySelectorAll(".problem-link");


// Cada problema antigo recebe seu ID fixo
// (ou é removido do DOM, se tiver sido excluído)

problemasFixos.forEach(function(link, index) {

    const idProblema =
        index + 1;


    if (problemasExcluidos.includes(idProblema)) {

        link.remove();

        return;

    }


    link.href =
        "detalhes.html?problemaId=" +
        idProblema;


    // Grava o ID diretamente no card,
    // para que ele possa ser lido depois
    // sem depender da posição no DOM

    link.querySelector(".problem").dataset.id =
        idProblema;

});


// ========================================
// FUNÇÃO PARA DESCOBRIR O ID
// ========================================

// Como cada card agora guarda seu próprio
// ID em um atributo data-id, tanto os
// problemas fixos quanto os criados pelo
// usuário podem ser identificados da
// mesma forma, sem depender da posição
// dele na lista.

function obterIdProblema(problema) {

    const id =
        problema.dataset.id;


    if (id === undefined) {

        return null;

    }


    return Number(id);

}


// ========================================
// CRIA NOTIFICAÇÃO NOVA
// ========================================

function criarNotificacao(problema) {

    const link =
        document.createElement("a");


    link.classList.add(
        "problem-link"
    );


    // Usa o ID REAL do problema

    link.href =
        "detalhes.html?problemaId=" +
        problema.id;


    const artigo =
        document.createElement("article");


    artigo.classList.add(
        "problem",
        "unread"
    );


    // Grava o ID no card

    artigo.dataset.id =
        problema.id;


    // ====================================
    // ÍCONE
    // ====================================

    const icone =
        document.createElement("div");


    icone.classList.add(
        "problem-icon",
        obterClasseIcone(
            problema.categoria
        )
    );


    icone.innerText =
        obterIcone(
            problema.categoria
        );


    // ====================================
    // CONTEÚDO
    // ====================================

    const conteudo =
        document.createElement("div");


    conteudo.classList.add(
        "problem-content"
    );


    // ====================================
    // TÍTULO
    // ====================================

    const titulo =
        document.createElement("h3");


    titulo.innerText =
        problema.titulo;


    // ====================================
    // CATEGORIA
    // ====================================

    const categoria =
        document.createElement("span");


    categoria.classList.add(
        "category"
    );


    categoria.innerText =
        obterNomeCategoria(
            problema.categoria
        );


    // ====================================
    // PONTO DE NOTIFICAÇÃO
    // ====================================

    const ponto =
        document.createElement("span");


    ponto.classList.add(
        "notification-dot"
    );


    titulo.appendChild(
        categoria
    );


    titulo.appendChild(
        ponto
    );


    // ====================================
    // INFORMAÇÕES
    // ====================================

    const informacoes =
        document.createElement("div");


    informacoes.classList.add(
        "problem-info"
    );


    const morador =
        document.createElement("span");


    morador.innerText =
        "👤 " +
        problema.morador;


    const endereco =
        document.createElement("span");


    endereco.innerText =
        "📍 " +
        problema.endereco;


    informacoes.appendChild(
        morador
    );


    informacoes.appendChild(
        endereco
    );


    // ====================================
    // DESCRIÇÃO
    // ====================================

    const descricao =
        document.createElement("p");


    descricao.classList.add(
        "description"
    );


    descricao.innerText =
        problema.descricao;


    // ====================================
    // STATUS
    // ====================================

    const status =
        document.createElement("span");


    status.classList.add(
        "status",
        "new"
    );


    status.innerText =
        "Novo";


    // ====================================
    // MONTA O CONTEÚDO
    // ====================================

    conteudo.appendChild(
        titulo
    );


    conteudo.appendChild(
        informacoes
    );


    conteudo.appendChild(
        descricao
    );


    conteudo.appendChild(
        status
    );


    // ====================================
    // DATA
    // ====================================

    const data =
        document.createElement("div");


    data.classList.add(
        "problem-date"
    );


    data.innerText =
        "📅 " +
        problema.data;


    // ====================================
    // MONTA O PROBLEMA
    // ====================================

    artigo.appendChild(
        icone
    );


    artigo.appendChild(
        conteudo
    );


    artigo.appendChild(
        data
    );


    link.appendChild(
        artigo
    );


    // ====================================
    // ADICIONA NA LISTA
    // ====================================

    listaProblemas.appendChild(
        link
    );

}


// ========================================
// ADICIONA OS NOVOS PROBLEMAS
// ========================================

problemasSalvos.forEach(
    function(problema) {

        criarNotificacao(
            problema
        );

    }
);


// ========================================
// TODOS OS PROBLEMAS
// ========================================

const problemas =
    document.querySelectorAll(
        ".problem"
    );


// Pega os problemas que já foram vistos

let problemasVisualizados =
    JSON.parse(
        localStorage.getItem(
            "problemasVisualizados"
        )
    ) || [];


// ========================================
// VERIFICA OS VISUALIZADOS
// ========================================

problemas.forEach(
    function(problema) {

        const idProblema =
            obterIdProblema(
                problema
            );


        // Se o problema já foi visualizado,
        // remove o estado "Novo".

        if (
            idProblema !== null &&
            problemasVisualizados.includes(
                idProblema
            )
        ) {

            marcarComoVisualizado(
                problema
            );

        }

    }
);


// ========================================
// VERIFICA OS RESOLVIDOS
// ========================================

// Se o problema já foi marcado como
// resolvido na tela de detalhes, o
// badge aqui deve refletir isso.

problemas.forEach(
    function(problema) {

        const idProblema =
            obterIdProblema(
                problema
            );


        if (
            idProblema !== null &&
            problemasResolvidos.includes(
                idProblema
            )
        ) {

            marcarComoResolvido(
                problema
            );

        }

    }
);


// ========================================
// MARCAR COMO RESOLVIDO
// ========================================

function marcarComoResolvido(
    problema
) {

    const status =
        problema.querySelector(
            ".status"
        );


    if (status) {

        status.innerText =
            "Resolvido";


        status.classList.remove(
            "new"
        );


        status.classList.add(
            "resolved"
        );

    }

}


// ========================================
// CLIQUE NAS NOTIFICAÇÕES
// ========================================

problemas.forEach(
    function(problema) {

        problema.addEventListener(
            "click",
            function() {

                const idProblema =
                    obterIdProblema(
                        problema
                    );


                // Se não encontrou o ID,
                // não continua.

                if (idProblema === null) {

                    return;

                }


                // =================================
                // MARCA COMO VISUALIZADO
                // =================================

                marcarComoVisualizado(
                    problema
                );


                // =================================
                // PEGA LISTA ATUALIZADA
                // =================================

                let visualizados =
                    JSON.parse(
                        localStorage.getItem(
                            "problemasVisualizados"
                        )
                    ) || [];


                // =================================
                // ADICIONA O ID
                // =================================

                if (
                    !visualizados.includes(
                        idProblema
                    )
                ) {

                    visualizados.push(
                        idProblema
                    );

                }


                // =================================
                // SALVA NO LOCALSTORAGE
                // =================================

                localStorage.setItem(
                    "problemasVisualizados",
                    JSON.stringify(
                        visualizados
                    )
                );


                // =================================
                // ATUALIZA CONTADOR
                // =================================

                atualizarContador();

            }
        );

    }
);


// ========================================
// MARCAR COMO VISUALIZADO
// ========================================

function marcarComoVisualizado(
    problema
) {

    problema.classList.remove(
        "unread"
    );


    const ponto =
        problema.querySelector(
            ".notification-dot"
        );


    if (ponto) {

        ponto.remove();

    }


    const status =
        problema.querySelector(
            ".status"
        );


    // Se já está resolvido, não sobrescreve
    // o badge com "Visualizado".

    if (
        status &&
        !status.classList.contains("resolved")
    ) {

        status.innerText =
            "Visualizado";


        status.classList.remove(
            "new"
        );

    }

}


// ========================================
// ATUALIZA CONTADOR
// ========================================

function atualizarContador() {

    const quantidade =
        document.querySelectorAll(
            ".problem.unread"
        ).length;


    if (quantidade > 0) {

        badge.innerText =
            quantidade +
            " novos";


        badge.style.display =
            "inline-block";


        badge.style.background =
            "#16a34a";

    } else {

        badge.innerText =
            "Nenhum novo";


        badge.style.background =
            "#9ca3af";

    }


    // ====================================
    // TEXTO FINAL
    // ====================================

    if (footerInfo) {

        footerInfo.innerText =
            "Exibindo os " +
            problemas.length +
            " problemas registrados pela comunidade.";

    }

}


// ========================================
// ATUALIZA AO ABRIR
// ========================================

atualizarContador();


// ========================================
// BUSCA E FILTRO POR CATEGORIA
// ========================================

const campoBusca =
    document.querySelector("#busca-input");


const seletorCategoria =
    document.querySelector("#filtro-categoria");


function filtrarProblemas() {

    const termoBusca =
        campoBusca.value.trim().toLowerCase();


    const categoriaEscolhida =
        seletorCategoria.value;


    const cards =
        document.querySelectorAll(".problem-link");


    let visiveis = 0;


    cards.forEach(function(card) {

        const titulo =
            card.querySelector("h3").innerText.toLowerCase();


        const categoria =
            card.querySelector(".category").innerText.trim();


        const endereco =
            card.querySelector(".problem-info").innerText.toLowerCase();


        const descricao =
            card.querySelector(".description").innerText.toLowerCase();


        const combinaBusca =
            titulo.includes(termoBusca) ||
            endereco.includes(termoBusca) ||
            descricao.includes(termoBusca);


        const combinaCategoria =
            categoriaEscolhida === "todas" ||
            categoria === categoriaEscolhida;


        if (combinaBusca && combinaCategoria) {

            card.style.display = "block";

            visiveis++;

        } else {

            card.style.display = "none";

        }

    });


    // ====================================
    // ATUALIZA O TEXTO DE RODAPÉ
    // ====================================

    if (footerInfo) {

        footerInfo.innerText =
            "Exibindo " +
            visiveis +
            " de " +
            cards.length +
            " problemas registrados.";

    }

}


if (campoBusca) {

    campoBusca.addEventListener(
        "input",
        filtrarProblemas
    );

}


if (seletorCategoria) {

    seletorCategoria.addEventListener(
        "change",
        filtrarProblemas
    );

}
