# JavaScript — Projeto Meu Bairro

## 1. Visão geral

O projeto **Meu Bairro** utiliza JavaScript para adicionar interatividade e comportamento dinâmico às páginas do sistema.

Nesta etapa, foram implementadas funcionalidades para:

- Seleção de categorias no formulário;
- Contador de caracteres da descrição;
- Preenchimento da localização;
- Seleção e visualização prévia de fotos;
- Validação do formulário;
- Publicação de novos problemas;
- Armazenamento dos problemas no `localStorage`;
- Exibição dinâmica de problemas nas notificações;
- Controle de notificações novas e visualizadas;
- Exibição dinâmica dos detalhes de cada problema;
- Sistema de votação sobre a situação do problema;
- Associação dos marcadores do mapa aos respectivos problemas;
- Exibição dos novos problemas cadastrados no mapa;
- Navegação de retorno conforme a origem do usuário.

---

## 2. Organização dos arquivos JavaScript

O JavaScript foi separado por página para manter o projeto organizado e facilitar a manutenção.

```text
criar.js
notificacoes.js
detalhes.js
index.js
```

Cada arquivo é responsável pelas funcionalidades específicas da sua respectiva tela.

---

# 3. `criar.js` — Registro de problemas

O arquivo `criar.js` controla as interações da página **Registrar problema**.

### Funcionalidades implementadas

### Seleção de categoria

O usuário pode selecionar uma categoria. Ao clicar em uma opção, a categoria selecionada recebe a classe `selected`.

```javascript
categoria.classList.add("selected");
```

A categoria escolhida é armazenada na variável:

```javascript
let categoriaSelecionada = null;
```

### Contador de caracteres

A descrição possui um contador que informa a quantidade de caracteres digitados.

Exemplo:

```text
45/300 caracteres
```

O contador é atualizado sempre que o usuário altera o campo de descrição.

### Localização

O botão de localização preenche o campo automaticamente com uma localização de exemplo:

```text
Rua das Flores, 125
```

Essa funcionalidade representa a localização no protótipo, sem utilização de GPS real.

### Seleção de foto

O usuário pode selecionar uma imagem através do campo de arquivo.

Após a seleção, o JavaScript utiliza `FileReader` para gerar uma prévia da imagem na própria página.

A imagem também é armazenada como Data URL para permitir sua utilização posteriormente nos detalhes do problema.

### Validação do formulário

Antes da publicação, o sistema verifica:

- Se uma categoria foi selecionada;
- Se a localização foi preenchida;
- Se a descrição foi preenchida.

Caso algum campo obrigatório esteja vazio, uma mensagem é apresentada ao usuário.

### Publicação do problema

Após a validação, o sistema cria um objeto contendo os dados do problema:

```javascript
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
```

O problema é armazenado no `localStorage`:

```javascript
localStorage.setItem(
    "problemas",
    JSON.stringify(problemas)
);
```

---

# 4. `notificacoes.js` — Sistema de notificações

O arquivo `notificacoes.js` controla a página **Notificações**.

Ele trabalha com os cinco problemas iniciais do sistema e também com os problemas cadastrados pelo usuário.

### Problemas cadastrados pelo usuário

Os problemas armazenados no `localStorage` são recuperados e transformados em cards de notificação.

São exibidos:

- Ícone;
- Título;
- Categoria;
- Morador;
- Endereço;
- Descrição;
- Data;
- Status da notificação.

### Links para os detalhes

Cada problema possui seu próprio identificador.

Os problemas novos utilizam o ID gerado no momento da publicação:

```text
detalhes.html?problemaId=ID
```

Isso permite que diferentes problemas sejam exibidos corretamente na página de detalhes.

### Controle de notificações novas

O sistema diferencia notificações novas de notificações já visualizadas.

Quando uma notificação é aberta, ela deixa de apresentar o status:

```text
Novo
```

e passa para:

```text
Visualizado
```

Também é removido o indicador visual da notificação.

### Contador de notificações

O número de problemas ainda não visualizados é calculado dinamicamente.

Exemplo:

```text
3 novos
```

Depois que uma notificação é visualizada:

```text
2 novos
```

Quando todas forem visualizadas:

```text
Nenhum novo
```

### Persistência

Os IDs dos problemas visualizados são armazenados no `localStorage` utilizando:

```javascript
"problemasVisualizados"
```

Assim, ao atualizar a página, as notificações que já foram visualizadas continuam marcadas como visualizadas.

---

# 5. `detalhes.js` — Detalhes dos problemas

O arquivo `detalhes.js` controla a página de detalhes.

Ele identifica o problema selecionado através do parâmetro da URL:

```text
detalhes.html?problemaId=2
```

### Busca do problema

Primeiro, o JavaScript procura o problema entre os problemas criados pelo usuário.

Caso não encontre, procura entre os cinco problemas fixos do sistema.

### Dados exibidos

A página de detalhes é preenchida dinamicamente com:

