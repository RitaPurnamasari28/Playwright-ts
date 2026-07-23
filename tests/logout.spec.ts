import { test,expect } from '@playwright/test';

import { HomePage } from '../pages/HomePage';

import { LoginPage } from '../pages/LoginPage';

import { reportSuccess } from '../utils/reportHelper';

test("Logout",async({page})=>{

const home=new HomePage(page);

const login=new LoginPage(page);

await home.openWebsite();

await home.clickLogin();

await login.login("testingninura@gmail.com","5465765Qwert/-");

await home.clickLogout();

await expect(page.locator("text= Signup / Login")).toBeVisible();

await reportSuccess(
    page,
    "Logout",
    "Success logout",
    "Logout Sucessfully"
);

});
