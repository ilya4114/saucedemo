import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';

const accounts = [
  { username: 'standard_user', password: 'secret_sauce', expectError: false },
  { username: 'locked_out_user', password: 'secret_sauce', expectError: true },
  { username: 'problem_user', password: 'secret_sauce', expectError: false },
  { username: 'performance_glitch_user', password: 'secret_sauce', expectError: false },
  { username: 'error_user', password: 'secret_sauce', expectError: false },
  { username: 'visual_user', password: 'secret_sauce', expectError: false },
];

test.describe('🧪 Проверка авторизации пользователей', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
  });

  for (const account of accounts) {
    test(`Авторизация: ${account.username}`, async ({ page }) => {
      const loginPage = new LoginPage(page);
      await loginPage.login(account.username, account.password);

      if (account.expectError) {
        await loginPage.checkErrorMessage('Sorry');
      } else {
        const inventoryPage = new InventoryPage(page);
        await inventoryPage.checkPageIsOpened();
        await inventoryPage.checkInventoryItemsExist();
      }
    });
  }
});