import { test, expect } from "@playwright/test";

import { HomePage } from "../pages/HomePage";

import { LoginPage } from "../pages/LoginPage";

import { ProductsPage } from "../pages/ProductsPage";

import { reportSuccess } from "../utils/reportHelper";

test("Checkout flow", async ({ page }) => {
  const home = new HomePage(page);

  const product = new ProductsPage(page);

  await home.openWebsite();

  const login = new LoginPage(page);

  await home.clickLogin();

  await login.login("testingninura@gmail.com", "5465765Qwert/-");

  await page.locator("a[href='/products']").click();

  await product.search("Blue Top");

  //await expect(page.locator("text=Blue Top")).toBeVisible();

  await reportSuccess(
    page,
    "Sign In",
    "Success search product",
    "Success search for blue top",
  );

  await product.checkoutProduct(
    "dont sent to wrong address",
    "Alexis Loh",
    "4324343",
    "333333",
    "12",
    "2030",
  );

  await expect(page.locator("text=Order Placed!")).toBeVisible();

  await reportSuccess(
    page,
    "Sign In",
    "Success add item to cart and checkout",
    "Add product to cart and checkout product successfully",
  );
});
