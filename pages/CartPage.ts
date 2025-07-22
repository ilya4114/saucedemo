import { expect, Locator, Page } from '@playwright/test';

export class CartPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async openCart() {
    await this.page.click('.shopping_cart_link');
    await expect(this.page).toHaveURL(/cart/);
  }

  async checkItemsCount(expectedCount: number) {
    await expect(this.page.locator('.cart_item')).toHaveCount(expectedCount);
  }

  async removeBikeLight() {
    await this.page.click('[data-test="remove-sauce-labs-bike-light"]');
  }

  async checkCartBadgeCount(expected: number) {
    await expect(this.page.locator('.shopping_cart_badge')).toHaveText(`${expected}`);
  }
}
