import { expect, Page } from "@playwright/test";

export class HomePage {
  constructor(private page: Page) {}

  async openWebsite() {
  await this.page.goto("https://automationexercise.com/");
    
  }

  async clickLogin() {
    await this.page.locator("a[href='/login']").click();
  }

  async clickLogout() {
    await this.page.locator("a[href='/logout']").click();
  }

  async deleteAccount() {
    await this.page.locator("[data-qa='continue-button']").click();

    await this.page.locator("a[href='/delete_account']").click();
  }
}
