# Guia para executar o Meu Bairro

Este guia explica como abrir e executar o projeto **Meu Bairro** de duas formas:

1. Pelo **GitHub Codespaces**, no navegador.
2. No computador, usando o **Visual Studio Code (VS Code)** instalado localmente.

O projeto Next.js fica dentro da pasta `meu-bairro` do repositório `WebMobileProject`.

## 1. O que é necessário

### Usando GitHub Codespaces

É necessário ter uma conta GitHub com acesso ao repositório. O Codespaces fornece um ambiente de desenvolvimento na nuvem, por isso não é necessário instalar Node.js, npm ou VS Code no computador para seguir o procedimento pelo navegador.

### Usando o VS Code no computador

Instale os seguintes programas, caso ainda não existam no computador:

- **Node.js:** instale uma versão LTS que seja compatível com o Next.js. A documentação atual do Next.js informa o mínimo de Node.js `20.9`. O npm é instalado junto com o Node.js.
  - Download oficial: <https://nodejs.org/en/download>
- **Visual Studio Code:** editor em que os arquivos do projeto serão abertos.
  - Download oficial: <https://code.visualstudio.com/>
- **Git:** necessário se optar por baixar o projeto com `git clone`. Se preferir baixar o repositório como arquivo ZIP pelo GitHub, o Git não é obrigatório.
  - Download oficial para Windows: <https://git-scm.com/install/windows>

Depois de instalar o Node.js, feche e abra novamente o terminal para que o comando `npm` seja reconhecido.

Para conferir se Node.js e npm estão instalados, execute no terminal:

```bash
node -v
npm -v
```

O primeiro comando mostra a versão do Node.js e o segundo mostra a versão do npm. Se algum comando não for reconhecido, confira a instalação e reinicie o terminal.

## 2. Executar pelo GitHub Codespaces (navegador)

### 2.1 Abrir o Codespace

1. Entre no GitHub e abra o repositório `WebMobileProject`.
2. Clique em **Code** e abra a guia **Codespaces**.
3. Se já existir um Codespace para esse repositório, abra-o. Caso contrário, crie um novo Codespace a partir do branch que contém o projeto.
4. Aguarde o ambiente abrir no editor do navegador.

Documentação oficial: <https://docs.github.com/pt/codespaces/developing-in-a-codespace/creating-a-codespace-for-a-repository>

### 2.2 Abrir a pasta correta

No explorador de arquivos, localize a pasta `meu-bairro`. Abra o terminal integrado do VS Code pelo menu **Terminal → New Terminal**.

O terminal precisa estar dentro da pasta `meu-bairro`, onde ficam `package.json` e `package-lock.json`.

Se o terminal estiver na raiz do repositório, execute:

```bash
cd meu-bairro
```

Se o terminal já estiver na pasta `meu-bairro`, não é necessário executar esse comando.

### 2.3 Instalar as dependências

Na primeira execução, ou quando as dependências precisarem ser instaladas novamente, execute:

```bash
npm ci
```

Esse comando instala as dependências descritas no `package-lock.json`. Aguarde terminar antes de seguir.

### 2.4 Iniciar o projeto

Execute:

```bash
npm run dev
```

Quando o terminal mostrar que o Next.js está pronto, abra a aplicação pela aba **Ports/Portas** do Codespaces, usando a porta `3000`, ou clique no endereço disponibilizado pelo ambiente. O endereço local habitual é `http://localhost:3000`, mas no Codespaces o navegador normalmente abre uma URL encaminhada pelo GitHub.

Para encerrar o servidor, volte ao terminal e pressione `Ctrl + C`.

## 3. Executar localmente no VS Code (computador)

### 3.1 Obter os arquivos do repositório

Há duas opções.

**Opção A — usando Git**

1. Instale o Git, caso necessário.
2. Abra o terminal do Windows, PowerShell ou terminal integrado do VS Code.
3. Navegue até a pasta em que deseja guardar o projeto.
4. Clone o repositório:

```bash
git clone https://github.com/stermiix/WebMobileProject.git
```

5. Entre na pasta do projeto Next.js:

