// ========================================
// PROBLEMAS FIXOS DO SISTEMA
// ========================================

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
            "Foi identificado um grande acúmulo de lixo próximo à calçada. O local está com bastante sujeira e precisa de limpeza para evitar problemas para os moradores da região."
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
            "O poste de iluminação está sem funcionar durante a noite, deixando a região com pouca iluminação."
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
            "Existe um buraco grande na rua que pode causar acidentes para motoristas, motociclistas e pedestres."
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
            "A calçada apresenta partes quebradas e dificulta a passagem dos pedestres."
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
        descricao:
            "Foi identificado um vazamento próximo à calçada."
    }

};


// ========================================
// PROBLEMAS RESOLVIDOS
// ========================================

// Guarda os IDs dos problemas que a
// comunidade já marcou como resolvidos.

let problemasResolvidos =
    JSON.parse(
        localStorage.getItem("problemasResolvidos")
    ) || [];


// ========================================
// IDENTIFICA O PROBLEMA SELECIONADO
// ========================================

const parametros =
    new URLSearchParams(
        window.location.search
    );


const problemaId =
    parametros.get("problemaId");


// ========================================
// IDENTIFICA A ORIGEM
// ========================================

// Verifica de onde o usuário veio:
//
// mapa
// notificacoes

const origem =
    parametros.get("origem");


// ========================================
// CONFIGURA O BOTÃO VOLTAR
// ========================================

const botaoVoltar =
    document.querySelector(".voltar");


if (botaoVoltar) {

    if (origem === "mapa") {

        botaoVoltar.href =
            "index.html";


        botaoVoltar.innerText =
            "← Voltar para o mapa";


    } else {

        botaoVoltar.href =
            "notificacoes.html";


        botaoVoltar.innerText =
            "← Voltar para notificações";

    }

}


// ========================================
// PROCURA O PROBLEMA
// ========================================

let problemaSelecionado = null;


// Primeiro verifica se é um problema novo

const problemasSalvos =
    JSON.parse(
        localStorage.getItem("problemas")
    ) || [];


if (problemaId) {

    problemaSelecionado =
        problemasSalvos.find(
            function(problema) {

                return String(problema.id) ===
                       String(problemaId);

            }
        );


    // Se não encontrou nos novos,
    // procura nos problemas fixos

    if (!problemaSelecionado) {

        problemaSelecionado =
            problemasFixos[problemaId];

    }

}


// ========================================
// PROBLEMA PADRÃO
// ========================================

// Se nenhum problema foi encontrado,
// abre o primeiro problema como padrão

if (!problemaSelecionado) {

    problemaSelecionado =
        problemasFixos[1];

}


// ========================================
// ELEMENTOS DA TELA
// ========================================

const tituloProblema =
    document.querySelector(
        ".titulo-problema"
    );


const categoria =
    document.querySelector(
        ".foto-problema .categoria"
    );


const fotoProblema =
    document.querySelector(
        ".foto-problema"
    );


const informacoes =
    document.querySelectorAll(
        ".info span"
    );


const descricao =
    document.querySelector(
        ".descricao p"
    );


// ========================================
// FUNÇÕES DE CATEGORIA
// ========================================

function obterCategoria(
    categoriaProblema
) {

    if (
        categoriaProblema ===
        "Lixo acumulado"
    ) {

        return "Limpeza";

    }


    if (
        categoriaProblema ===
        "Iluminação"
    ) {

        return "Iluminação";

    }


    if (
        categoriaProblema ===
        "Buraco na rua"
    ) {

        return "Vias públicas";

    }


    if (
        categoriaProblema ===
        "Calçada danificada"
    ) {

        return "Acessibilidade";

    }


    if (
        categoriaProblema ===
        "Vazamento"
    ) {

        return "Saneamento";

    }


    return "Outros";

}


// ========================================
// ÍCONES
// ========================================

