import * as stringHelpers from 'helpers/StringHelpers';
import * as domHelpers from 'helpers/DomHelpers';

export default class ParseHtmlTableService {
    private tableElement: HTMLTableElement;
    private cachedShouldSkipFirstRowInData: boolean | null = null;

    constructor(tableElement: HTMLTableElement) {
        this.tableElement = tableElement;
    }

    public hasMeaningfulThead() {
        return this.tableElement.tHead && this.tableElement.tHead.rows[0];
    }

    public hasMeaningfulColumnNames() {
        if (this.hasMeaningfulThead()) {
            return true;
        }

        const rows = this.getTbodyRows();

        if (!rows[0] || !rows[0].cells || rows[0].cells.length < 1) {
            return false;
        }

        for (const cell of domHelpers.htmlCollectionToArray(rows[0].cells)) {
            if (stringHelpers.isIntegerString(cell.innerText)
                || stringHelpers.isFloatString(cell.innerText)) {
                return false;
            }
        }

        return true;
    }

    public shouldSkipFirstRowInData() {
        if (this.cachedShouldSkipFirstRowInData !== null) {
            return this.cachedShouldSkipFirstRowInData;
        }

        this.cachedShouldSkipFirstRowInData = !this.hasMeaningfulThead()
            && this.hasMeaningfulColumnNames();

        return this.cachedShouldSkipFirstRowInData;
    }

    public getTableColumnsCount() {
        return Math.max(...this.getTbodyRows().map((row) => row.cells.length));
    }

    public getTableNameFromCaption() {
        return this.tableElement.caption && this.tableElement.caption.textContent
            ? this.tableElement.caption.textContent
            : null;
    }

    public getTableNameFromId() {
        return stringHelpers.isMeaningfulString(this.tableElement.id)
            ? this.tableElement.id
            : null;
    }

    public getTableNameFromThead() {
        if (this.hasMeaningfulThead()) {
            const theadSummary = this.getTheadCells()
                .map((cell: HTMLTableDataCellElement) => cell.innerText)
                .join(' ');

            if (stringHelpers.isMeaningfulString(theadSummary)) {
                return theadSummary;
            }
        }

        return null;
    }

    public getTheadCells() {
        return domHelpers.htmlCollectionToArray(
            this.tableElement.tHead!.rows[0].cells,
        ) as HTMLTableHeaderCellElement[];
    }

    public getFirstTbodyRowCells() {
        return this.hasTbodyRows()
            ? domHelpers.htmlCollectionToArray(
                this.getTbodyRows()[0].cells,
              ) as HTMLTableDataCellElement[]
            : [];
    }

    public getTbodyRows() {
        return domHelpers.htmlCollectionToArray(
            this.tableElement.tBodies[0].rows,
        ) as HTMLTableRowElement[];
    }

    public hasTbodyRows() {
        return !!this.tableElement.tBodies[0].rows[0];
    }

    public isColumnOkByPredicate(columnIndex: number, predicate: (value: string) => boolean) {
        const columnValues = this.getTableColumnValues(columnIndex);

        for (const value of columnValues) {
            if (stringHelpers.isNullLikeString(value)) {
                continue; // @TODO add isNotNullColumn()
            }

            if (!predicate.call(null, value!)) {
                return false;
            }
        }

        return true;
    }

    public isOnlyIntegerColumn(columnIndex: number) {
        return this.isColumnOkByPredicate(columnIndex, stringHelpers.isIntegerString);
    }

    public isOnlyFloatColumn(columnIndex: number) {
        return this.isColumnOkByPredicate(columnIndex, stringHelpers.isFloatString);
    }

    public getTableColumnValues(columnIndex: number) {
        const columnValues: Array<string | null> = [];
        let isFirstRow = true;

        for (const row of this.getTbodyRows()) {
            if (isFirstRow && this.shouldSkipFirstRowInData()) {
                isFirstRow = false;

                continue;
            }

            const cellValue = row.cells[columnIndex]
                ? row.cells[columnIndex].innerText
                : null;

            columnValues.push(cellValue);

            isFirstRow = false;
        }

        return columnValues;
    }
}
