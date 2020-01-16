import DataImportService from 'services/DataImportService';
import HtmlTableDataSource from 'database/data-sources/HtmlTableDataSource';
import { IDataImportStrategy } from './DataImportStrategy';

export default class HtmlTablesDataImportStrategy implements IDataImportStrategy {
    constructor(
        private tableElements: HTMLTableElement[],
    ) {}

    public import() {
        this.tableElements.forEach((tableElement) => {
            const dataImportHtmlTableService = new DataImportService(
                new HtmlTableDataSource(tableElement),
            );

            dataImportHtmlTableService.importData();
        });
    }
}
