import {
    test,
    expect,
    BrowserContext,
    Page
} from '@playwright/test';

import { HomePage } from '../pages/HomePage';

import { LoginPage } from '../pages/LoginPage';

import { reportSuccess } from '../utils/reportHelper';

import { SignInPage } from '../pages/SignInPage';

import { ProductsPage } from '../pages/ProductsPage';

let context: BrowserContext;
let page: Page;
let home: HomePage;
let login: LoginPage;
let signIn: SignInPage;
let product: ProductsPage;

test.describe("Automation Exercise E2E", () => {

    test.describe.configure({
        mode: "serial"
    });

test.beforeAll(async ({ browser }) => {

    context = await browser.newContext();

    page = await context.newPage();

    home = new HomePage(page);
    login = new LoginPage(page);
    signIn = new SignInPage(page);
    product = new ProductsPage(page);

});

test("test 1 - Sign In",async()=>{

await home.openWebsite();

await home.clickLogin();

await signIn.signIn("Ninura","testingninura@gmail.com");

await expect(page.locator("text=Enter Account Information")).toBeVisible();

//await expect(page).toHaveURL(/.*login/);

//await expect(page).toHaveTitle(/Automation Exercise/);
//add information page
await signIn.infoPassword("5465765Qwert/-");
await signIn.infoDays("22");
await signIn.infoMonth("5");
await signIn.infoYear("2005");
//await page.waitForTimeout(30000);
await signIn.checkboxAccountInfo();
await signIn.info("Alexis", "Loh", "UCC", "Manggis Street NO. 45", "Papaya street No 90", "one");
await signIn.infoCountry("Singapore");
await signIn.info2("Waterway park", "675656", "6534215");

await expect(page.locator("text=Account Created!")).toBeVisible();

await reportSuccess(
    page,
    "Sign In",
    "Success sign in new user",
    "Account Created! was successfully displayed"
);
});

test("test 2 - Search Product",async()=>{

await page.locator("a[href='/products']").click();

await product.search("Blue Top"); 

//await expect(page.locator("text=Blue Top")).toBeVisible();

await reportSuccess(
    page,
    "Search product",
    "Success search product",
    "Success search for blue top"
);
});

test("test 3 - Add Product to cart",async()=>{

await product.checkoutProduct("dont sent to wrong address", "Alexis Loh", "4324343","333333", "12", "2030" );

await expect(page.locator("text=Order Placed!")).toBeVisible();

await reportSuccess(
    page,
    "Add product to cart",
    "Success add item to cart and checkout",
    "Add product to cart and checkout product successfully"
);
});

test("Test 4 - Logout",async()=>{

await home.clickLogout();

await expect(page.locator("text= Signup / Login")).toBeVisible();

//await takeScreenshot(page,"logout");

//await saveResult("Login","PASS");

await reportSuccess(
    page,
    "Logout",
    "Success logout",
    "Logout Sucessfully"
);

});

test("test 5 - Login",async()=>{

await home.clickLogin();

await login.login("testingninura@gmail.com","5465765Qwert/-");

//await expect(page).toHaveURL(/.*login/);

//await expect(page).toHaveTitle(/Automation Exercise/);

await expect(page.locator("text=Logged in as")).toBeVisible();

await reportSuccess(
    page,
    "Login",
    "Account created successfully",
    "Account Created! successfully displayed"
);

});

test("Test 6 - Delete account",async()=>{

await home.deleteAccount();

await expect(page.locator("text=Account Deleted!")).toBeVisible();

await reportSuccess(
    page,
    "delete account",
    "Account deleted successfully",
    "Account Deleted! message successfully displayed"
);

});

test("Test 7 - Login with deleted email",async()=>{

await home.clickLogin();

await login.login("testingninura@gmail.com","5465765Qwert/-");

//await expect(page).toHaveURL(/.*login/);

//await expect(page).toHaveTitle(/Automation Exercise/);

await expect(page.locator("text=Your email or password is incorrect!")).toBeVisible();

await reportSuccess(
    page,
    "Login with deleted account credential",
    "Alert Your email or password is incorrect! displayed",
    "Alert Your email or password is incorrect! displayed"
);

});

test.afterAll(async () => {

    await context.close();

});
});
