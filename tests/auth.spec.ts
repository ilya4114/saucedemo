import { expect } from '@playwright/test';
import { test } from './fixtures';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';

test.describe('🧪 Проверка авторизации пользователей', () => {
  test('Авторизация: standard_user', async ({ standardUserPage }) => {
    const inventoryPage = new InventoryPage(standardUserPage);
    await inventoryPage.checkPageIsOpened();
    await inventoryPage.checkInventoryItemsExist();
  });

  test('Авторизация: locked_out_user (ожидаем ошибку)', async ({ lockedOutUserPage }) => {
    const loginPage = new LoginPage(lockedOutUserPage);
    await loginPage.checkErrorMessage('Sorry');
  });

  test('Авторизация: problem_user', async ({ problemUserPage }) => {
    const inventoryPage = new InventoryPage(problemUserPage);
    await inventoryPage.checkPageIsOpened();
    await inventoryPage.checkInventoryItemsExist();
  });

  test('Авторизация: performance_glitch_user', async ({ glitchUserPage }) => {
    const inventoryPage = new InventoryPage(glitchUserPage);
    await inventoryPage.checkPageIsOpened();
    await inventoryPage.checkInventoryItemsExist();
  });

  test('Авторизация: error_user', async ({ errorUserPage }) => {
    const inventoryPage = new InventoryPage(errorUserPage);
    await inventoryPage.checkPageIsOpened();
    await inventoryPage.checkInventoryItemsExist();
  });

  test('Авторизация: visual_user', async ({ visualUserPage }) => {
    const inventoryPage = new InventoryPage(visualUserPage);
    await inventoryPage.checkPageIsOpened();
    await inventoryPage.checkInventoryItemsExist();
  });
});
