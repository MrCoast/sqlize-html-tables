import DataImportService from 'services/DataImportService';
import HtmlTableDataSource from 'database/data-sources/HtmlTableDataSource';
import DemoDataSource from 'database/data-sources/DemoDataSource';
import { IDataImportStrategy } from './DataImportStrategy';

export default class DemoDataImportStrategy implements IDataImportStrategy {
    public import() {
        setTimeout(() => {
            const htmlTable = document.getElementById('test-table') as HTMLTableElement;
            const dataImportHtmlTableService = new DataImportService(new HtmlTableDataSource(htmlTable));
            dataImportHtmlTableService.importData();

            const dataImportDemoService = new DataImportService(new DemoDataSource());
            dataImportDemoService.importData();
        }, 1000);
    }
}
