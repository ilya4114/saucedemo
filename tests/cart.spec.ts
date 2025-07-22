import { expect } from '@playwright/test';
import { test } from './fixtures';
import { CartPage } from '../pages/CartPage';
import { InventoryPage } from '../pages/InventoryPage';

test.describe('🛒 Тесты корзины', () => {

  test('Добавление одного товара в корзину', async ({ standardUserPage }) => {
    const page = standardUserPage;
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);

    await inventoryPage.addBackpackToCart();
    await cartPage.openCart();
    await cartPage.checkItemsCount(1);
  });

  test('Добавление нескольких товаров в корзину', async ({ standardUserPage }) => {
    const page = standardUserPage;
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);

    await inventoryPage.addBackpackToCart();
    await inventoryPage.addBikeLightToCart();
    await inventoryPage.addTShirtToCart();

    await cartPage.openCart();
    await cartPage.checkItemsCount(3);
  });

  test('Удаление одного товара из корзины', async ({ standardUserPage }) => {
    const page = standardUserPage;
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);

    await inventoryPage.addBackpackToCart();
    await inventoryPage.addBikeLightToCart();

    await cartPage.openCart();
    await cartPage.removeBikeLight();
    await cartPage.checkItemsCount(1);
  });

  test('Пустая корзина при старте', async ({ standardUserPage }) => {
    const cartPage = new CartPage(standardUserPage);

    await cartPage.openCart();
    await cartPage.checkItemsCount(0);
  });

  test('Счётчик товаров в иконке корзины', async ({ standardUserPage }) => {
    const page = standardUserPage;
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);

    await inventoryPage.addBackpackToCart();
    await inventoryPage.addBikeLightToCart();

    await cartPage.checkCartBadgeCount(2);
  });

});
