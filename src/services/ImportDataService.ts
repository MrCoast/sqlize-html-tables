import database from 'database/DatabaseWrapper';
import { IDataSource } from 'database/data-sources/DataSource';
import * as sqlGenerator from 'services/SqlGenerator';

export default class ImportDataService {
    private dataSource: IDataSource;

    constructor(dataSource: IDataSource) {
        this.dataSource = dataSource;
    }

    public importData() {
        database.run(sqlGenerator.generateCreateTableSQL(
            this.dataSource.getTableName(),
            this.dataSource.getColumnDefinitions(),
        ));

        database.run(sqlGenerator.generateInsertDataSQL(
            this.dataSource.getTableName(),
            this.dataSource.getData(),
        ));
    }
}
