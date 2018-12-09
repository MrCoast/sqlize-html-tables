import { ColumnType } from 'database/data-sources/DataSource';

const fullyDefinedTable = {
    tableHtml: `
        <table>
            <thead>
                <tr>
                    <td>ID</td>
                    <td>First Name</td>
                    <td>Last Name</td>
                    <td>Favorite int number</td>
                    <td>String with numbers</td>
                    <td>Favorite float number</td>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>1</td>
                    <td>Victor</td>
                    <td>K</td>
                    <td>27</td>
                    <td>foo123</td>
                    <td>27,0</td>
                </tr>
                <tr>
                    <td>2</td>
                    <td>Sergey</td>
                    <td>S</td>
                    <td>-12</td>
                    <td>234bar</td>
                    <td>-12.6</td>
                </tr>
                <tr>
                    <td>3</td>
                    <td>Dmitry</td>
                    <td>V</td>
                    <td>18</td>
                    <td>baz356baz</td>
                    <td>+18.</td>
                </tr>
            </tbody>
        </table>
    `,
    expectedSqlTableName: 'id_first_name_last_name_favorite_int_number_string_with_numbers_favorite_float_number',
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
        {
            columnName: 'favorite_int_number',
            columnType: ColumnType.int,
        },
        {
            columnName: 'string_with_numbers',
            columnType: ColumnType.varchar,
        },
        {
            columnName: 'favorite_float_number',
            columnType: ColumnType.float,
        },
    ],
    expectedSqlTableData: [
        [1, 'Victor', 'K', 27, 'foo123', 27.0],
        [2, 'Sergey', 'S', -12, '234bar', -12.6],
        [3, 'Dmitry', 'V', 18, 'baz356baz', 18.0],
    ],
};

const fullyDefinedTableWithId = {
    tableHtml: `
        <table id="people-table">
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
    expectedSqlTableName: 'people_table',
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

const fullyDefinedTableWithCaption = {
    tableHtml: `
        <table>
            <caption>People in our Company</caption>
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
    expectedSqlTableName: 'people_in_our_company',
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

const tableWithoutThead = {
    tableHtml: `
        <table id="people-table">
            <tbody>
                <tr>
                    <td>ID</td>
                    <td>First Name</td>
                    <td>Last Name</td>
                </tr>
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
    expectedSqlTableName: 'people_table',
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
    fullyDefinedTableWithId,
    fullyDefinedTableWithCaption,
    tableWithoutThead,
}
