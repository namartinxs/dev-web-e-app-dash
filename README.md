# Radar de Repositórios

Dashboard web que consome a API pública do GitHub para explorar o perfil e os repositórios de
qualquer usuário, com uma coleção pessoal de repositórios para estudar (CRUD completo salvo no
navegador).

Trabalho final da disciplina de Desenvolvimento Web e App.

## Tema e opção escolhida

**Tema livre — Opção B.** A API do GitHub é pública, sem necessidade de chave de acesso e com CORS
liberado, mas só permite leitura (GET). Por isso:

- Os dados da API (perfil do usuário e lista de repositórios) alimentam o dashboard, os indicadores,
  os gráficos e a tabela de repositórios.
- O CRUD completo (criar, listar, atualizar, excluir) acontece numa **coleção pessoal de
  repositórios** salva em `localStorage`: o usuário escolhe repositórios na tabela e os adiciona à
  coleção com status (quero estudar / estudando / concluído), prioridade e uma anotação sobre o que
  quer aprender ali.

## Onde está o CRUD no código

As 4 operações vivem em `js/servicos/ColecaoService.js` e são acionadas pela tela
`js/ui/ColecaoUI.js`. Todas persistem em `localStorage` via `Armazenamento` e, depois de rodar,
atualizam a lista e os indicadores do painel sem recarregar a página.

| Operação | Método | Onde é chamado |
|---|---|---|
| Create | `ColecaoService.criar(d)` | `ColecaoUI.salvar()`, ao adicionar um repositório escolhido na tabela |
| Read | `ColecaoService.listar()` | `ColecaoUI.render()` (com busca e filtro por status) e `PainelUI` |
| Update | `ColecaoService.atualizar(id, d)` e `ColecaoService.mudarStatus(id, status)` | `ColecaoUI.salvar()` em modo edição, e o `<select>` de status da listagem |
| Delete | `ColecaoService.excluir(id)` | botão de lixeira em `ColecaoUI`, após confirmação com `confirm(...)` |

## API usada

- **GitHub REST API** — [documentação oficial](https://docs.github.com/en/rest)
- Endpoints usados: `GET /users/{login}` e `GET /users/{login}/repos`
- Não exige autenticação para esses endpoints; o limite é de 60 requisições por hora por IP.

## Como rodar o projeto

1. Baixe/clone a pasta do projeto.
2. Abra o arquivo `index.html` diretamente no navegador, ou use a extensão **Live Server** do
   VS Code (botão direito em `index.html` → "Open with Live Server") para evitar restrições de
   CORS em alguns navegadores.
3. Digite um usuário do GitHub existente (ex: `torvalds`, `octocat`) no campo de busca e aperte
   Enter ou clique na lupa.
4. Na tabela de repositórios, clique em "Adicionar à coleção" para salvar um repositório, escolher
   status, prioridade e escrever uma anotação.
5. Na seção "Minha coleção", edite, mude o status ou exclua itens salvos — tudo persiste no
   `localStorage` do navegador.

## Quem fez o quê

O trabalho foi feito em dupla, em par (pair programming), com as duas integrantes participando
juntas de toda a construção: estrutura HTML/CSS, modelagem das classes, camada de API, serviços,
telas e testes.

- Amanda
- Nathalia Martins

## Recursos usados fora do conteúdo das aulas

- **Fonte do Google Fonts (Inter)**, carregada via `@import` no CSS — usada apenas como fonte
  tipográfica, não substitui nada do CSS escrito pelo grupo.
- **Ícones em SVG embutidos como `data:` URI** nas variáveis CSS (`--i-casa`, `--i-estrela` etc.),
  aplicados com `mask`/`-webkit-mask` para herdar a cor do texto (`currentColor`). É uma técnica de
  CSS puro (sem biblioteca de ícones), usada só para deixar o menu e os indicadores mais legíveis.
- **`Intl.NumberFormat` e `Intl.DateTimeFormat`** (API nativa do JavaScript, não visto em aula) para
  formatar números e datas no padrão `pt-BR` em vez de montar essa formatação na mão.
