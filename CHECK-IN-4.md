# Check-in 4 — Roteamento simples e dinâmico no Next.js

## Objetivo

Este check-in teve como objetivo avançar o projeto Meu Bairro com a utilização do sistema de rotas do Next.js, contemplando rotas simples e uma rota dinâmica para consultar os detalhes dos problemas registrados.

## Rotas simples

No App Router do Next.js, as páginas são definidas pela estrutura de pastas dentro de `app`. Cada pasta que contém um arquivo `page.js` disponibiliza uma rota correspondente.

Exemplos presentes no projeto:

| Arquivo | Rota | Finalidade |
| --- | --- | --- |
| `app/page.js` | `/` | Exibe o mapa do bairro. |
| `app/notificacoes/page.js` | `/notificacoes` | Exibe a lista de notificações. |
| `app/criar/page.js` | `/criar` | Permite registrar um problema. |
| `app/configuracoes/page.js` | `/configuracoes` | Exibe as configurações do usuário. |
| `app/login/page.js` | `/login` | Exibe a tela de login. |

Essas rotas levam a páginas específicas e não precisam de um identificador variável no caminho da URL.

## Rota dinâmica dos detalhes

Foi criada a estrutura `app/detalhes/[id]/page.js`. O segmento `[id]` permite receber um identificador variável pela URL, reutilizando a mesma página para apresentar problemas diferentes.

Exemplos de endereços:

- `/detalhes/3`: abre o problema cujo identificador é `3`.
- `/detalhes/1793285713802`: pode abrir um problema cadastrado com esse identificador, desde que ele exista nos dados locais do navegador.

O arquivo `app/detalhes/[id]/page.js` utiliza `useParams()` para obter o valor de `id` e passa esse identificador à página de detalhes já existente. Dessa forma, a lógica de exibição dos detalhes é reaproveitada, em vez de criar uma página separada para cada problema.

## Origem da navegação

Os links do mapa e das notificações encaminham o usuário para a rota dinâmica e mantêm um parâmetro de consulta que identifica a tela de origem:

- `/detalhes/3?origem=mapa`
- `/detalhes/3?origem=notificacoes`

O identificador do problema é o segmento dinâmico (`3`). O parâmetro `origem` é usado para que a página de detalhes apresente o retorno ao mapa ou às notificações, conforme o caminho utilizado pelo usuário.

## Arquivos envolvidos

- `app/page.js`: os marcadores do mapa apontam para `/detalhes/{id}`.
- `app/notificacoes/page.js`: os itens da lista de notificações apontam para `/detalhes/{id}`.
- `app/detalhes/page.js`: mantém a lógica existente de consulta e apresentação dos detalhes.
- `app/detalhes/[id]/page.js`: recebe o identificador dinâmico e reutiliza a página de detalhes.

## Testes realizados

Durante os testes manuais no navegador, foram verificados os seguintes comportamentos:

- Abertura dos detalhes de um problema fixo a partir do mapa.
- Abertura dos detalhes de um problema fixo a partir das notificações.
- Abertura de um problema cadastrado pelo usuário, incluindo a foto enviada.
- Exibição das informações do problema, como endereço, data, descrição e morador.
- Retorno do usuário ao mapa ou às notificações, de acordo com a origem da navegação.

Os fluxos acima foram testados no ambiente de desenvolvimento do Codespaces e apresentaram o comportamento esperado.

## Escopo deste check-in

Este documento registra o trabalho de roteamento simples e dinâmico correspondente ao Check-in 4. A criação e o consumo da rota de API com JSON fixo pertencem ao Check-in 5 e não fazem parte desta etapa.
