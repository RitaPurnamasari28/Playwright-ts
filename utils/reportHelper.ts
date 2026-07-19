import { Page } from '@playwright/test';
import { takeScreenshot } from './screenshot';
import { saveResult } from './excelReport';

export async function reportSuccess(
    page: Page,
    test: string,
    expected: string,
    actual: string
) {

    const screenshot = await takeScreenshot(page, test);

    await saveResult(
        test,
        expected,
        actual,
        "PASS",
        screenshot
    );

}