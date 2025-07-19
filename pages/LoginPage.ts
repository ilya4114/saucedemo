import { Page, expect } from '@playwright/test';

export class LoginPage {
  constructor(private page: Page) {} // Получаем объект страницы от Playwright

  // Открываем страницу логина
  async open() {
    await this.page.goto('https://www.saucedemo.com/');
  }

  // Вводим логин и пароль и нажимаем кнопку входа
  async login(username: string, password: string) {
    await this.page.fill('[data-test="username"]', username);
    await this.page.fill('[data-test="password"]', password);
    await this.page.click('[data-test="login-button"]');
  }

  // Проверяем успешный вход (URL должен содержать /inventory)
  async checkSuccess() {
    await expect(this.page).toHaveURL(/inventory/);
  }

  // Проверяем, что появилась ошибка входа
  async checkError() {
    await expect(this.page.locator('[data-test="error"]')).toBeVisible();
  }
}
