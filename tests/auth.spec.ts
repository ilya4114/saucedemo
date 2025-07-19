import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

const accounts = [
  { username: 'standard_user', password: 'secret_sauce', expectError: false },
  { username: 'locked_out_user', password: 'secret_sauce', expectError: true },
  { username: 'problem_user', password: 'secret_sauce', expectError: false },
  { username: 'performance_glitch_user', password: 'secret_sauce', expectError: false },
  { username: 'error_user', password: 'secret_sauce', expectError: false },
  { username: 'visual_user', password: 'secret_sauce', expectError: false },
];

test.describe('🧪 Проверка авторизации пользователей на saucedemo.com', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
  });

  for (const account of accounts) {
    test(`Авторизация: ${account.username}`, async ({ page }) => {
      const loginPage = new LoginPage(page);

      await loginPage.login(account.username, account.password);

      if (account.expectError) {
        // Проверка ошибки при неправильной авторизации
        await loginPage.checkErrorMessage('Sorry');
      } else {
        // Проверка успешной авторизации
        await expect(page).toHaveURL(/inventory/);

        // Проверка, что на странице есть товары
        const items = await page.locator('.inventory_item').count();
        expect(items).toBeGreaterThan(0);
      }
    });
  }
});
