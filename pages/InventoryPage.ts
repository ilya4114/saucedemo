import { expect, Page } from '@playwright/test';

export class InventoryPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // Проверка, что открыта страница с товарами
  async checkPageIsOpened() {
    await expect(this.page).toHaveURL(/inventory/);
  }

  // Проверка, что есть хотя бы один товар на странице
  async checkInventoryItemsExist() {
    const itemsCount = await this.page.locator('.inventory_item').count();
    expect(itemsCount).toBeGreaterThan(0);
  }

  // Добавить рюкзак
  async addBackpackToCart() {
    await this.page.click('[data-test="add-to-cart-sauce-labs-backpack"]');
  }

  // Добавить вело-свет
  async addBikeLightToCart() {
    await this.page.click('[data-test="add-to-cart-sauce-labs-bike-light"]');
  }

  // Добавить футболку
  async addTShirtToCart() {
    await this.page.click('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]');
  }
}
