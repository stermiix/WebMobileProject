# WebMobileProject

## Meu Bairro — Descrição das Funcionalidades do Protótipo Mobile

O **Meu Bairro** é um protótipo de aplicativo mobile desenvolvido com o objetivo de permitir que moradores registrem, visualizem e acompanhem problemas encontrados em sua comunidade.

A proposta está relacionada ao **ODS 11 — Cidades e Comunidades Sustentáveis**, buscando incentivar a participação dos moradores na identificação de problemas do bairro.

O protótipo utiliza **HTML5, CSS3 e JavaScript** e possui uma estrutura composta por telas integradas, nas quais o usuário pode realizar ações, visualizar informações e acompanhar os problemas registrados.

O projeto foi desenvolvido de forma simples, priorizando uma interface organizada, intuitiva e adequada à proposta acadêmica.

---

# 1. Tela — Login

A tela de **Login** é a porta de entrada do aplicativo.

Nessa tela, o usuário informa seus dados para iniciar uma sessão simulada no protótipo.

O formulário possui os seguintes campos:

* Nome;
* E-mail;
* Bairro.

O botão **“Entrar”** permite iniciar a sessão após o preenchimento dos campos obrigatórios.

Caso algum campo não seja preenchido, o sistema apresenta uma mensagem indicando a informação que deve ser preenchida.

Após o preenchimento correto, os dados do usuário são armazenados no navegador por meio do `localStorage`.

São armazenadas as seguintes informações:

* `usuarioLogado`;
* `nomeUsuario`;
* `emailUsuario`;
* `bairroUsuario`.

Após o login, o usuário é direcionado para a tela principal do aplicativo.

Essa funcionalidade permite simular uma sessão de usuário sem a necessidade de um sistema real de autenticação ou banco de dados.

---

# 2. Tela — Mapa

A tela de **Mapa** é a página principal do aplicativo e apresenta uma representação visual do bairro.

O mapa possui ruas e quadras representadas graficamente e apresenta marcadores correspondentes aos problemas registrados pelos moradores.

Cada marcador possui uma cor e um ícone de acordo com a categoria do problema, facilitando sua identificação.

Ao lado do mapa existe uma legenda com as categorias disponíveis. Dessa forma, o usuário consegue identificar rapidamente quais tipos de problemas estão presentes na região.

A tela também possui um filtro por categoria, permitindo selecionar tipos específicos de problemas.

Ao selecionar um marcador no mapa, o usuário pode acessar a tela de detalhes da ocorrência.

Os problemas criados pelo usuário também podem ser adicionados ao mapa de forma dinâmica.

Essa tela funciona como o principal ponto de visualização das ocorrências cadastradas pela comunidade.

---

# 3. Tela — Notificações

A tela de **Notificações** apresenta uma lista dos problemas registrados pelos moradores.

As ocorrências são apresentadas em cartões contendo:

* Ícone correspondente à categoria;
* Tipo do problema;
* Morador responsável pelo registro;
* Localização;
* Data;
* Descrição;
* Situação da ocorrência.

A tela possui um indicador de novas notificações, como **“2 novos”**, quando existem problemas ainda não visualizados.

As notificações não visualizadas possuem um ponto colorido para diferenciá-las das notificações já visualizadas.

Quando o usuário seleciona uma ocorrência, ela é marcada como visualizada e o contador de novas notificações é atualizado.

A visualização dos problemas é armazenada no `localStorage`, permitindo manter o estado mesmo após a atualização da página.

Também foram implementadas funcionalidades de:

* Busca por texto;
* Filtro por categoria;
* Identificação de problemas resolvidos;
* Exclusão de problemas;
* Atualização do contador de novas notificações.

## Controle de notificações

A tela de Configurações possui uma opção para ativar ou desativar os avisos de notificações.

Quando as notificações estão ativadas:

* O indicador de novas notificações é exibido;
* Os pontos das notificações não visualizadas são exibidos.

Quando as notificações estão desativadas:

* O indicador de novas notificações é ocultado;
* Os pontos de novas notificações são ocultados;
* Os problemas continuam disponíveis na lista.

A preferência escolhida pelo usuário é armazenada no `localStorage`.

Dessa forma, a opção de notificações possui uma função real dentro do aplicativo e está integrada à tela de Notificações.

---

# 4. Tela — Registrar Problema

A tela de **Registrar Problema** permite que o próprio morador cadastre uma nova ocorrência.

Primeiramente, o usuário deve selecionar uma categoria de problema.

As categorias são apresentadas em um grid de opções e possuem um feedback visual quando selecionadas, permitindo que o usuário saiba qual categoria escolheu.

Em seguida, o usuário informa a localização do problema.

Existe também a opção de utilizar a localização apresentada pelo protótipo por meio do botão de localização, facilitando o preenchimento do endereço.

O usuário pode adicionar uma fotografia do problema por meio da área de upload de imagem.

Após selecionar uma fotografia, o sistema apresenta uma pré-visualização da imagem na própria tela.

Depois, o usuário pode adicionar uma descrição utilizando um campo de texto.

O campo possui um contador de caracteres, permitindo acompanhar a quantidade de caracteres digitados.

Antes da publicação, o sistema valida:

* Categoria;
* Localização;
* Descrição.

Caso alguma informação obrigatória não seja preenchida, o sistema apresenta uma mensagem solicitando o preenchimento.

Após o preenchimento das informações necessárias, o problema é salvo no `localStorage`.

O registro armazena informações como:

* ID;
* Título;
* Categoria;
* Endereço;
* Data;
* Horário;
* Morador;
* Descrição;
* Fotografia.

## Usuário responsável pelo problema

O nome do morador não é mais fixo.

O sistema utiliza o nome do usuário que está atualmente logado.

Dessa forma, quando um usuário realiza o login e registra um problema, a ocorrência recebe automaticamente o nome desse usuário como responsável pelo registro.

Por exemplo:

```text
Nome informado no login:
Maria Souza

Novo problema:
Buraco na rua

Morador:
Maria Souza
