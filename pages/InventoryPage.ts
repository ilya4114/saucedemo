import { Page, expect } from '@playwright/test';

export class InventoryPage {
  constructor(private page: Page) {}

  // Проверка, что пользователь находится на странице /inventory
  async checkPageIsOpened() {
    await expect(this.page).toHaveURL(/inventory/);
  }

  // Проверка, что на странице есть хотя бы 1 товар
  async checkInventoryItemsExist() {
    const items = await this.page.locator('.inventory_item').count();
    expect(items).toBeGreaterThan(0);
  }
}