- Título;
- Categoria;
- Ícone;
- Foto;
- Endereço;
- Data;
- Horário;
- Morador responsável pelo registro;
- Descrição.

Quando o problema possui uma foto cadastrada, ela é exibida na área principal.

Caso não possua foto, o sistema apresenta o ícone correspondente à categoria.

---

# 6. Sistema de votação

Na página de detalhes foi implementada uma interação para informar a situação atual do problema.

Existem duas opções:

```text
⚠️ Ainda existe
✅ Resolvido
```

Quando o usuário seleciona uma opção:

- O botão escolhido recebe destaque visual;
- A opção anterior deixa de estar selecionada;
- Uma mensagem de confirmação é apresentada.

Exemplo:

```text
Obrigado! Seu voto indica que o problema ainda existe.
```

ou:

```text
Obrigado! Seu voto indica que o problema foi resolvido.
```

---

# 7. Origem da navegação

O sistema identifica de onde o usuário acessou os detalhes.

Quando o problema é acessado pelo mapa:

```text
detalhes.html?problemaId=2&origem=mapa
```

O botão apresenta:

```text
← Voltar para o mapa
```

Quando o problema é acessado pelas notificações:

```text
detalhes.html?problemaId=2&origem=notificacoes
```

O botão apresenta:

```text
← Voltar para notificações
```

Isso mantém a navegação coerente com o caminho utilizado pelo usuário.

---

# 8. `index.js` — Mapa

O arquivo `index.js` controla os marcadores da página principal do mapa.

O mapa utilizado no projeto é uma **representação visual ilustrativa**, não um mapa geográfico com GPS.

### Marcadores fixos

Os cinco marcadores existentes no mapa são associados aos cinco problemas fixos:

```text
1 — Lixo acumulado
2 — Iluminação pública
3 — Buraco na rua
4 — Calçada danificada
5 — Vazamento
```

Cada marcador direciona para o respectivo detalhe:

```text
detalhes.html?problemaId=1&origem=mapa
```

### Novos marcadores

Os problemas cadastrados pelo usuário também são recuperados do `localStorage`.

O JavaScript cria novos marcadores automaticamente no mapa.

A aparência do marcador é definida de acordo com a categoria do problema:

```text
Lixo acumulado → 🗑️
Iluminação → 💡
Buraco na rua → 🕳️
Calçada danificada → 🚧
Vazamento → 💧
```

Os novos marcadores recebem posições pré-definidas no mapa ilustrativo.

### Contagem de problemas

A quantidade exibida no aviso do mapa é atualizada automaticamente.

O sistema considera:

```text
5 problemas fixos
+
problemas cadastrados pelo usuário
```

Por exemplo, com dois novos problemas:

```text
Existem 7 problemas registrados atualmente no bairro.
```

---

# 9. `localStorage`

O `localStorage` é utilizado como uma solução simples de armazenamento local para o protótipo.

As principais informações armazenadas são:

```text
problemas
problemasVisualizados
```

### `problemas`

Armazena os problemas cadastrados pelo usuário.

### `problemasVisualizados`

Armazena os IDs das notificações que já foram visualizadas.

Essa abordagem permite demonstrar o funcionamento dinâmico do sistema sem a necessidade de um banco de dados ou servidor.

---

# 10. Fluxo JavaScript do sistema

O funcionamento atual pode ser representado da seguinte forma:

```text
                    REGISTRAR PROBLEMA
                           │
                           ▼
                       criar.js
                           │
                           ▼
                     localStorage
                           │
              ┌────────────┴────────────┐
              ▼                         ▼
       notificacoes.js              index.js
              │                         │
              ▼                         ▼
       Notificações                  Mapa
              │                         │
              └────────────┬────────────┘
                           ▼
                     detalhes.js
                           │
              ┌────────────┴────────────┐
              ▼                         ▼
        Dados do problema          Sistema de voto
```

---

# 11. Tecnologias utilizadas

- **JavaScript**
- **HTML5**
- **CSS3**
- **LocalStorage**
- **FileReader API**
- **URLSearchParams**

O JavaScript foi desenvolvido utilizando `let` e `const`, mantendo o código organizado e evitando o uso de `var`.

---

# 12. Situação atual

Nesta etapa, o JavaScript permite que o protótipo tenha comportamento dinâmico em diferentes telas.

O fluxo principal implementado é:

```text
Cadastrar problema
        ↓
Salvar problema
        ↓
Exibir nas notificações
        ↓
Abrir detalhes corretos
        ↓
Exibir dados e foto
        ↓
Votar na situação
```

Além disso, os problemas cadastrados também podem aparecer no mapa ilustrativo:

```text
Cadastrar problema
        ↓
Salvar no localStorage
        ↓
Adicionar marcador ao mapa
        ↓
Abrir detalhes do problema
```

As funcionalidades podem ser ampliadas posteriormente conforme a evolução do projeto.
