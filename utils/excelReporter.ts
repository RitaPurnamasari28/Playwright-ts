import type { Reporter, TestCase, TestResult } from '@playwright/test/reporter';
import { saveTestFailure } from './excelReport';
import { copyFailureScreenshot } from './screenshot';

function getFailureScreenshotPath(result: TestResult): string | undefined {
    const screenshot = result.attachments.find(
        (attachment) =>
            attachment.contentType === 'image/png' && attachment.path
    );

    return screenshot?.path;
}

class ExcelReporter implements Reporter {
    async onTestEnd(test: TestCase, result: TestResult): Promise<void> {
        if (result.status === 'passed') {
            return;
        }

        const errorMessage =
            result.errors.map((error) => error.message).join('\n') ||
            `Test ${result.status}`;

        let screenshot = '';
        const screenshotPath = getFailureScreenshotPath(result);

        if (screenshotPath) {
            screenshot = await copyFailureScreenshot(test.title, screenshotPath);
        }

        await saveTestFailure(test.title, errorMessage, screenshot);
    }
}

export default ExcelReporter;
