import { IColumnDefinition } from 'database/DataSource';

export function generateCreateTableSQL(tableName: string, columnDefinitions: IColumnDefinition[]) {
    const columnsPart = columnDefinitions
        .map((columnDefinition) => `${columnDefinition.columnName} ${columnDefinition.columnType}`)
        .join(', ');

    return `DROP TABLE IF EXISTS ${tableName}; CREATE TABLE ${tableName} (${columnsPart});`;
}

export function generateInsertDataSQL(tableName: string, data: any[][]) {
    return data
        .map((row) => (
            `INSERT INTO ${tableName} VALUES (${row.map((cell) => `'${cell}'`).join(', ')});`
        ))
        .join('\n');
}
