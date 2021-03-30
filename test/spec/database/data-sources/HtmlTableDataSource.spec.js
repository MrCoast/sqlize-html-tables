import htmlTableFixtures from 'test/fixtures/HtmlTableDataSource';
import * as domHelpers from 'test/helpers/DomHelpers';
import HtmlTableDataSource from 'database/data-sources/HtmlTableDataSource';

const repeatTestForEachFixture = (fixtures, test) => {
    for (let fixtureKey in fixtures) {
        const fixture = fixtures[fixtureKey];
        const tableElement = domHelpers.createHtmlElement(fixture.tableHtml);
        const dataSource = new HtmlTableDataSource(tableElement);

        test(fixtureKey, fixture, dataSource);
    }
};

describe('HtmlTableDataSource', function () {
    describe('method getTableName', function () {
        repeatTestForEachFixture(htmlTableFixtures, (fixtureKey, fixture, dataSource) => {
            it(`should return correct SQL table name for ${fixtureKey} table`, function () {
                if (fixture.expectedSqlTableName) {
                    expect(dataSource.getTableName()).toBe(fixture.expectedSqlTableName);
                } else if (fixture.expectedSqlTableNameRegexp) {
                    expect(dataSource.getTableName()).toMatch(fixture.expectedSqlTableNameRegexp);
                }
            });
        });
    });

    describe('method getColumnDefinitions', function () {
        repeatTestForEachFixture(htmlTableFixtures, (fixtureKey, fixture, dataSource) => {
            it(`should return correct SQL table column definitions for ${fixtureKey} table`, function () {
                expect(dataSource.getColumnDefinitions()).toEqual(fixture.expectedSqlTableColumnDefinitions);
            });
        });
    });

    describe('method getData', function () {
        repeatTestForEachFixture(htmlTableFixtures, (fixtureKey, fixture, dataSource) => {
            it(`should return correct SQL table data for ${fixtureKey} table`, function () {
                expect(dataSource.getData()).toEqual(fixture.expectedSqlTableData);
            });
        });
    });
});

