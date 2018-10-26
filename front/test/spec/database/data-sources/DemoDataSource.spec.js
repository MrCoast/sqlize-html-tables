import DemoDataSource from 'database/data-sources/DemoDataSource';
import { ColumnType } from 'database/data-sources/DataSource';

const demoDataSource = new DemoDataSource();

describe('DemoDataSource', function () {
    describe('method getTableName', function () {
        it('should return correct demo SQL table name', function () {
            expect(demoDataSource.getTableName()).toBe('demo');
        });
    });

    describe('method getColumnDefinitions', function () {
        it('should return correct demo SQL table column definitions', function () {
            expect(demoDataSource.getColumnDefinitions()).toEqual([
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
            ]);
        });
    });

    describe('method getData', function () {
        it('should return correct demo SQL table data', function () {
            expect(demoDataSource.getData()).toEqual([
                [1, 'Peter', 'Li'],
                [2, 'Syed', 'Hassan Ali'],
                [3, 'Bar', 'Baz'],
            ]);
        });
    });
});