function obterIcone(
    categoriaProblema
) {

    if (
        categoriaProblema ===
        "Lixo acumulado"
    ) {

        return "🗑️";

    }


    if (
        categoriaProblema ===
        "Iluminação"
    ) {

        return "💡";

    }


    if (
        categoriaProblema ===
        "Buraco na rua"
    ) {

        return "🕳️";

    }


    if (
        categoriaProblema ===
        "Calçada danificada"
    ) {

        return "🚧";

    }


    if (
        categoriaProblema ===
        "Vazamento"
    ) {

        return "💧";

    }


    return "⚠️";

}


// ========================================
// PREENCHE O TÍTULO
// ========================================

tituloProblema.innerText =
    problemaSelecionado.titulo;


// ========================================
// PREENCHE CATEGORIA E ÍCONE
// ========================================

const categoriaTexto =
    problemaSelecionado.categoria ||
    obterCategoria(
        problemaSelecionado.titulo
    );


const icone =
    obterIcone(
        problemaSelecionado.titulo
    );


fotoProblema.innerHTML = "";


// ========================================
// CATEGORIA
// ========================================

const novaCategoria =
    document.createElement(
        "span"
    );


novaCategoria.classList.add(
    "categoria"
);


novaCategoria.innerText =
    icone +
    " " +
    categoriaTexto;


// Adiciona a categoria

fotoProblema.appendChild(
    novaCategoria
);


// ========================================
// MOSTRA FOTO DO PROBLEMA
// ========================================

if (problemaSelecionado.foto) {

    const imagem =
        document.createElement(
            "img"
        );


    imagem.src =
        problemaSelecionado.foto;


    imagem.alt =
        "Foto do problema";


    imagem.style.width =
        "100%";


    imagem.style.height =
        "100%";


    imagem.style.objectFit =
        "cover";


    imagem.style.borderRadius =
        "12px";


    fotoProblema.appendChild(
        imagem
    );


} else {

    const iconeGrande =
        document.createElement(
            "div"
        );


    iconeGrande.innerText =
        icone;


    iconeGrande.style.fontSize =
        "70px";


    iconeGrande.style.textAlign =
        "center";


    iconeGrande.style.marginTop =
        "40px";


    fotoProblema.appendChild(
        iconeGrande
    );

}


// ========================================
// PREENCHE AS INFORMAÇÕES
// ========================================

if (informacoes.length >= 4) {

    informacoes[0].innerText =
        problemaSelecionado.endereco;


    informacoes[1].innerText =
        problemaSelecionado.data;


    informacoes[2].innerText =
        problemaSelecionado.horario;


    informacoes[3].innerText =
        problemaSelecionado.morador;

}


// ========================================
// PREENCHE A DESCRIÇÃO
// ========================================

descricao.innerText =
    problemaSelecionado.descricao;


// ========================================
// MOSTRA NO CONSOLE
// ========================================

console.log(
    "Problema exibido:",
    problemaSelecionado
);


console.log(
    "Origem:",
    origem || "notificacoes"
);


// ========================================
// SISTEMA DE VOTAÇÃO
// ========================================

const botoesVoto =
    document.querySelectorAll(
        ".voto"
    );


const areaVotacao =
    document.querySelector(
        ".votacao"
    );


// ========================================
// APLICA VOTO JÁ REGISTRADO
// ========================================

// Se esse problema já foi marcado como
// resolvido antes, o botão correspondente
// já deve abrir a tela selecionado.

if (
    problemasResolvidos.includes(
        problemaSelecionado.id
    )
) {

    const botaoResolvido =
        document.querySelector(
            ".voto.resolvido"
        );


    if (botaoResolvido) {

        botaoResolvido.classList.add(
            "selecionado"
        );

    }

}


