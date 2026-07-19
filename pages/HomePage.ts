import { Page } from '@playwright/test';

export class HomePage{

constructor(private page:Page){}

async openWebsite(){

await this.page.goto("https://automationexercise.com/");

}

async clickLogin(){

await this.page.locator("a[href='/login']").click();

}

async clickLogout(){

await this.page.locator("[href='/logout']").click();

}

async deleteAccount(){

await this.page.locator("[href='/delete_account']").click();

}

}