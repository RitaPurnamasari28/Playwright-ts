import { Page } from '@playwright/test';

export async function takeScreenshot(
    page: Page,
    name: string
): Promise<string> {

    const now = new Date();

    const dateTime =
        now.getFullYear() +
        ("0" + (now.getMonth() + 1)).slice(-2) +
        ("0" + now.getDate()).slice(-2) + "_" +
        ("0" + now.getHours()).slice(-2) +
        ("0" + now.getMinutes()).slice(-2) +
        ("0" + now.getSeconds()).slice(-2);

    const fileName = `${name}_${dateTime}.png`;

    await page.screenshot({
        path: `reports/screenshots/${fileName}`,
        fullPage: true
    });

    return fileName;
}