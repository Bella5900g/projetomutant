import { test as base, type Page } from '@playwright/test';
import { PaginaLogin } from '../pages/pagina-login.page';
import { PaginaProdutos } from '../pages/pagina-produtos.page';
import { PaginaCarrinho } from '../pages/pagina-carrinho.page';

/**
 * Fixture estendida com instâncias de Page Objects prontas para uso nos testes.
 * `pagina` é um alias de `page` para manter nomenclatura em português nos .spec.ts.
 */
type PaginasFixtures = {
  pagina: Page;
  paginaLogin: PaginaLogin;
  paginaProdutos: PaginaProdutos;
  paginaCarrinho: PaginaCarrinho;
};

export const test = base.extend<PaginasFixtures>({
  pagina: async ({ page }, usar) => {
    await usar(page);
  },
  paginaLogin: async ({ page }, usar) => {
    await usar(new PaginaLogin(page));
  },
  paginaProdutos: async ({ page }, usar) => {
    await usar(new PaginaProdutos(page));
  },
  paginaCarrinho: async ({ page }, usar) => {
    await usar(new PaginaCarrinho(page));
  },
});

export { expect } from '@playwright/test';
