import { resetWorkerResults } from './utils/excelReport';

export default async function globalSetup(): Promise<void> {
    resetWorkerResults();
}
