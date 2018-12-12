import htmlTables from './HtmlTables';
import { ColumnType } from 'database/data-sources/DataSource';

const fullyDefinedTable = {
    tableHtml: htmlTables.fullyDefinedTable,
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
    tableHtml: htmlTables.fullyDefinedTableWithId,
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
    tableHtml: htmlTables.fullyDefinedTableWithCaption,
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
    tableHtml: htmlTables.tableWithoutThead,
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

const tableWithoutTbody = {
    tableHtml: htmlTables.tableWithoutTbody,
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

const tableWithoutMeaningfulColumnNames = {
    tableHtml: htmlTables.tableWithoutMeaningfulColumnNames,
    expectedSqlTableName: 'people_table',
    expectedSqlTableColumnDefinitions: [
        {
            columnName: 'c_1',
            columnType: ColumnType.int,
        },
        {
            columnName: 'c_2',
            columnType: ColumnType.varchar,
        },
        {
            columnName: 'c_3',
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
    tableWithoutTbody,
    tableWithoutMeaningfulColumnNames,
}
