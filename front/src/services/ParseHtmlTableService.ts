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
        return domHelpers.htmlCollectionToArray(this.tableElement.tHead.rows[0].cells);
    }

    public getTbodyRows() {
        return domHelpers.htmlCollectionToArray(this.tableElement.tBodies[0].rows);
    }

    public hasTbodyRows() {
        return !!this.tableElement.rows[0];
    }
}
