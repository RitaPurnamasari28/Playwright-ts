import ExcelJS from 'exceljs';
import fs from 'fs';
import path from 'path';

interface TestResultRow {
    test: string;
    expected: string;
    actual: string;
    status: string;
    screenshot: string;
    time: string;
}

const REPORTS_DIR = path.join(process.cwd(), 'reports');

function getWorkerResultsPath(): string {
    const workerIndex = process.env.TEST_WORKER_INDEX ?? '0';
    return path.join(REPORTS_DIR, `results-${workerIndex}.jsonl`);
}

function ensureReportsDir(): void {
    fs.mkdirSync(path.join(REPORTS_DIR, 'screenshots'), { recursive: true });
}

export function resetWorkerResults(): void {
    ensureReportsDir();

    for (const file of fs.readdirSync(REPORTS_DIR)) {
        if (file.startsWith('results-') && file.endsWith('.jsonl')) {
            fs.unlinkSync(path.join(REPORTS_DIR, file));
        }
    }

    const excelPath = path.join(REPORTS_DIR, 'result.xlsx');
    if (fs.existsSync(excelPath)) {
        fs.unlinkSync(excelPath);
    }
}

export async function saveResult(
    test: string,
    expected: string,
    actual: string,
    status: string,
    screenshot: string
): Promise<void> {
    ensureReportsDir();

    const row: TestResultRow = {
        test,
        expected,
        actual,
        status,
        screenshot,
        time: new Date().toLocaleString(),
    };

    await fs.promises.appendFile(
        getWorkerResultsPath(),
        `${JSON.stringify(row)}\n`,
        'utf-8'
    );
}

export async function saveTestFailure(
    test: string,
    errorMessage: string,
    screenshot = ''
): Promise<void> {
    await saveResult(test, 'Test should pass', errorMessage, 'FAIL', screenshot);
}

function readAllResults(): TestResultRow[] {
    if (!fs.existsSync(REPORTS_DIR)) {
        return [];
    }

    const results: TestResultRow[] = [];

    for (const file of fs.readdirSync(REPORTS_DIR)) {
        if (!file.startsWith('results-') || !file.endsWith('.jsonl')) {
            continue;
        }

        const content = fs.readFileSync(path.join(REPORTS_DIR, file), 'utf-8');
        for (const line of content.split('\n')) {
            if (!line.trim()) {
                continue;
            }

            results.push(JSON.parse(line) as TestResultRow);
        }
    }

    return results;
}

export async function generateExcelReport(): Promise<void> {
    ensureReportsDir();

    const results = readAllResults();
    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet('Result');

    sheet.columns = [
        { header: 'Test Case', key: 'test', width: 25 },
        { header: 'Expected Result', key: 'expected', width: 35 },
        { header: 'Actual Result', key: 'actual', width: 35 },
        { header: 'Status', key: 'status', width: 15 },
        { header: 'Execution Time', key: 'time', width: 25 },
        { header: 'Screenshot', key: 'screenshot', width: 35 },
    ];

    for (const result of results) {
        sheet.addRow(result);
    }

    await workbook.xlsx.writeFile(path.join(REPORTS_DIR, 'result.xlsx'));
}
