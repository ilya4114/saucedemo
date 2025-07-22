import { Page, expect } from '@playwright/test';

export class InventoryPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // Проверка, что открыта страница с товарами
  async checkPageIsOpened() {
    await expect(this.page).toHaveURL(/inventory/);
  }

  // Проверка, что на странице есть хотя бы один товар
  async checkInventoryItemsExist() {
    const items = this.page.locator('.inventory_item');
    const count = await items.count();
    expect(count).toBeGreaterThan(0); // ✅ это правильно
  }
}
