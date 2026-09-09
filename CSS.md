# Separação do CSS

Este documento descreve o processo de separação do CSS do projeto Meu Bairro e a estrutura de arquivos resultante.

## Situação inicial

Todo o CSS do projeto estava escrito dentro dos próprios arquivos HTML, em blocos `<style>` no `<head>` de cada tela. Cada um dos cinco arquivos continha entre 300 e 590 linhas de estilo.

Como as cinco telas compartilham o mesmo cabeçalho, o mesmo logotipo e o mesmo menu de navegação, as regras que definem esses elementos apareciam repetidas nos cinco arquivos. Qualquer ajuste no cabeçalho exigia a mesma alteração em cinco lugares diferentes, o que aumenta a chance de as telas ficarem inconsistentes entre si.

Foi o que de fato aconteceu durante o desenvolvimento, como descrito na seção de padronizações.

## Processo

A separação foi feita tela a tela, começando pela tela de Mapa, e seguiu quatro etapas.

### Extração

O conteúdo do bloco `<style>` foi movido para um arquivo `.css` externo, e o bloco foi substituído por elementos `<link>` no `<head>`. Nenhuma regra foi reescrita: o conteúdo foi transferido como estava.

### Separação entre regras comuns e específicas

As regras foram classificadas em dois grupos. As que descrevem elementos presentes em todas as telas foram reunidas em um arquivo compartilhado. As que descrevem elementos de uma tela apenas foram para o arquivo daquela tela.

Ficaram no arquivo compartilhado dez regras: a normalização inicial de margens e espaçamentos (`*`), o corpo da página (`body`), os links (`a`), o cabeçalho (`header`), o logotipo (`.logo` e `.logo-icon`) e o menu de navegação (`.menu`, `.menu a`, `.menu a:hover` e `.menu a.active`).

Nem toda regra repetida foi unificada. A classe `.container`, por exemplo, aparece em três telas com larguras máximas diferentes: 1100 pixels no mapa, 1000 pixels nas notificações e 800 pixels no formulário de registro. São decisões de projeto distintas, e não repetição desnecessária: o mapa precisa de área horizontal, enquanto um formulário muito largo prejudica a leitura. Essas regras foram mantidas nos arquivos de cada tela.

### Divisão das media queries

As regras responsivas estavam agrupadas em blocos `@media` que misturavam os dois tipos. O bloco `@media (max-width: 700px)` da tela de Mapa, por exemplo, continha ao mesmo tempo a versão reduzida do cabeçalho e ajustes do mapa.

Como um bloco `@media` não pode ser dividido entre dois arquivos, foi necessário declarar a mesma condição nos dois: no arquivo compartilhado, contendo as regras do cabeçalho e do menu; e no arquivo da tela, contendo as regras específicas. Não há conflito nisso, uma vez que `@media` não é um bloco único e sim uma condição, que pode ser aberta quantas vezes for necessário.

Sem essa divisão, o cabeçalho só teria comportamento responsivo na tela de Mapa, já que as demais não carregam o arquivo dessa tela.

### Padronizações

Ao reunir as regras comuns, verificou-se que o cabeçalho havia sido escrito de duas formas diferentes ao longo do desenvolvimento. As telas de Mapa, Registrar Problema e Notificações usavam altura mínima de 70 pixels, posição fixa no topo da página e sombra inferior. As telas de Detalhes e Configurações usavam altura fixa de 62 pixels, sem posição fixa e com borda inferior.

Optou-se pela primeira versão, por dois motivos. O menu não cabe em uma única linha em telas de aproximadamente 390 pixels, e a altura mínima permite que o cabeçalho cresça para acomodar a segunda linha, enquanto a altura fixa cortaria o conteúdo. Além disso, a posição fixa mantém a navegação acessível durante a rolagem da página.

Foram corrigidas também divergências menores, decorrentes de erros de digitação: duas variações do azul do logotipo (`#2563eb` e `#2463eb`), tamanhos de fonte e raios de borda ligeiramente diferentes, e a ausência da cor do texto no ícone do logotipo em duas telas.

## Estrutura final

    style.css             regras comuns às cinco telas
    index.css             tela de Mapa
    criar.css             tela de Registrar Problema
    detalhes.css          tela de Detalhes do Problema
    notificacoes.css      tela de Notificações
    configuracoes.css     tela de Configurações

Cada arquivo HTML carrega dois arquivos de estilo, nesta ordem:

    <link rel="stylesheet" href="style.css">
    <link rel="stylesheet" href="index.css">

A ordem é relevante. O navegador lê os arquivos na sequência em que são declarados e forma uma única lista de regras. Quando duas regras de mesma especificidade definem a mesma propriedade, prevalece a última lida. Por isso o arquivo específico da tela é carregado depois do arquivo compartilhado, podendo ajustar pontualmente algo definido nele.

## Resultado

Os cinco arquivos HTML somavam 4.198 linhas e passaram a somar 1.802, uma redução de 57 por cento, restando neles apenas a estrutura da página. O CSS ocupa agora 1.314 linhas distribuídas em seis arquivos.

Além de eliminar a duplicação, a organização permite que o navegador reaproveite o `style.css` armazenado em cache ao navegar entre as telas, uma vez que o arquivo é o mesmo para todas.
