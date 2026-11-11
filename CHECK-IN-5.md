# Check-in 5 --- Criação da API e migração do frontend

## 1. Objetivo

Implementar uma API interna utilizando o Next.js e integrar o frontend
para consultar e manipular os problemas por meio de requisições HTTP,
reduzindo a dependência direta do `localStorage` para os dados migrados
e preservando as funcionalidades existentes do projeto Meu Bairro.

## 2. Arquivos criados

  -----------------------------------------------------------------------
  Arquivo                             Responsabilidade
  ----------------------------------- -----------------------------------
  `lib/db.js`                         Gerencia a leitura e a gravação dos
                                      problemas no arquivo JSON e contém
                                      os cinco problemas fixos utilizados
                                      como dados iniciais.

  `app/api/problemas/route.js`        GET lista os problemas e POST
                                      cadastra um novo problema.

  `app/api/problemas/[id]/route.js`   GET consulta um problema pelo ID,
                                      PATCH atualiza seu status e DELETE
                                      o exclui.

  `app/api/notificacoes/route.js`     Retorna os problemas no formato
                                      utilizado pela tela de
                                      notificações.

  `data/problemas.json`               Arquivo JSON utilizado para
                                      armazenar os problemas, criado
                                      automaticamente na primeira
                                      requisição.
  -----------------------------------------------------------------------

## 3. Telas modificadas

-   **Mapa (`app/page.js`):** carrega os problemas com `fetch` dentro de
    `useEffect`, consultando `GET /api/problemas`. Os problemas fixos e
    os novos são exibidos a partir da mesma lista.
-   **Registrar problema (`app/criar/page.js`):** envia os dados por
    POST para `/api/problemas` ao publicar um problema, incluindo a
    foto.
-   **Detalhes (`app/detalhes/page.js`):** consulta o problema pelo ID
    na API. As ações "Resolvido" e "Ainda existe" utilizam PATCH, e a
    exclusão utiliza DELETE.
-   **Notificações (`app/notificacoes/page.js`):** carrega a lista por
    meio de `GET /api/notificacoes`.

O layout e o CSS foram preservados. Os IDs dos cinco problemas fixos (1
a 5) foram mantidos, permitindo que a rota dinâmica `/detalhes/[id]`
continue funcionando.

## 4. Persistência e fotos

Os problemas são armazenados em um arquivo JSON no servidor. Conforme os
testes relatados, os dados permanecem disponíveis após atualizar a
página e reiniciar o servidor.

As fotos são armazenadas no próprio JSON em formato base64, mantendo o
comportamento anterior do `localStorage`.

As alterações de status e a exclusão passam a ser realizadas no
servidor, deixando de valer apenas no navegador de quem executou a ação.

## 5. Dados que continuam no localStorage

Nesta etapa, permanecem no `localStorage`:

-   Login e informações do usuário, como nome, e-mail e bairro.
-   Preferência individual de ativar ou desativar notificações.
-   Informação de que uma notificação foi visualizada por determinado
    usuário.

O login real não foi implementado. Uma autenticação real exigiria
cadastro, armazenamento seguro de senhas, sessão ou token e proteção das
rotas. Esses pontos não fizeram parte do escopo desta entrega.

Enquanto os usuários não forem integrados à API, o nome associado ao
registro de um problema continua vindo do navegador utilizado. Pessoas
em computadores diferentes compartilham os problemas, mas não o perfil
nem o controle individual de notificações visualizadas.

## 6. Testes realizados

A implementação foi verificada com a aplicação em funcionamento no
navegador. Segundo os testes relatados:

-   O build de produção foi concluído com sucesso.
-   GET, POST, PATCH e DELETE responderam corretamente.
-   A API retornou 404 para um ID inexistente.
-   Um problema cadastrado com foto apareceu no mapa e nas notificações.
-   A tela de detalhes exibiu os dados e a foto.
-   A ação de marcar o problema como "Resolvido" foi gravada.
-   A exclusão removeu o problema do arquivo `data/problemas.json`.
-   Após a exclusão do problema de teste, o arquivo voltou a conter os
    cinco problemas originais.

## 7. Pontos para confirmar com o professor

1.  No próximo Check-in, será necessário implementar cadastro e login
    reais, com senha e sessão, ou apenas relacionar os usuários aos
    problemas por meio da API?
2.  O armazenamento em arquivo JSON é aceito como persistência ou será
    esperado o uso de um banco de dados?
3.  As fotos podem continuar armazenadas em base64 dentro do JSON ou
    devem ser salvas como arquivos?

## 8. Resultado

O Check-in 5 implementou uma API interna no Next.js e integrou a
consulta, o cadastro, a atualização de status e a exclusão dos
problemas. O mapa, a tela de registro, os detalhes e as notificações
passaram a utilizar os endpoints da API para os dados migrados.

As funcionalidades existentes foram preservadas. Os dados de usuário e
as preferências individuais que não fizeram parte desta migração
continuam no `localStorage`.
