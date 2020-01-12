export enum ColumnType {
    int = 'INT',
    varchar = 'VARCHAR',
    float = 'FLOAT',
}

export interface IColumnDefinition {
    columnName: string;
    columnType: ColumnType;
}

export interface IDataSource {
    getTableName(): string;
    getColumnDefinitions(): IColumnDefinition[];
    getData(): any[][];
}
