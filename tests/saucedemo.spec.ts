import { test, expect } from '../fixtures/teste-base';
import { USUARIO_PADRAO, SENHA_VALIDA, USUARIO_INVALIDO, SENHA_INVALIDA } from '../data/credenciais';
import { TRECHO_ERRO_LOGIN_INVALIDO } from '../data/mensagens';
import { ID_PRODUTO_MOCHILA, NOME_EXIBIDO_MOCHILA } from '../data/produtos';
import { URL_BASE, CAMINHO_INVENTARIO } from '../data/urls';

test.describe('Saucedemo — fluxos de login, carrinho e logout', () => {
  test('Cenário 1 — login com sucesso e exibição da página de produtos', async ({
    pagina,
    paginaLogin,
    paginaProdutos,
  }) => {
    await paginaLogin.abrir();
    await paginaLogin.realizarLogin(USUARIO_PADRAO, SENHA_VALIDA);

    await expect(pagina).toHaveURL(`${URL_BASE}${CAMINHO_INVENTARIO}`);
    await expect(paginaProdutos.tituloSecao).toHaveText('Products');
    await expect(paginaProdutos.containerInventario).toBeVisible();
  });

  test('Cenário 2 — login inválido exibe mensagem de erro', async ({ paginaLogin }) => {
    await paginaLogin.abrir();
    await paginaLogin.realizarLogin(USUARIO_INVALIDO, SENHA_INVALIDA);

    await expect(paginaLogin.mensagemErro).toBeVisible();
    await expect(paginaLogin.mensagemErro).toContainText(TRECHO_ERRO_LOGIN_INVALIDO);
  });

  test('Cenário 3 — adicionar produto ao carrinho e validar no carrinho', async ({
    pagina,
    paginaLogin,
    paginaProdutos,
    paginaCarrinho,
  }) => {
    await paginaLogin.abrir();
    await paginaLogin.realizarLogin(USUARIO_PADRAO, SENHA_VALIDA);
    await paginaProdutos.adicionarProdutoAoCarrinhoPorId(ID_PRODUTO_MOCHILA);
    await paginaProdutos.abrirCarrinho();

    await expect(pagina).toHaveURL(/cart\.html/);
    await expect(paginaCarrinho.linhaDoItemPorNome(NOME_EXIBIDO_MOCHILA)).toBeVisible();
    await expect(paginaCarrinho.nomeDoItemNaListagem()).toHaveText(NOME_EXIBIDO_MOCHILA);
  });

  test('Cenário 4 — logout retorna à tela de login', async ({ pagina, paginaLogin, paginaProdutos }) => {
    await paginaLogin.abrir();
    await paginaLogin.realizarLogin(USUARIO_PADRAO, SENHA_VALIDA);
    await paginaProdutos.realizarLogout();

    // Após logout o Saucedemo pode redirecionar com ou sem barra final.
    await expect(pagina).toHaveURL(/^https:\/\/www\.saucedemo\.com\/?$/);
    await expect(paginaLogin.botaoEntrar).toBeVisible();
    await expect(paginaLogin.campoUsuario).toBeVisible();
  });
});
