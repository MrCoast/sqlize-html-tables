import { ColumnType, IColumnDefinition, IDataSource } from './DataSource';
import * as stringHelpers from 'helpers/StringHelpers';
import * as domHelpers from 'helpers/DomHelpers';

export default class HtmlTableDataSource implements IDataSource {
    private tableElement: HTMLTableElement;

    constructor(tableElement: HTMLTableElement) {
        this.tableElement = tableElement;
    }

    public getTableName() {
        let tableName = null;

        if (this.tableElement.caption && this.tableElement.caption.textContent) {
            tableName = this.tableElement.caption.textContent;
        }

        if (tableName === null) {
            if (stringHelpers.isMeaningfullString(this.tableElement.id)) {
                tableName = this.tableElement.id;
            }
        }

        if (tableName === null) {
            if (this.tableElement.tHead && this.tableElement.tHead.rows[0]) {
                const cells = this.tableElement.tHead.rows[0].cells;
                const theadSummary = domHelpers
                    .htmlCollectionToArray(cells)
                    .map((cell: HTMLTableDataCellElement) => cell.innerText)
                    .join(' ');

                if (stringHelpers.isMeaningfullString(theadSummary)) {
                    tableName = theadSummary;
                }
            }
        }

        if (tableName === null) {
            tableName = `table_${stringHelpers.getRandomHash()}`;
        }

        return stringHelpers.textToSqlIdentifier(tableName);
    }

    public getColumnDefinitions(): IColumnDefinition[] {
        const convertCellIntoColumnDefinition = (cell: HTMLTableDataCellElement) => ({
            columnName: stringHelpers.textToSqlIdentifier(cell.innerText),
            columnType: ColumnType.varchar,
        });

        if (this.tableElement.tHead && this.tableElement.tHead.rows[0]) {
            return domHelpers.htmlCollectionToArray(this.tableElement.tHead.rows[0].cells).map(convertCellIntoColumnDefinition);
        }

        if (this.tableElement.rows[0]) {
            return domHelpers.htmlCollectionToArray(this.tableElement.rows[0].cells).map(convertCellIntoColumnDefinition);
        }

        return [];
    }

    public getData(): any[][] {
        const shouldSkipFirstRow = !(this.tableElement.tHead && this.tableElement.tHead.rows[0]);
        let rows = domHelpers.htmlCollectionToArray(this.tableElement.rows);

        if (shouldSkipFirstRow) {
            rows = rows.splice(0, 1);
        }

        return rows.map((row: HTMLTableRowElement) => (
            domHelpers.htmlCollectionToArray(row.cells).map((cell) => cell.innerText)
        ));
    }
}
