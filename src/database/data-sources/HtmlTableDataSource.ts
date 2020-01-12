import { ColumnType, IColumnDefinition, IDataSource } from './DataSource';
import * as stringHelpers from 'helpers/StringHelpers';
import * as domHelpers from 'helpers/DomHelpers';
import ParseHtmlTableService from 'services/ParseHtmlTableService';

export default class HtmlTableDataSource implements IDataSource {
    private parseHtmlTableService: ParseHtmlTableService;
    private columnTypesCache: Map<number, ColumnType> = new Map();
    private isValidRelationalTableCache: boolean | null = null;

    constructor(tableElement: HTMLTableElement) {
        this.parseHtmlTableService = new ParseHtmlTableService(tableElement);
    }

    public getTableName() {
        if (!this.isValidRelationalTable()) {
            return '';
        }

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
        if (!this.isValidRelationalTable()) {
            return [];
        }

        const convertCellIntoColumnDefinition = (cell: HTMLTableCellElement, columnIndex: number) => ({
            columnName: stringHelpers.textToSqlIdentifier(cell.innerText),
            columnType: this.getColumnType(columnIndex),
        });

        if (this.parseHtmlTableService.hasMeaningfulThead()) {
            return this.parseHtmlTableService.getTheadCells().map(convertCellIntoColumnDefinition);
        }

        if (this.parseHtmlTableService.hasTbodyRows()) {
            if (this.parseHtmlTableService.hasMeaningfulColumnNames()) {
                return this.parseHtmlTableService.getFirstTbodyRowCells().map(convertCellIntoColumnDefinition);
            }

            return this.generateDummyColumnNames().map((columnName: string, columnIndex: number) => ({
                columnName,
                columnType: this.getColumnType(columnIndex),
            }));
        }

        return [];
    }

    public getData(): any[][] {
        if (!this.isValidRelationalTable()) {
            return [];
        }

        const rows = this.parseHtmlTableService.getTbodyRows();

        if (this.parseHtmlTableService.shouldSkipFirstRowInData()) {
            rows.splice(0, 1);
        }

        return rows.map((row: HTMLTableRowElement) => (
            domHelpers.htmlCollectionToArray(row.cells).map((cell: HTMLTableCellElement, columnIndex: number) => (
                this.processCellValue(cell.innerText, columnIndex)
            ))
        ));
    }

    private isColumnOfType(columnIndex: number, columnType: ColumnType) {
        if (this.columnTypesCache.has(columnIndex)) {
            return this.columnTypesCache.get(columnIndex) === columnType;
        }

        switch (columnType) {
            case ColumnType.int: {
                const isOfThisType = this.parseHtmlTableService.isOnlyIntegerColumn(columnIndex);

                if (isOfThisType) {
                    this.columnTypesCache.set(columnIndex, ColumnType.int);
                }

                return isOfThisType;
            }
            case ColumnType.float: {
                const isOfThisType = this.parseHtmlTableService.isOnlyFloatColumn(columnIndex);

                if (isOfThisType) {
                    this.columnTypesCache.set(columnIndex, ColumnType.float);
                }

                return isOfThisType;
            }
            default:
                throw new Error(`Checking for columnType ${columnType} is not implemented.`);
        }
    }

    private getColumnType(columnIndex: number) {
        if (this.isColumnOfType(columnIndex, ColumnType.int)) {
            return ColumnType.int;
        }

        if (this.isColumnOfType(columnIndex, ColumnType.float)) {
            return ColumnType.float;
        }

        return ColumnType.varchar;
    }

    private processCellValue(cellValue: string, columnIndex: number) {
        if (this.isColumnOfType(columnIndex, ColumnType.int)) {
            return Number(cellValue);
        }

        if (this.isColumnOfType(columnIndex, ColumnType.float)) {
            return Number(stringHelpers.normalizeFloatString(cellValue));
        }

        return cellValue;
    }

    /**
     * Generates names like ['c_1', 'c_2', 'c_3' etc.], total of columns count
     * of the table.
     */
    private generateDummyColumnNames() {
        return (new Array<number>(this.parseHtmlTableService.getTableColumnsCount()))
            .map((item: number) => `c_${item + 1}`);
    }

    private isValidRelationalTable() {
        if (this.isValidRelationalTableCache !== null) {
            return this.isValidRelationalTableCache;
        }

        // @TODO add support for multiple tbodies as separate tables
        if (this.parseHtmlTableService.hasMultipleTbodies()) {
            this.isValidRelationalTableCache = false;

            return false;
        }

        if (this.parseHtmlTableService.hasColspansOrRowspans()) {
            this.isValidRelationalTableCache = false;

            return false;
        }

        if (!this.parseHtmlTableService.hasEqualColumnsCountInEachRow()) {
            this.isValidRelationalTableCache = false;

            return false;
        }

        if (this.parseHtmlTableService.getTbodyRowsCount() < 2) {
            this.isValidRelationalTableCache = false;

            return false;
        }

        this.isValidRelationalTableCache = true;

        return true;
    }
}
