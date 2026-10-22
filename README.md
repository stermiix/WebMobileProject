# WebMobileProject — Meu Bairro

**Integrantes:**

- Leonardo de Castro Tonon — RA 10426930
- Leonardo Patriani Cardoso — RA 10417188
- Antonio Renilson Bezerra da Silva — RA 10722184
- Bernardo Souza Oliveira — RA 10312871

O **Meu Bairro** é uma aplicação para que moradores registrem, visualizem e acompanhem problemas da sua comunidade (buracos, lixo acumulado, iluminação, vazamentos), relacionada ao **ODS 11 — Cidades e Comunidades Sustentáveis**.

O projeto começou em HTML, CSS e JavaScript puros e está sendo migrado para **React com Next.js**.

---

# Tutorial — Versão React / Next.js

## 1. Pré-requisitos

- [Node.js](https://nodejs.org) instalado (versão 20 ou superior).
- Para conferir, rode no terminal:

```bash
node -v
npm -v
```

## 2. Como rodar o projeto

1. Clone o repositório:

```bash
git clone https://github.com/stermiix/WebMobileProject.git
cd WebMobileProject/meu-bairro
```

2. Instale as dependências (cria a pasta `node_modules`):

```bash
npm install
```

3. Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

4. Abra [http://localhost:3000](http://localhost:3000) no navegador.

## 3. Como o projeto foi criado

O projeto foi gerado com o comando oficial do Next.js:

```bash
npx create-next-app@latest meu-bairro --js --app --no-tailwind --no-eslint
```

| Opção | Motivo |
|---|---|
| `--js` | Usar JavaScript (sem TypeScript) |
| `--app` | Usar o App Router (rotas definidas pela pasta `app/`) |
| `--no-tailwind` | A estilização é feita com CSS global e CSS Modules |
| `--no-eslint` | Manter o projeto o mais simples possível |

Depois disso, os arquivos de exemplo do Next.js foram removidos.

## 4. Estrutura de pastas

```
WebMobileProject/
├── meu-bairro/                  Projeto Next.js
│   ├── app/
│   │   ├── layout.js            Estrutura comum a todas as páginas (Header + página atual)
│   │   ├── globals.css          CSS global (reset, body, links)
│   │   ├── page.js              Página inicial "/" (Mapa do bairro)
│   │   └── page.module.css      CSS Module da página do mapa
│   ├── components/
│   │   ├── Header.js            Componente do cabeçalho com o menu
│   │   └── Header.module.css    CSS Module do cabeçalho
│   ├── public/                  Arquivos estáticos (imagens)
│   └── package.json             Dependências e scripts
└── projeto-antigo/              Versão anterior em HTML, CSS e JavaScript
```

## 5. Conceitos utilizados

### Componentes

Um componente é uma função JavaScript que retorna JSX (HTML dentro do JavaScript). O cabeçalho, que antes era repetido em todos os arquivos HTML, virou o componente `Header`, escrito uma única vez e usado no `layout.js`.

```jsx
import Header from "@/components/Header";

<Header />
```

### Layout

O `app/layout.js` envolve todas as páginas. A prop `children` representa a página da rota acessada:

```jsx
<body>
  <Header />
  {children}
</body>
```

### Rotas pela pasta `app/`

Cada pasta dentro de `app/` que possui um arquivo `page.js` vira uma rota:

| Arquivo | URL |
|---|---|
| `app/page.js` | `/` |
| `app/sobre/page.js` | `/sobre` |

### CSS global e CSS Modules

- `app/globals.css`: regras que valem para todo o site (antigo `style.css`).
- `*.module.css`: regras que valem apenas para um componente ou página. O Next.js gera nomes de classe únicos, evitando conflitos.

```jsx
import styles from "./page.module.css";

<div className={styles.legenda}></div>
```

### Diferenças entre HTML e JSX

| HTML | JSX |
|---|---|
| `class="logo"` | `className={styles.logo}` |
| `for="campo"` | `htmlFor="campo"` |
| `<a href="criar.html">` | `<Link href="/criar">` |

## 6. Andamento da migração

| Check-in | Entrega | Status |
|---|---|---|
| 2 | Estrutura inicial em Next.js, CSS global, componente `Header` e página do mapa (HTML e CSS) | ✅ |
| 3 | Componentes React e interatividade com `useState` | ⏳ |
| 4 | Rotas simples (`/sobre`) e dinâmicas | ⏳ |
| 5 | Rota de API com JSON fixo consumida com `fetch` e `useEffect` | ⏳ |

---

# Projeto 1 — Versão HTML, CSS e JavaScript

Os arquivos desta versão estão na pasta `projeto-antigo/`.

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
```
