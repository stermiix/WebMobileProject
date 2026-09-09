# WebMobileProject

Meu Bairro — Descrição das Funcionalidades do Protótipo Mobile

O Meu Bairro é um protótipo de aplicativo mobile desenvolvido com o objetivo de permitir que moradores registrem, visualizem e acompanhem problemas encontrados em sua comunidade. A proposta está relacionada ao ODS 11 — Cidades e Comunidades Sustentáveis, buscando incentivar a participação dos moradores na identificação de problemas do bairro.

O protótipo é composto por cinco telas principais, organizadas de forma simples e intuitiva para facilitar a utilização pela comunidade.

1. Tela — Mapa

A tela de Mapa é a página principal do aplicativo e apresenta uma representação visual do bairro.

O mapa possui ruas e quadras representadas graficamente e apresenta cinco marcadores correspondentes aos problemas registrados pelos moradores. Cada marcador possui uma cor e um ícone de acordo com a categoria do problema, facilitando sua identificação.

Ao lado do mapa existe uma legenda com as categorias disponíveis. Dessa forma, o usuário consegue identificar rapidamente quais tipos de problemas estão presentes na região.

Ao selecionar um marcador no mapa, é apresentado um cartão com as informações básicas da ocorrência, como:

* Tipo do problema;
* Endereço;
* Data do registro;
* Descrição;
* Botão “Ver Detalhes”.

O cabeçalho da tela apresenta o nome do aplicativo, “Meu Bairro”, além de um botão que permite utilizar a localização do usuário.

Essa tela funciona como o principal ponto de visualização das ocorrências cadastradas pela comunidade.

2. Tela — Notificações

A tela de Notificações apresenta uma lista dos problemas registrados pelos moradores.

O usuário consegue visualizar as cinco ocorrências cadastradas no protótipo. Cada ocorrência é apresentada em um cartão contendo:

* Ícone correspondente à categoria;
* Tipo do problema;
* Morador responsável pelo registro;
* Localização;
* Data;
* Descrição.

A tela também possui um indicador “2 novos”, mostrando ao usuário que existem duas notificações recentes.

As notificações que ainda não foram visualizadas possuem um ponto colorido para diferenciá-las das notificações já lidas.

Dessa forma, o usuário consegue acompanhar as novas ocorrências registradas na comunidade sem precisar consultar individualmente o mapa.

3. Tela — Registrar Problema

A tela de Registrar Problema permite que o próprio morador cadastre uma nova ocorrência.

Primeiramente, o usuário deve selecionar uma categoria de problema. As categorias são apresentadas em um grid de opções e possuem um feedback visual quando selecionadas, permitindo que o usuário saiba qual categoria escolheu.

Em seguida, o usuário informa a localização do problema. Existe também a opção de utilizar a localização atual do dispositivo, facilitando o preenchimento do endereço.

O usuário pode adicionar uma fotografia do problema por meio da área de upload de imagem. A fotografia permite representar visualmente a situação registrada.

Depois, o usuário pode adicionar uma descrição utilizando um campo de texto. O campo possui um contador de caracteres para auxiliar no preenchimento.

Após preencher as informações necessárias, o usuário utiliza o botão “Publicar Problema”.

O botão possui diferentes estados de acordo com o preenchimento do formulário. Quando as informações necessárias ainda não foram preenchidas, o botão permanece inativo. Após o preenchimento, ele passa a ficar ativo.

Ao publicar o problema, o aplicativo apresenta uma tela de sucesso, informando que o registro foi realizado.

Essa funcionalidade é fundamental para o caráter comunitário do projeto, pois permite que os próprios moradores contribuam para o registro e acompanhamento dos problemas do bairro.

4. Tela — Configurações

A tela de Configurações permite que o usuário visualize suas informações e altere algumas preferências do aplicativo.

Na parte superior é apresentado um cartão de perfil contendo:

* Avatar do usuário;
* Nome;
* E-mail;
* Bairro.

A tela também possui um controle para ativar ou desativar as notificações do aplicativo. O toggle apresenta um feedback visual de acordo com o estado selecionado pelo usuário.

Além disso, são disponibilizadas opções de:

* Privacidade;
* Ajuda;
* Sobre o aplicativo.

Na parte inferior existe o botão “Sair da Conta”, destacado em vermelho para indicar uma ação relacionada ao encerramento da sessão.

Essa tela concentra as principais configurações do usuário em um único local, mantendo a navegação simples e organizada.

5. Tela — Detalhes do Problema

A tela de Detalhes do Problema apresenta todas as informações referentes a uma ocorrência específica.

Essa tela pode ser acessada a partir do mapa ou da lista de notificações, quando o usuário seleciona um problema.

Na parte superior é apresentada uma fotografia da ocorrência, acompanhada de um gradiente e de um indicador visual da categoria do problema. Também existe um botão de voltar sobre a imagem, permitindo retornar à tela anterior.

Abaixo da imagem são apresentadas as informações completas da ocorrência:

* Endereço;
* Data;
* Hora;
* Morador responsável pelo registro;
* Descrição do problema.

A tela também apresenta um mini mapa com um marcador indicando a localização exata da ocorrência.

O botão “Ver no Mapa” permite retornar à visualização do problema no mapa principal.

Por fim, existe uma funcionalidade de participação da comunidade por meio da pergunta sobre a situação atual do problema. O usuário pode escolher entre as opções “Ainda existe” e “Resolvido”. Após a seleção, a interface apresenta um feedback visual indicando a opção escolhida.

Essa funcionalidade permite que os próprios moradores contribuam para manter as informações das ocorrências atualizadas.

Fluxo de utilização

O funcionamento geral do aplicativo pode ser representado pelo seguinte fluxo:

Mapa → selecionar problema → Ver Detalhes

ou

Notificações → selecionar ocorrência → Ver Detalhes

Para registrar uma nova ocorrência:

Registrar Problema → selecionar categoria → informar localização → adicionar foto → escrever descrição → Publicar Problema → confirmação de sucesso

O usuário também pode acessar:

Configurações → perfil e preferências do aplicativo

Dessa maneira, o protótipo apresenta um fluxo simples, no qual o morador pode visualizar problemas, receber informações sobre novas ocorrências, registrar novos problemas e acompanhar detalhes das situações identificadas pela comunidade.

Interações do protótipo

O protótipo também apresenta elementos interativos que demonstram como o sistema poderá funcionar durante a implementação em HTML5, CSS3 e JavaScript. Entre eles estão a seleção de categorias, utilização da localização, publicação de problemas, mudança do estado das notificações, ativação e desativação das notificações e votação sobre a situação de um problema.

Essas interações contribuem para o caráter dinâmico do projeto, requisito previsto para o desenvolvimento da aplicação. A disciplina estabelece que o projeto deve ser desenvolvido utilizando HTML5, CSS3 e JavaScript e possuir, no mínimo, duas interações com JavaScript.

Organização dos arquivos

O projeto é composto por cinco arquivos HTML, um para cada tela, e seis arquivos CSS: um arquivo style.css com as regras compartilhadas por todas as telas e um arquivo específico para cada uma delas. Cada arquivo HTML carrega os dois, nessa ordem.

O processo de separação do CSS, os critérios adotados e as padronizações realizadas estão descritos no arquivo CSS.md.

O protótipo inicial também fará parte da documentação do projeto, conforme solicitado no enunciado, que prevê a inclusão de imagens do protótipo e uma explicação do processo de ideação no README.md.