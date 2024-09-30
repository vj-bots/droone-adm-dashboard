# Droone Dashboard

Este projeto é um dashboard administrativo para a Droone API, construído com Next.js.

## Estrutura do Projeto

O projeto consiste em duas páginas principais:

1. Página Inicial (`page.tsx`)
2. Página de Detalhes da Tabela (`table.tsx`)

## Funcionamento

### Página Inicial (`page.tsx`)

Esta é a landing page do dashboard. Suas principais funcionalidades são:

1. **Carregamento de Dados**:
   - Tenta carregar dados do cache (cookies e localStorage) primeiro.
   - Se não houver dados em cache ou se estiverem expirados, faz uma chamada à API.
   - Utiliza um tempo de expiração de 5 minutos para os dados em cache.

2. **Exibição de Tabelas**:
   - Mostra uma lista de todas as tabelas disponíveis.
   - Cada nome de tabela é um link clicável que leva à página de detalhes da tabela.

3. **Tratamento de Erros**:
   - Exibe uma mensagem de erro se não conseguir se conectar ao servidor.

4. **Indicador de Carregamento**:
   - Mostra um loader animado enquanto os dados estão sendo carregados.

5. **Persistência de Dados**:
   - Salva os dados recebidos no localStorage e em cookies para acesso rápido futuro.

### Página de Detalhes da Tabela (`table.tsx`)

Esta página exibe os detalhes de uma tabela específica. Suas principais funcionalidades são:

1. **Carregamento Dinâmico**:
   - Obtém o nome da tabela da URL.
   - Faz uma chamada à API para buscar os dados específicos da tabela.

2. **Exibição de Dados**:
   - Renderiza os dados da tabela em formato tabular.
   - Adapta-se dinamicamente à estrutura dos dados recebidos.

3. **Tratamento de Estados**:
   - Mostra um loader enquanto os dados estão sendo carregados.
   - Exibe uma mensagem de erro se houver falha no carregamento.

4. **Navegação**:
   - Fornece um botão para voltar à página inicial.

## Lógica de Funcionamento

1. **Gerenciamento de Estado**:
   - Usa React Hooks (`useState`, `useEffect`) para gerenciar o estado da aplicação.

2. **Chamadas à API**:
   - Utiliza Axios para fazer requisições HTTP à API da Droone.

3. **Roteamento**:
   - Aproveita o sistema de roteamento do Next.js para navegação entre páginas.

4. **Otimização de Performance**:
   - Implementa um sistema de cache para reduzir chamadas desnecessárias à API.

5. **Responsividade**:
   - Utiliza Tailwind CSS para um design responsivo e adaptável.

6. **Experiência do Usuário**:
   - Implementa feedbacks visuais (loaders, mensagens de erro) para melhorar a UX.

## Tecnologias Utilizadas

- Next.js
- React
- TypeScript
- Axios
- Tailwind CSS
- js-cookie (para gerenciamento de cookies)

## Próximos Passos

- Implementar autenticação de usuários.
- Adicionar mais funcionalidades de gerenciamento de dados.
- Melhorar a estilização e o design do dashboard.
- Implementar testes automatizados.