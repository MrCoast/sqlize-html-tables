import { IColumnDefinition } from 'database/data-sources/DataSource';
import * as stringHelpers from 'helpers/StringHelpers';

export function generateCreateTableSQL(tableName: string, columnDefinitions: IColumnDefinition[]) {
    const columnsPart = columnDefinitions
        .map((columnDefinition) => `${columnDefinition.columnName} ${columnDefinition.columnType}`)
        .join(', ');

    return `DROP TABLE IF EXISTS ${tableName}; CREATE TABLE ${tableName} (${columnsPart});`;
}

export function generateInsertDataSQL(tableName: string, data: any[][]) {
    return data
        .map((row) => {
            const valuesPart = row.map(
                (cell) => `'${stringHelpers.escapeStringForSql(cell)}'`,
            ).join(', ');

            return `INSERT INTO ${tableName} VALUES (${valuesPart});`;
        })
        .join('\n');
}
