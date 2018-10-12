import database from 'database/DatabaseWrapper';
import ImportDataService from 'services/ImportDataService';
import HtmlTableDataSource from 'database/HtmlTableDataSource';

class SqlService {
    constructor() {
        const importDataService = new ImportDataService(new HtmlTableDataSource());
        importDataService.importData();
    }

    public execSql(sql: string) {
        return database.exec(sql);
    }
}

export default new SqlService();
