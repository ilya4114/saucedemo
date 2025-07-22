import { expect } from '@playwright/test';
import { test } from './fixtures'; // фикстурный test
import { CartPage } from '../pages/CartPage';

test.describe('🛒 Тесты корзины', () => {

  test('Добавление одного товара в корзину', async ({ standardUserPage }) => {
    const page = standardUserPage;

    // Добавляем 1 товар
    await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');

    const cartPage = new CartPage(page);
    await cartPage.openCart();
    await cartPage.checkItemsCount(1); // проверка: 1 товар в корзине
  });

  test('Добавление нескольких товаров в корзину', async ({ standardUserPage }) => {
    const page = standardUserPage;

    // Добавляем 3 разных товара
    await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');
    await page.click('[data-test="add-to-cart-sauce-labs-bike-light"]');
    await page.click('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]');

    const cartPage = new CartPage(page);
    await cartPage.openCart();
    await cartPage.checkItemsCount(3); // проверка: 3 товара
  });

  test('Удаление одного товара из корзины', async ({ standardUserPage }) => {
    const page = standardUserPage;

    // Добавляем 2 товара
    await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');
    await page.click('[data-test="add-to-cart-sauce-labs-bike-light"]');

    const cartPage = new CartPage(page);
    await cartPage.openCart();

    // Удаляем 1 из них
    await page.click('[data-test="remove-sauce-labs-bike-light"]');
    await cartPage.checkItemsCount(1); // должно остаться 1
  });

  test('Пустая корзина при старте', async ({ standardUserPage }) => {
    const cartPage = new CartPage(standardUserPage);

    await cartPage.openCart();
    await cartPage.checkItemsCount(0); // ничего не добавляли → 0
  });

  test('Счётчик товаров в иконке корзины', async ({ standardUserPage }) => {
    const page = standardUserPage;

    await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');
    await page.click('[data-test="add-to-cart-sauce-labs-bike-light"]');

    // Проверка значка с цифрой на иконке корзины
    await expect(page.locator('.shopping_cart_badge')).toHaveText('2');
  });

});
