import { test,expect } from '@playwright/test';

import { HomePage } from '../pages/HomePage';

import { LoginPage } from '../pages/LoginPage';

import { reportSuccess } from '../utils/reportHelper';

test("Login",async({page})=>{

const home=new HomePage(page);

const login=new LoginPage(page);

await home.openWebsite();

await home.clickLogin();

await login.login("testingninura@gmail.com","5465765Qwert/-");

//await expect(page).toHaveURL(/.*login/);

//await expect(page).toHaveTitle(/Automation Exercise/);

await expect(page.locator("text=Logged in as")).toBeVisible();

await reportSuccess(
    page,
    "Sign In",
    "Account created successfully",
    "Account Created! successfully displayed"
);

});