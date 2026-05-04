import { type Locator, type Page } from '@playwright/test';

/**
 * Page Object da página do carrinho de compras.
 */
export class PaginaCarrinho {
  readonly pagina: Page;

  constructor(pagina: Page) {
    this.pagina = pagina;
  }

  /**
   * Linha do carrinho que contém o nome do produto (classe oficial do Saucedemo).
   */
  linhaDoItemPorNome(nomeExibido: string): Locator {
    return this.pagina.locator('.cart_item').filter({ hasText: nomeExibido });
  }

  nomeDoItemNaListagem(): Locator {
    return this.pagina.locator('[data-test="inventory-item-name"]');
  }
}
