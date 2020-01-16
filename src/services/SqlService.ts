import database from 'database/DatabaseWrapper';
import { IDataImportStrategy } from 'data-import-strategies/DataImportStrategy';

class SqlService {
    public importData(dataImportStrategy: IDataImportStrategy) {
        dataImportStrategy.import();
    }

    public execSql(sql: string) {
        return database.exec(sql);
    }

    public getAvailableTables() {
        return this
            .execSql(`SELECT name FROM sqlite_master WHERE type='table'`)[0]
            .values
            .map((row) => row[0] as string);
    }

    public getColumnsInTable(tableName: string) {
        const sql = `PRAGMA table_info([${tableName}])`;

        return this
            .execSql(sql)[0]
            .values
            .map((row) => `${row[1]} ${row[2]}`);
    }
}

export default new SqlService();
