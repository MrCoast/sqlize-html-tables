import database from 'database/DatabaseWrapper';
import { IDataSource } from 'database/data-sources/DataSource';
import * as sqlGenerator from 'services/SqlGenerator';

export default class DataImportService {
    private dataSource: IDataSource;

    constructor(dataSource: IDataSource) {
        this.dataSource = dataSource;
    }

    public importData() {
        const tableName = this.dataSource.getTableName();
        if (!tableName) {
            // this table can't be imported, so just skip it
            return;
        }

        database.run(sqlGenerator.generateCreateTableSQL(
            tableName,
            this.dataSource.getColumnDefinitions(),
        ));

        database.run(sqlGenerator.generateInsertDataSQL(
            tableName,
            this.dataSource.getData(),
        ));
    }
}
