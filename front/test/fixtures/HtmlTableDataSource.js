import { ColumnType } from 'database/data-sources/DataSource';

const fullyDefinedTable = {
    tableHtml: `
        <table>
            <thead>
                <tr>
                    <td>ID</td>
                    <td>First Name</td>
                    <td>Last Name</td>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>1</td>
                    <td>Victor</td>
                    <td>K</td>
                </tr>
                <tr>
                    <td>2</td>
                    <td>Sergey</td>
                    <td>S</td>
                </tr>
                <tr>
                    <td>3</td>
                    <td>Dmitry</td>
                    <td>V</td>
                </tr>
            </tbody>
        </table>
    `,
    expectedSqlTableName: 'id_first_name_last_name',
    expectedSqlTableColumnDefinitions: [
        {
            columnName: 'id',
            columnType: ColumnType.int,
        },
        {
            columnName: 'first_name',
            columnType: ColumnType.varchar,
        },
        {
            columnName: 'last_name',
            columnType: ColumnType.varchar,
        },
    ],
    expectedSqlTableData: [
        [1, 'Victor', 'K'],
        [2, 'Sergey', 'S'],
        [3, 'Dmitry', 'V'],
    ],
};

export default {
    fullyDefinedTable,
}
