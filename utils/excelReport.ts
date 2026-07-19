import ExcelJS from 'exceljs';

const workbook = new ExcelJS.Workbook();

const sheet = workbook.addWorksheet("Result");

sheet.columns = [
    { header: "Test Case", key: "test", width: 25 },
    { header: "Expected Result", key: "expected", width: 35 },
    { header: "Actual Result", key: "actual", width: 35 },
    { header: "Status", key: "status", width: 15 },
    { header: "Execution Time", key: "time", width: 25 },
    { header: "Screenshot", key: "screenshot", width: 35 }
];

export async function saveResult(
    test: string,
    expected: string,
    actual: string,
    status: string,
    screenshot: string
) {

    const executionTime = new Date().toLocaleString();

    sheet.addRow({
        test,
        expected,
        actual,
        status,
        time: executionTime,
        screenshot
    });

    await workbook.xlsx.writeFile("reports/result.xlsx");
}