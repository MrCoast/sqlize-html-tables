import database from 'database/DatabaseWrapper';
import ImportDataService from 'services/ImportDataService';
import HtmlTableDataSource from 'database/HtmlTableDataSource';

class SqlService {
    constructor() {
        setTimeout(() => this.init(), 1000);
    }

    public init() {
        const htmlTable = document.getElementById('test-table') as HTMLTableElement;
        const importDataService = new ImportDataService(new HtmlTableDataSource(htmlTable));
        importDataService.importData();
    }

    public execSql(sql: string) {
        return database.exec(sql);
    }
}

export default new SqlService();
