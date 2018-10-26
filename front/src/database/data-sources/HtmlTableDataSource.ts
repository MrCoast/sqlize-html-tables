import { ColumnType, IColumnDefinition, IDataSource } from './DataSource';
import * as stringHelpers from 'helpers/StringHelpers';
import * as domHelpers from 'helpers/DomHelpers';
import ParseHtmlTableService from 'services/ParseHtmlTableService';

export default class HtmlTableDataSource implements IDataSource {
    private parseHtmlTableService: ParseHtmlTableService;

    constructor(tableElement: HTMLTableElement) {
        this.parseHtmlTableService = new ParseHtmlTableService(tableElement);
    }

    public getTableName() {
        let tableName = this.parseHtmlTableService.getTableNameFromCaption();

        if (tableName === null) {
            tableName = this.parseHtmlTableService.getTableNameFromId();
        }

        if (tableName === null) {
            tableName = this.parseHtmlTableService.getTableNameFromThead();
        }

        if (tableName === null) {
            tableName = `table_${stringHelpers.getRandomHash()}`;
        }

        return stringHelpers.textToSqlIdentifier(tableName);
    }

    public getColumnDefinitions(): IColumnDefinition[] {
        const convertCellIntoColumnDefinition = (cell: HTMLTableCellElement, columnIndex: number) => ({
            columnName: stringHelpers.textToSqlIdentifier(cell.innerText),
            columnType: this.parseHtmlTableService.isOnlyIntegerColumn(columnIndex)
                ? ColumnType.int
                : ColumnType.varchar,
        });

        if (this.parseHtmlTableService.hasMeaningfulThead()) {
            return this.parseHtmlTableService.getTheadCells().map(convertCellIntoColumnDefinition);
        }

        if (this.parseHtmlTableService.hasTbodyRows()) {
            return this.parseHtmlTableService.getFirstTbodyRowCells().map(convertCellIntoColumnDefinition);
        }

        return [];
    }

    public getData(): any[][] {
        const shouldSkipFirstRow = !this.parseHtmlTableService.hasMeaningfulThead();
        let rows = this.parseHtmlTableService.getTbodyRows();

        if (shouldSkipFirstRow) {
            rows = rows.splice(0, 1);
        }

        return rows.map((row: HTMLTableRowElement) => (
            domHelpers.htmlCollectionToArray(row.cells).map((cell, columnIndex: number) => (
                this.parseHtmlTableService.isOnlyIntegerColumn(columnIndex)
                    ? Number(cell.innerText)
                    : cell.innerText
            ))
        ));
    }
}
