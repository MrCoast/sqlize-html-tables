import { ColumnType, IColumnDefinition, IDataSource } from 'database/DataSource';

export default class HtmlTableDataSource implements IDataSource {
    public getTableName() {
        return 'test';
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
            [1, 'Victor', 'K'],
            [2, 'Ivan', 'Ivanov'],
            [3, 'Foo', 'Bar'],
        ];
    }
}