botoesVoto.forEach(
    function(botao) {

        botao.addEventListener(
            "click",
            function() {


                // ================================
                // REMOVE SELEÇÃO ANTERIOR
                // ================================

                botoesVoto.forEach(
                    function(item) {

                        item.classList.remove(
                            "selecionado"
                        );

                    }
                );


                // ================================
                // SELECIONA O BOTÃO CLICADO
                // ================================

                botao.classList.add(
                    "selecionado"
                );


                // ================================
                // REMOVE MENSAGEM ANTERIOR
                // ================================

                let mensagemExistente =
                    document.querySelector(
                        ".mensagem-voto"
                    );


                if (mensagemExistente) {

                    mensagemExistente.remove();

                }


                // ================================
                // CRIA NOVA MENSAGEM
                // ================================

                const mensagem =
                    document.createElement(
                        "div"
                    );


                mensagem.classList.add(
                    "mensagem-voto"
                );


                // ================================
                // MENSAGEM DE ACORDO COM O VOTO
                // ================================

                if (
                    botao.classList.contains(
                        "resolvido"
                    )
                ) {

                    mensagem.innerText =
                        "Obrigado! Seu voto indica que o problema foi resolvido.";

                } else {

                    mensagem.innerText =
                        "Obrigado! Seu voto indica que o problema ainda existe.";

                }


                areaVotacao.appendChild(
                    mensagem
                );


                // ================================
                // PERSISTE O VOTO NO LOCALSTORAGE
                // ================================

                const idAtual =
                    problemaSelecionado.id;


                if (
                    botao.classList.contains(
                        "resolvido"
                    )
                ) {

                    if (
                        !problemasResolvidos.includes(
                            idAtual
                        )
                    ) {

                        problemasResolvidos.push(
                            idAtual
                        );

                    }

                } else {

                    // Voto "Ainda existe" desfaz
                    // um "Resolvido" anterior

                    problemasResolvidos =
                        problemasResolvidos.filter(
                            function(id) {

                                return id !== idAtual;

                            }
                        );

                }


                localStorage.setItem(
                    "problemasResolvidos",
                    JSON.stringify(
                        problemasResolvidos
                    )
                );


                console.log(
                    "Voto registrado:",
                    botao.innerText
                );

            }
        );

    }
);


// ========================================
// EXCLUIR PROBLEMA
// ========================================

const botaoExcluir =
    document.querySelector(
        ".excluir-problema"
    );


if (botaoExcluir) {

    botaoExcluir.addEventListener(
        "click",
        function() {

            const confirmar =
                confirm(
                    "Tem certeza que deseja excluir este problema?"
                );


            if (!confirmar) {

                return;

            }


            const idParaExcluir =
                problemaSelecionado.id;


            // ================================
            // REMOVE DOS PROBLEMAS SALVOS
            // (caso seja um problema novo,
            // criado pelo próprio usuário)
            // ================================

            let problemasSalvosAtualizados =
                JSON.parse(
                    localStorage.getItem("problemas")
                ) || [];


            problemasSalvosAtualizados =
                problemasSalvosAtualizados.filter(
                    function(problema) {

                        return problema.id !==
                               idParaExcluir;

                    }
                );


            localStorage.setItem(
                "problemas",
                JSON.stringify(
                    problemasSalvosAtualizados
                )
            );


            // ================================
            // MARCA O ID COMO EXCLUÍDO
            // (necessário também para os
            // 5 problemas fixos, que não
            // podem ser removidos do código)
            // ================================

            let idsExcluidos =
                JSON.parse(
                    localStorage.getItem("problemasExcluidos")
                ) || [];


            if (
                !idsExcluidos.includes(
                    idParaExcluir
                )
            ) {

                idsExcluidos.push(
                    idParaExcluir
                );

            }


            localStorage.setItem(
                "problemasExcluidos",
                JSON.stringify(
                    idsExcluidos
                )
            );


            console.log(
                "Problema excluído:",
                idParaExcluir
            );


            // ================================
            // REDIRECIONA DE VOLTA
            // ================================

            if (origem === "mapa") {

                window.location.href =
                    "index.html";

            } else {

                window.location.href =
                    "notificacoes.html";

            }

        }
    );

}
