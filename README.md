# Automação E2E — Saucedemo (Playwright)

Projeto de testes end-to-end para [Saucedemo](https://www.saucedemo.com/), cobrindo login (sucesso e falha), carrinho e logout.

## Conformidade com o desafio


| Solicitação                                                                              | Atendimento                                                                                          |
| ---------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| Cenário 1 — login `standard_user` / `secret_sauce`, validar sucesso e página de produtos | `tests/saucedemo.spec.ts`: URL de inventário, título `Products`, container de inventário visível     |
| Cenário 2 — credenciais inválidas e mensagem de erro                                     | Mesmo arquivo: login inválido + `data-test="error"` com trecho esperado em `data/mensagens.ts`       |
| Cenário 3 — login, adicionar produto, carrinho, item listado                             | Login, mochila (`data/produtos.ts`), carrinho, nome do item na listagem                              |
| Cenário 4 — logout e retorno ao login                                                    | Menu → sair; URL raiz do site + campos de login visíveis                                             |
| Linguagem (Python ou outra) + Playwright ou Robot                                        | TypeScript + **Playwright**                                                                          |
| README: instalar, executar, estrutura                                                    | Seções abaixo                                                                                        |
| Casos automatizados funcionando                                                          | Quatro testes na suíte                                                                               |
| Evidências: relatório, prints ou vídeo                                                   | Relatório HTML + screenshot ao fim de cada teste + vídeo `.webm` (local; ver `playwright.config.ts`) |


## Requisitos

- [Node.js](https://nodejs.org/) LTS (18 ou superior recomendado)
- npm

## Instalação das dependências

Na raiz do repositório:

```bash
npm install
```

Instalar os navegadores do Playwright (Chromium é o usado na configuração):

```bash
npx playwright install chromium
```

## Como executar os testes

Executar toda a suíte:

```bash
npm test
```

Modo interface gráfica (depuração):

```bash
npm run test:ui
```

Com navegador visível:

```bash
npm run test:headed
```

Após uma execução, abrir o relatório HTML gerado:

```bash
npm run relatorio
```

O relatório fica em `playwright-report/` e, ao abrir um teste, mostra também **screenshots** e **vídeo** anexados (quando gerados).

## Estrutura do projeto


| Pasta / arquivo        | Descrição                                                                                  |
| ---------------------- | ------------------------------------------------------------------------------------------ |
| `tests/`               | Especificações Playwright (`*.spec.ts`)                                                    |
| `pages/`               | Page Objects (`*.page.ts`) — encapsulam seletores e ações por tela                         |
| `fixtures/`            | Extensão do `test` base com fixtures de Page Objects                                       |
| `data/`                | Constantes em TypeScript, exemplo em `data/mocks/*.json`                                   |
| `playwright.config.ts` | Configuração global (base URL, relatório HTML, prints e vídeo por teste em execução local) |


## Casos automatizados

1. **Login com sucesso** — `standard_user` / `secret_sauce`; valida URL de inventário e área de produtos.
2. **Login inválido** — credenciais incorretas; valida mensagem de erro.
3. **Carrinho** — login, adiciona Sauce Labs Backpack, abre o carrinho e valida o item.
4. **Logout** — login, menu lateral, sair; valida retorno à tela de login.

## Evidências de execução

- **Relatório HTML:** gerado em `playwright-report/` após `npm test`; abra com `npm run relatorio`.
- **Prints (screenshot):** em execução **local** (sem variável `CI`), é gerada uma captura ao **final de cada teste** (passou ou falhou). Os arquivos ficam em `test-results/` e aparecem no relatório ao expandir o teste.
- **Vídeo:** na mesma condição local, cada teste gera um `**.webm`** em resolução 960×540 (duração ≈ tempo do cenário). Em **CI** (`CI` definido), mantêm-se apenas screenshot/vídeo em **falha**, para não acumular arquivos grandes no pipeline.

**Responsável pelo projeto:** Isabella Vieira Barbosa.
