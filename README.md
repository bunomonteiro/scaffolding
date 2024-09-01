# Estrutura

Cada área/diretório do projeto possui responsabilidades específicas para organizar e manter o código de forma eficiente e modular. A seguit está uma _visão geral_ das responsabilidades de cada um

## Assets

Diretório dedicado aos arquivos estáticos, como imagens, fontes, ícones, estilos CSS (separados de componentes), e outros recursos que não necessariamente serão processados pelo JavaScript.

> **Exemplos:**
>
> - Imagens usadas em toda a aplicação (logo.png).
> - Arquivos CSS globais (styles.css).
> - Arquivos de fontes customizadas (custom-font.woff).

## Components

Diretório dedicado aos componentes reutilizáveis e modulares, que encapsulam partes da interface de usuário.
Pode incluir componentes básicos como botões (`Button.vue`) ou componentes mais complexos como um cabeçalho de navegação (`Navbar.vue`).

> **Exemplos:**
>
> - Componentes de UI reutilizáveis (`Button.vue`, `Card.vue`).
> - Componentes específicos de páginas (`public/home/Header.vue`, `public/home/Sidebar.vue`).

## Composables

Diretório dedicado às funções reutilizáveis que encapsulam a lógica de composição, permitindo o compartilhamento de lógica entre diferentes componentes. Utiliza a Composition API (setup()) para criar hooks personalizados.

É comum haver uma confusão com as Stores e até mesmo com plugins, porém Composbles são para encapsular e reutilizar lógica relacionada à interface de usuário ou à manipulação de estado dentro de componentes, de forma descentralizada e orientada a funções.
Usamos quando temos um pedaço de lógica (como manipulação de formulários, side effects, manipulação de estados locais) que precisa ser reutilizado em múltiplos componentes, mas não necessariamente precisa ser global ou centralizado.

> **Exemplos:**
>
> - Funções como `useFetch`, `useFormValidation`.
> - Manipulação de estados reativos ou side effects comuns entre componentes (`useDOMClasses`, `useIntervals`).

## Directives

Diretório dedicado às diretivas customizadas que estendem a funcionalidade das diretivas nativas do Vue (`v-model`, `v-if`).

> **Exemplos:**
>
> - Diretiva para adicionar a funcionalidade de cópia pra a memória do conteúdo do elemento (`v-clipboard`).
> - Diretiva para focar automaticamente em um input (`v-focus`).
> - Diretiva para mudar o fundo de um elemento com base em uma condição (`v-bg-color`).

## Plugins

Diretório dedicado aos plugins personalizados que estendem a funcionalidade global da aplicação.
Permite adicionar propriedades ou métodos globais ao Vue, além de configurar e inicializar bibliotecas de terceiros.

> **Exemplos:**
>
> - Plugin de funções de manipulação de data (dayjs.js).
> - Integração com APIs externas (http-client.js).
> - Configuração de bibliotecas de componentes (primevue.js).

## Router

Diretório dedicado a configuração das rotas da aplicação, mapeando caminhos de URL para componentes específicos.
Centraliza a lógica de navegação da aplicação.

## Stores

Diretório dedicado ao estado global e a lógica de gestão de estado da aplicação, geralmente utilizando Pinia (ou Vuex em projetos legados).
Centraliza a lógica de estado que precisa ser compartilhada entre múltiplos componentes.

> **Exemplos:**
>
> - Repositório para dados gerais do aplicativo (app-store.js).
> - Repositório para dados do usuário (auth-store.js).

## Views

Diretório dedicado às páginas, que geralmente representam diferentes rotas da aplicação e que frequentemente utilizam outros componentes e composables.
Essas páginas são frequentemente mapeadas para rotas específicas no router.

> **Exemplos:**
>
> - Página de login (`auth/LoginView.vue`).
> - Landing Page (`public/HomeView.vue`).
> - Página de erro (`shared/ErrorView.vue`).
