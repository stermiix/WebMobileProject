# Check-in 3 — Conversão para componentes React e interatividade básica

## 1. Objetivo

Nesta etapa do projeto Meu Bairro, foi realizada a migração das telas do protótipo anterior para o Next.js, utilizando React para estruturar os componentes e implementar funcionalidades interativas.

O objetivo foi organizar o código, permitir a navegação entre as páginas e adaptar as funcionalidades existentes para a nova estrutura do projeto.

## 2. Tecnologias utilizadas

- **Next.js:** estrutura da aplicação e gerenciamento das rotas.
- **React:** criação de componentes e gerenciamento dos estados das páginas.
- **JavaScript:** implementação das funcionalidades interativas.
- **CSS Modules:** estilização individualizada das páginas e dos componentes.
- **LocalStorage:** armazenamento local dos dados do usuário e dos problemas cadastrados.
- **GitHub:** versionamento e registro das alterações realizadas no projeto.

## 3. Estrutura do projeto

A aplicação foi organizada utilizando o sistema de rotas do Next.js com App Router.

As principais pastas e seus arquivos são:

- `app/page.js` e `app/page.module.css`: página inicial com o mapa do bairro.
- `app/notificacoes/page.js` e `app/notificacoes/page.module.css`: listagem e acompanhamento das notificações.
- `app/criar/page.js` e `app/criar/page.module.css`: cadastro de novos problemas.
- `app/detalhes/page.js` e `app/detalhes/page.module.css`: exibição dos detalhes dos problemas.
- `app/configuracoes/page.js` e `app/configuracoes/page.module.css`: configurações e informações do usuário.
- `app/login/page.js` e `app/login/page.module.css`: tela de entrada do usuário.
- `app/globals.css`: estilos globais da aplicação.
- `app/layout.js`: estrutura geral compartilhada entre as páginas.
- `components/Header.js` e `components/Header.module.css`: cabeçalho e navegação.
- `components/ProtecaoRotas.js`: componente responsável pelo controle de acesso às páginas internas.

Também foram mantidos os arquivos de configuração do Next.js e do projeto.

## 4. Funcionalidades implementadas

### 4.1. Mapa do bairro

A página inicial apresenta um mapa ilustrativo com marcadores que representam problemas da comunidade.

Foram implementadas as seguintes funcionalidades:

- Exibição de problemas previamente cadastrados no protótipo.
- Exibição de novos problemas armazenados localmente.
- Filtro por categoria.
- Atualização da quantidade de problemas exibidos.
- Navegação para a página de detalhes ao selecionar um marcador.
- Ocultação de problemas excluídos.

### 4.2. Notificações

A página de notificações permite visualizar e acompanhar os problemas registrados.

Foram implementados:

- Listagem dos problemas.
- Pesquisa por informações dos registros.
- Filtro por categoria.
- Identificação de notificações novas.
- Atualização do estado de visualização.
- Identificação de problemas resolvidos.
- Navegação para os detalhes de cada problema.
- Contagem de notificações novas, considerando a configuração de notificações do usuário.

### 4.3. Cadastro de problemas

A tela de cadastro permite registrar novos problemas no bairro.

As funcionalidades incluem:

- Seleção da categoria do problema.
- Preenchimento do endereço.
- Preenchimento da descrição, com limite de 300 caracteres.
- Contador de caracteres.
- Seleção de uma imagem para o registro e visualização prévia.
- Validação dos campos obrigatórios.
- Armazenamento dos registros no LocalStorage.
- Exibição de uma mensagem de sucesso após o cadastro.

A localização utilizada nessa versão é simulada, preenchendo um endereço predefinido quando o usuário seleciona a opção correspondente.

### 4.4. Detalhes dos problemas

A página de detalhes foi adaptada para exibir informações de acordo com o problema selecionado.

Foram implementados:

- Recuperação do identificador do problema pela URL.
- Exibição dinâmica das informações do registro.
- Apresentação de endereço, categoria, descrição e demais dados disponíveis.
- Exibição da imagem cadastrada, quando existente.
- Opções para indicar se o problema ainda existe ou foi resolvido.
- Exclusão de registros mediante confirmação.
- Retorno à página de origem, seja o mapa ou a lista de notificações.

### 4.5. Configurações

A tela de configurações permite consultar e gerenciar informações do usuário.

As funcionalidades incluem:

- Exibição do nome, e-mail e bairro armazenados localmente.
- Geração das iniciais do nome para o avatar.
- Ativação e desativação das notificações.
- Exibição de janelas informativas sobre privacidade, ajuda e o projeto.
- Opção de sair da aplicação.
- Remoção das informações de sessão e dos dados pessoais armazenados nas chaves utilizadas pelo login.

### 4.6. Login

A tela de login foi adaptada para utilizar React e permitir o preenchimento das informações do usuário.

Foram implementados:

- Campos para nome, e-mail e bairro.
- Validação dos campos obrigatórios.
- Exibição de mensagens de erro.
- Direcionamento do foco para o campo que precisa ser preenchido.
- Armazenamento local das informações do usuário.
- Redirecionamento para a página inicial após o preenchimento correto.

O login é simulado e não utiliza autenticação real. Seu objetivo é permitir a demonstração do fluxo de entrada e saída no protótipo acadêmico.

### 4.7. Componentes compartilhados e proteção de rotas

O cabeçalho foi organizado em um componente compartilhado, evitando a repetição da mesma estrutura em todas as páginas.

Também foi criado o componente `ProtecaoRotas.js`, que verifica o estado de login armazenado no navegador e direciona usuários não autenticados para a tela de login.

A página de login é tratada separadamente para permitir a entrada no sistema.

## 5. Armazenamento local

O LocalStorage foi utilizado para manter os dados disponíveis durante a navegação entre as páginas e após atualizações da aplicação no mesmo navegador.

Entre as informações armazenadas estão:

- Dados do usuário.
- Problemas cadastrados.
- Problemas resolvidos.
- Problemas excluídos.
- Problemas visualizados.
- Preferência de notificações.

Essa abordagem permite demonstrar a interação entre as páginas sem a necessidade de implementar um banco de dados ou uma API nesta etapa.

Os dados permanecem no navegador utilizado e não são compartilhados automaticamente com outros dispositivos.

## 6. Estilização e organização do código

As páginas foram organizadas em arquivos JavaScript e CSS Modules separados.

Essa estrutura facilita a manutenção do código e permite modificar os estilos de uma página sem afetar diretamente os estilos específicos das demais.

O cabeçalho foi desenvolvido como componente reutilizável, e as páginas utilizam as rotas do Next.js para realizar a navegação interna.

## 7. Versionamento

As alterações desta etapa foram registradas no GitHub com a seguinte mensagem de commit:

**Título:** Check-in 3: conversão para componentes React e interatividade básica.

**Descrição:** Migração das telas do Meu Bairro para Next.js, com componentes React, navegação entre páginas e interatividade básica. Implementação do cadastro de problemas, notificações, detalhes, configurações e proteção de rotas.

## 8. Considerações finais

O Check-in 3 concentrou-se na migração das telas do protótipo para o Next.js e na implementação das funcionalidades interativas necessárias para demonstrar o funcionamento da aplicação.

A organização em componentes, a utilização de rotas e o armazenamento local permitem integrar as principais funcionalidades do Meu Bairro em uma única aplicação.

O projeto continua sendo um protótipo acadêmico. O armazenamento dos dados é local, a localização é simulada e o login não realiza autenticação real.

A próxima etapa poderá incluir a revisão integrada do fluxo de navegação, a verificação final das funcionalidades e a preparação do projeto para apresentação.
