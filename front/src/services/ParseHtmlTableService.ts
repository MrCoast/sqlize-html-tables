import * as stringHelpers from 'helpers/StringHelpers';
import * as domHelpers from 'helpers/DomHelpers';

export default class ParseHtmlTableService {
    private tableElement: HTMLTableElement;

    constructor(tableElement: HTMLTableElement) {
        this.tableElement = tableElement;
    }

    public hasMeaningfulThead() {
        return this.tableElement.tHead && this.tableElement.tHead.rows[0];
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
        return domHelpers.htmlCollectionToArray(this.tableElement.tHead.rows[0].cells) as HTMLTableHeaderCellElement[];
    }

    public getFirstTbodyRowCells() {
        return this.hasTbodyRows()
            ? domHelpers.htmlCollectionToArray(this.getTbodyRows()[0].cells) as HTMLTableDataCellElement[]
            : [];
    }

    public getTbodyRows() {
        return domHelpers.htmlCollectionToArray(this.tableElement.tBodies[0].rows) as HTMLTableRowElement[];
    }

    public hasTbodyRows() {
        return !!this.tableElement.tBodies[0].rows[0];
    }

    public isOnlyIntegerColumn(columnIndex: number) {
        const columnValues = this.getTableColumnValues(columnIndex);

        for (const value of columnValues) {
            if (stringHelpers.isNullLikeString(value)) {
                continue; // @TODO add isNotNullColumn()
            }

            if (!stringHelpers.isIntegerString(value!)) {
                return false;
            }
        }

        return true;
    }

    public isOnlyFloatColumn(columnIndex: number) {
        const columnValues = this.getTableColumnValues(columnIndex);

        for (const value of columnValues) {
            if (stringHelpers.isNullLikeString(value)) {
                continue; // @TODO add isNotNullColumn()
            }

            if (!stringHelpers.isFloatString(value!)) {
                return false;
            }
        }

        return true;
    }

    public getTableColumnValues(columnIndex: number) {
        const columnValues: Array<string | null> = [];

        for (const row of this.getTbodyRows()) {
            const cellValue = row.cells[columnIndex]
                ? row.cells[columnIndex].innerText
                : null;

            columnValues.push(cellValue);
        }

        return columnValues;
    }
}
