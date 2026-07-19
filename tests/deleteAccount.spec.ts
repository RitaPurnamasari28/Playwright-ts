import { test,expect } from '@playwright/test';

import { HomePage } from '../pages/HomePage';

import { LoginPage } from '../pages/LoginPage';

import { reportSuccess } from '../utils/reportHelper';

test("Logout",async({page})=>{

const home=new HomePage(page);

const login=new LoginPage(page);

await home.clickLogin();

await login.login("testingninura@gmail.com","5465765Qwert/-");

await home.deleteAccount();

await expect(page.locator("text=Account Deleted!")).toBeVisible();

await reportSuccess(
    page,
    "Sign In",
    "Account deleted successfully",
    "Account Deleted! message successfully displayed"
);

});