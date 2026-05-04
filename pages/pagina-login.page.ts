import { type Locator, type Page } from '@playwright/test';

/**
 * Page Object da tela de login do Saucedemo.
 */
export class PaginaLogin {
  readonly pagina: Page;
  readonly campoUsuario: Locator;
  readonly campoSenha: Locator;
  readonly botaoEntrar: Locator;
  readonly mensagemErro: Locator;

  constructor(pagina: Page) {
    this.pagina = pagina;
    this.campoUsuario = pagina.locator('[data-test="username"]');
    this.campoSenha = pagina.locator('[data-test="password"]');
    this.botaoEntrar = pagina.locator('[data-test="login-button"]');
    this.mensagemErro = pagina.locator('[data-test="error"]');
  }

  async abrir(): Promise<void> {
    await this.pagina.goto('/');
  }

  async preencherCredenciais(usuario: string, senha: string): Promise<void> {
    await this.campoUsuario.fill(usuario);
    await this.campoSenha.fill(senha);
  }

  async clicarEntrar(): Promise<void> {
    await this.botaoEntrar.click();
  }

  async realizarLogin(usuario: string, senha: string): Promise<void> {
    await this.preencherCredenciais(usuario, senha);
    await this.clicarEntrar();
  }
}
