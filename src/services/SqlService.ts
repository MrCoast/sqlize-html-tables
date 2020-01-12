import database from 'database/DatabaseWrapper';
import ImportDataService from 'services/ImportDataService';
import HtmlTableDataSource from 'database/data-sources/HtmlTableDataSource';
import DemoDataSource from 'database/data-sources/DemoDataSource';

class SqlService {
    constructor() {
        setTimeout(() => this.init(), 1000);
    }

    public init() {
        const htmlTable = document.getElementById('test-table') as HTMLTableElement;
        const importHtmlTableDataService = new ImportDataService(new HtmlTableDataSource(htmlTable));
        importHtmlTableDataService.importData();

        const importDemoDataService = new ImportDataService(new DemoDataSource());
        importDemoDataService.importData();
    }

    public execSql(sql: string) {
        return database.exec(sql);
    }
}

export default new SqlService();
