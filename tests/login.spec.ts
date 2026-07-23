import { test,expect } from '@playwright/test';

import { HomePage } from '../pages/HomePage';

import { LoginPage } from '../pages/LoginPage';

import { reportSuccess } from '../utils/reportHelper';

test("Login with valid credential",async({page})=>{

const home=new HomePage(page);

const login=new LoginPage(page);

await home.openWebsite();

await home.clickLogin();

await login.login("testingninura@gmail.com","5465765Qwert/-");

await expect(page.locator("text=Logged in as")).toBeVisible();

await reportSuccess(
    page,
    "Login with valid credential",
    "Account created successfully",
    "Account Created! successfully displayed"
);

});

test("Login with unregistered email",async({page})=>{

const home=new HomePage(page);

const login=new LoginPage(page);

await home.openWebsite();

await home.clickLogin();

await login.login("asdqwe34@gmail.com","5465765Qwert/-");

await expect(page.locator("text=Your email or password is incorrect!")).toBeVisible();

await reportSuccess(
    page,
    "Login with unregitered email",
    "Alert Your email or password is incorrect! displayed",
    "Alert Your email or password is incorrect! displayed"
);

});

test("Login with wrong password",async({page})=>{

const home=new HomePage(page);

const login=new LoginPage(page);

await home.openWebsite();

await home.clickLogin();

await login.login("testingninura@gmail.com","12345678");

await expect(page.locator("text=Your email or password is incorrect!")).toBeVisible();

await reportSuccess(
    page,
    "Login with wrong password",
    "Alert Your email or password is incorrect! displayed",
    "Alert Your email or password is incorrect! displayed"
);

});

test("Login with invalid email",async({page})=>{

const home=new HomePage(page);

const login=new LoginPage(page);

await home.openWebsite();

await home.clickLogin();

await login.login("testingninura","5465765Qwert/-");

 const email = page.locator("[data-qa='login-email']");

  const validationMessage = await email.evaluate(
    (el: HTMLInputElement) => el.validationMessage
  );

  expect(validationMessage).toContain("Please include an '@'");

await reportSuccess(
    page,
    "Login with invalid email",
    "Alert Please include an @ displayed",
    "Alert Please include an @ displayed"
);

});

test("Login without input email and password",async({page})=>{

const home=new HomePage(page);

const login=new LoginPage(page);

await home.openWebsite();

await home.clickLogin();

await page.locator("[data-qa='login-button']").click();

 const loginEmail = page.locator("[data-qa='login-email']");

  const message = await loginEmail.evaluate((el: HTMLInputElement) => {
    return el.validationMessage;
  });

  expect(message).toBe('Please fill out this field.');

await reportSuccess(
    page,
    "Login without input email and password",
    "Message Please fill out this field. displayed",
    "Message Please fill out this field. displayed"
);

});
