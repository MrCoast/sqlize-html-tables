import { ColumnType, IColumnDefinition, IDataSource } from 'database/DataSource';
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
                    .mapHtmlCollection(cells, (cell) => cell.innerText)
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
            return domHelpers.mapHtmlCollection(this.tableElement.tHead.rows[0].cells, convertCellIntoColumnDefinition);
        }

        if (this.tableElement.rows[0]) {
            return domHelpers.mapHtmlCollection(this.tableElement.rows[0].cells, convertCellIntoColumnDefinition);
        }

        return [];
//        return [
//            {
//                columnName: 'id',
//                columnType: ColumnType.int,
//            },
//            {
//                columnName: 'first_name',
//                columnType: ColumnType.varchar,
//            },
//            {
//                columnName: 'last_name',
//                columnType: ColumnType.varchar,
//            },
//        ];
    }

    public getData(): any[][] {
        const shouldSkipFirstRow = !(this.tableElement.tHead && this.tableElement.tHead.rows[0]);
        const rows = shouldSkipFirstRow
            ? domHelpers.htmlCollectionToArray(this.tableElement.rows).splice(0, 1)
            : this.tableElement.rows;

        return domHelpers.mapHtmlCollection(rows, (row: HTMLTableRowElement) => (
            domHelpers.mapHtmlCollection(row.cells, (cell) => cell.innerText)
        ));
//        return [
//            [1, 'Victor', 'K'],
//            [2, 'Ivan', 'Ivanov'],
//            [3, 'Foo', 'Bar'],
//        ];
    }
}
