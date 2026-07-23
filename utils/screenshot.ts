import { Page } from '@playwright/test';
import fs from 'fs';
import path from 'path';

const SCREENSHOTS_DIR = path.join(process.cwd(), 'reports', 'screenshots');

function buildScreenshotFileName(name: string): string {
    const now = new Date();

    const dateTime =
        now.getFullYear() +
        ('0' + (now.getMonth() + 1)).slice(-2) +
        ('0' + now.getDate()).slice(-2) +
        '_' +
        ('0' + now.getHours()).slice(-2) +
        ('0' + now.getMinutes()).slice(-2) +
        ('0' + now.getSeconds()).slice(-2);

    return `${name}_${dateTime}.png`;
}

export async function takeScreenshot(
    page: Page,
    name: string
): Promise<string> {
    fs.mkdirSync(SCREENSHOTS_DIR, { recursive: true });

    const fileName = buildScreenshotFileName(name);

    await page.screenshot({
        path: path.join(SCREENSHOTS_DIR, fileName),
        fullPage: true,
    });

    return fileName;
}

export async function copyFailureScreenshot(
    name: string,
    sourcePath: string
): Promise<string> {
    fs.mkdirSync(SCREENSHOTS_DIR, { recursive: true });

    const fileName = buildScreenshotFileName(name);
    await fs.promises.copyFile(sourcePath, path.join(SCREENSHOTS_DIR, fileName));

    return fileName;
}