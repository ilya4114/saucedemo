import { Page, expect } from '@playwright/test';

export class LoginPage {
  constructor(private page: Page) {}

  // Метод логина
  async login(username: string, password: string) {
    await this.page.fill('[data-test="username"]', username);
    await this.page.fill('[data-test="password"]', password);
    await this.page.click('[data-test="login-button"]');
  }

  // Метод проверки ошибки при неудачной авторизации
  async checkErrorMessage(expectedText: string) {
    const error = this.page.locator('[data-test="error"]');
    await expect(error).toBeVisible();
    await expect(error).toContainText(expectedText);
  }
}
