import { Page, Locator, expect } from '@playwright/test';

export class CartPage {
  readonly page: Page;
  readonly cartLink: Locator;
  readonly cartItems: Locator;
  readonly checkoutButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartLink = page.locator('.shopping_cart_link');
    this.cartItems = page.locator('.cart_item');
    this.checkoutButton = page.locator('[data-test="checkout"]');
  }

  // Переход в корзину (клик по иконке)
  async openCart() {
    await this.cartLink.click();
    await expect(this.page).toHaveURL(/cart/);
  }

  // Проверка, что корзина не пустая
  async checkItemsCount(expectedCount: number) {
    await expect(this.cartItems).toHaveCount(expectedCount);
  }

  // Клик по кнопке Checkout
  async clickCheckout() {
    await this.checkoutButton.click();
    await expect(this.page).toHaveURL(/checkout-step-one/);
  }
}
