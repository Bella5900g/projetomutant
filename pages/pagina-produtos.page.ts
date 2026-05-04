import { type Locator, type Page } from '@playwright/test';

/**
 * Page Object da listagem de produtos (inventário) após login.
 */
export class PaginaProdutos {
  readonly pagina: Page;
  readonly tituloSecao: Locator;
  readonly containerInventario: Locator;
  readonly linkCarrinho: Locator;
  readonly botaoMenu: Locator;
  readonly linkSair: Locator;

  constructor(pagina: Page) {
    this.pagina = pagina;
    this.tituloSecao = pagina.locator('[data-test="title"]');
    this.containerInventario = pagina.locator('[data-test="inventory-container"]');
    this.linkCarrinho = pagina.locator('[data-test="shopping-cart-link"]');
    this.botaoMenu = pagina.locator('#react-burger-menu-btn');
    this.linkSair = pagina.locator('[data-test="logout-sidebar-link"]');
  }

  botaoAdicionarAoCarrinho(idProdutoDataTest: string): Locator {
    return this.pagina.locator(`[data-test="add-to-cart-${idProdutoDataTest}"]`);
  }

  async adicionarProdutoAoCarrinhoPorId(idProdutoDataTest: string): Promise<void> {
    await this.botaoAdicionarAoCarrinho(idProdutoDataTest).click();
  }

  async abrirCarrinho(): Promise<void> {
    await this.linkCarrinho.click();
  }

  async realizarLogout(): Promise<void> {
    await this.botaoMenu.click();
    await this.linkSair.waitFor({ state: 'visible' });
    await this.linkSair.click();
  }
}