```bash
cd WebMobileProject/meu-bairro
```

**Opção B — baixando um ZIP pelo GitHub**

1. Abra o repositório `WebMobileProject` no GitHub.
2. Clique em **Code → Download ZIP** e extraia o arquivo para uma pasta do computador.
3. No VS Code, use **File → Open Folder** e abra a pasta `meu-bairro` extraída, não apenas a pasta externa do repositório.

### 3.2 Abrir o terminal na pasta correta

No VS Code, selecione **Terminal → New Terminal**.

Confirme que o terminal está na pasta que contém `package.json` e `package-lock.json`. Se estiver na raiz do repositório clonado, execute:

```powershell
cd meu-bairro
```

Se você abriu diretamente a pasta `meu-bairro` no VS Code, pode pular esse comando.

### 3.3 Instalar as dependências

Execute:

```bash
npm ci
```

A instalação precisa terminar sem erros. Esse procedimento deve ser repetido se você baixar uma cópia nova do projeto ou precisar reinstalar as dependências.

### 3.4 Iniciar e abrir o site

Execute:

```bash
npm run dev
```

Abra um navegador e acesse:

<http://localhost:3000>

Para encerrar o servidor de desenvolvimento, clique no terminal em que ele está rodando e pressione `Ctrl + C`.

## 4. Comandos usados com mais frequência

| Comando | Para que serve |
|---|---|
| `node -v` | Mostra a versão do Node.js instalada. |
| `npm -v` | Mostra a versão do npm instalada. |
| `npm ci` | Instala as dependências indicadas pelo arquivo de lock. |
| `npm run dev` | Inicia o servidor de desenvolvimento do Next.js. |
| `Ctrl + C` | Encerra o servidor no terminal. |

## 5. Problemas comuns

### O terminal mostra `npm: command not found` ou diz que `npm` não é reconhecido

- No computador local, confirme que o Node.js foi instalado.
- Feche e abra novamente o terminal ou o VS Code.
- Execute `node -v` e `npm -v` para verificar se os comandos são reconhecidos.

### O terminal informa que não encontrou `package.json`

Você provavelmente está na pasta errada. Navegue até `meu-bairro` e confira se os arquivos `package.json` e `package-lock.json` aparecem no explorador.

### A porta 3000 já está em uso

Pode haver outro servidor em execução. Encerre o servidor anterior com `Ctrl + C` no terminal correspondente. Se ele não estiver visível, verifique os terminais abertos antes de iniciar outro.

### A página não abre depois de executar `npm run dev`

- Aguarde a mensagem de que o Next.js está pronto.
- Confira se apareceu algum erro no terminal.
- Localmente, tente abrir `http://localhost:3000`.
- No Codespaces, abra a porta `3000` pela guia **Ports/Portas** e use a URL encaminhada pelo GitHub.

### Quero obter as alterações mais recentes do GitHub

Se estiver trabalhando com uma cópia clonada usando Git, salve ou registre suas alterações locais antes de atualizar. Depois, na pasta do repositório, execute:

```bash
git pull
```

Se você baixou um ZIP, será necessário baixar uma nova cópia ou usar Git para receber as atualizações.

## 6. Observações

- Execute os comandos dentro da pasta `meu-bairro`, onde fica o `package.json` do projeto Next.js.
- Não é necessário criar um novo projeto Next.js nem executar `npx create-next-app` para rodar este projeto existente.
- O servidor iniciado por `npm run dev` é para desenvolvimento e testes.
- Este guia trata apenas de obter, instalar e executar o projeto. Não descreve nem implementa a API do Check-in 5.

## 7. Links oficiais úteis

- Next.js — requisitos e instalação: <https://nextjs.org/docs/app/getting-started/installation>
- GitHub Codespaces — criar um Codespace: <https://docs.github.com/pt/codespaces/developing-in-a-codespace/creating-a-codespace-for-a-repository>
- Node.js — downloads: <https://nodejs.org/en/download>
- Visual Studio Code — downloads: <https://code.visualstudio.com/>
- Git para Windows — instalação: <https://git-scm.com/install/windows>
