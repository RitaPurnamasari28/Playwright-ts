import { generateExcelReport } from './utils/excelReport';

export default async function globalTeardown(): Promise<void> {
    await generateExcelReport();
}
