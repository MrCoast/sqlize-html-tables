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

        if (!this.hasTbodyRows()) {
            return false;
        }

        for (const cell of this.getFirstTbodyRowCells()) {
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
        if (!this.tableElement.tHead || !this.tableElement.tHead.rows[0]) {
            return [];
        }

        return domHelpers.htmlCollectionToArray(
            this.tableElement.tHead.rows[0].cells,
        ) as HTMLTableHeaderCellElement[];
    }

    public getFirstTbodyRowCells() {
        if (!this.getTbodyRows()[0]) {
            return [];
        }

        return this.hasTbodyRows()
            ? domHelpers.htmlCollectionToArray(
                this.getTbodyRows()[0].cells,
              ) as HTMLTableDataCellElement[]
            : [];
    }

    public getTbodyRows() {
        if (!this.tableElement.tBodies[0]) {
            return [];
        }

        return domHelpers.htmlCollectionToArray(
            this.tableElement.tBodies[0].rows,
        ) as HTMLTableRowElement[];
    }

    public getTbodyRowsCount() {
        return this.getTbodyRows().length;
    }

    public hasTbodyRows() {
        return !!this.getTbodyRowsCount();
    }

    public hasMultipleTbodies() {
        return this.tableElement.tBodies.length > 1;
    }

    public hasColspansOrRowspans() {
        const doRowsContainSpanAttribute = (rows: HTMLCollectionOf<HTMLTableRowElement>) => {
            const rowsArray = domHelpers.htmlCollectionToArray(rows) as HTMLTableRowElement[];

            for (const row of rowsArray) {
                const cells = domHelpers.htmlCollectionToArray(row.cells) as HTMLTableCellElement[];

                for (const cell of cells) {
                    const hasColspan = cell.colSpan && cell.colSpan !== 1;
                    const hasRowspan = cell.rowSpan && cell.rowSpan !== 1;

                    if (hasColspan || hasRowspan) {
                        return true;
                    }
                }
            }

            return false;
        };

        if (this.tableElement.tHead && this.tableElement.tHead.rows.length > 0) {
            if (doRowsContainSpanAttribute(this.tableElement.tHead.rows)) {
                return true;
            }
        }

        const tbodies = domHelpers.htmlCollectionToArray(this.tableElement.tBodies) as HTMLTableSectionElement[];

        for (const tbody of tbodies) {
            if (doRowsContainSpanAttribute(tbody.rows)) {
                return true;
            }
        }

        return false;
    }

    public hasEqualColumnsCountInEachRow() {
        let columnsCount = this.getTheadCells().length;

        if (columnsCount === 0) {
            columnsCount = this.getFirstTbodyRowCells().length;

            if (columnsCount === 0) {
                // no rows in thead or tbody at all
                return true;
            }
        }

        for (const row of this.getTbodyRows()) {
            if (columnsCount !== row.cells.length) {
                return false;
            }
        }

        return true;
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
