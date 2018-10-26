import { ColumnType, IColumnDefinition, IDataSource } from './DataSource';

export default class DemoDataSource implements IDataSource {
    public getTableName() {
        return 'demo';
    }

    public getColumnDefinitions(): IColumnDefinition[] {
        return [
            {
                columnName: 'id',
                columnType: ColumnType.int,
            },
            {
                columnName: 'first_name',
                columnType: ColumnType.varchar,
            },
            {
                columnName: 'last_name',
                columnType: ColumnType.varchar,
            },
        ];
    }

    public getData(): any[][] {
        return [
            [1, 'Peter', 'Li'],
            [2, 'Syed', 'Hassan Ali'],
            [3, 'Bar', 'Baz'],
        ];
    }
}
