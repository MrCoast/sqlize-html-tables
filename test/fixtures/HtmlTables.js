const fullyDefinedTable = `
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
`;

const fullyDefinedTableWithId = `
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
`;

const fullyDefinedTableWithCaption = `
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
`;

const tableWithoutThead = `
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
`;

const tableWithoutTheadWithThs = `
    <table id="people-table">
        <tbody>
            <tr>
                <th>ID</td>
                <th>First Name</td>
                <th>Last Name</td>
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
`;

const tableWithoutTbody = `
    <table id="people-table">
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
    </table>
`;

const tableWithoutMeaningfulColumnNames = `
    <table id="people-table">
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
    </table>
`;

const tableWithTheadWithOnlyColumnNamesRow = `
    <table id="people-table">
        <thead>
            <tr>
                <td>ID</td>
                <td>First Name</td>
                <td>Last Name</td>
            </tr>
        </thead>
    </table>
`;

const tableWithoutTheadWithOnlyColumnNamesRow = `
    <table id="people-table">
        <tbody>
            <tr>
                <td>ID</td>
                <td>First Name</td>
                <td>Last Name</td>
            </tr>
        </tbody>
    </table>
`;

const tableWithoutTbodyWithOnlyColumnNamesRow = `
    <table id="people-table">
        <tr>
            <td>ID</td>
            <td>First Name</td>
            <td>Last Name</td>
        </tr>
    </table>
`;

const tableWithMultipleTbodies = `
    <table id="people-table">
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
        <tbody>
            <tr>
                <td>4</td>
                <td>Victor</td>
                <td>K</td>
            </tr>
            <tr>
                <td>5</td>
                <td>Sergey</td>
                <td>S</td>
            </tr>
            <tr>
                <td>6</td>
                <td>Dmitry</td>
                <td>V</td>
            </tr>
        </tbody>
    </table>
`;

const tableWithColspansAndRowSpansEqualToOne = `
    <table id="people-table">
        <thead>
            <tr>
                <td>ID</td>
                <td colspan="1">First Name</td>
                <td>Last Name</td>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td rowspan="1">1</td>
                <td>Victor</td>
                <td colspan="1">K</td>
            </tr>
            <tr>
                <td>2</td>
                <td>Sergey</td>
                <td>S</td>
            </tr>
            <tr>
                <td>3</td>
                <td colspan="1" rowspan="1">Dmitry</td>
                <td>V</td>
            </tr>
        </tbody>
    </table>
`;

const tableWithColspanInThead = `
    <table id="people-table">
        <thead>
            <tr>
                <td>ID</td>
                <td colspan="2">First Name</td>
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
`;

const tableWithColspanInTbody = `
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
                <td colspan="3">3</td>
            </tr>
        </tbody>
    </table>
`;

const tableWithRowspanInThead = `
    <table id="people-table">
        <thead>
            <tr>
                <td rowspan="2">ID</td>
                <td>First Name</td>
                <td>Last Name</td>
            </tr>
            <tr>
                <td>First Name of the employee</td>
                <td>Last Name of the employee</td>
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
`;

const tableWithRowspanInTbody = `
    <table id="people-table">
        <thead>
            <tr>
                <td>ID</td>
                <td>First Name</td>
                <td>Last Name</td>
            </tr>
            <tr>
                <td>First Name of the employee</td>
                <td>Last Name of the employee</td>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>1</td>
                <td>Victor</td>
                <td rowspan="3">K</td>
            </tr>
            <tr>
                <td>2</td>
                <td>Sergey</td>
            </tr>
            <tr>
                <td>3</td>
                <td>Dmitry</td>
            </tr>
        </tbody>
    </table>
`;

const tableWithTheadAndNonEqualColumnsCount1 = `
    <table id="people-table">
        <thead>
            <tr>
                <td>ID</td>
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
`;

const tableWithTheadAndNonEqualColumnsCount2 = `
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
`;

const tableWithoutTheadAndNonEqualColumnsCount = `
    <table id="people-table">
        <tbody>
            <tr>
                <td>1</td>
                <td>Victor</td>
                <td>K</td>
            </tr>
            <tr>
                <td>2</td>
                <td>Sergey</td>
            </tr>
            <tr>
                <td>3</td>
                <td>Dmitry</td>
                <td>V</td>
            </tr>
        </tbody>
    </table>
`;

const tableWithTbodyWithoutAnyRows = `
    <table id="people-table">
        <tbody>
        </tbody>
    </table>
`;

const tableWithoutTbodyWithoutAnyRows = `
    <table id="people-table">
    </table>
`;

export default {
    fullyDefinedTable,
    fullyDefinedTableWithId,
    fullyDefinedTableWithCaption,
    tableWithoutThead,
    tableWithoutTheadWithThs,
    tableWithoutTbody,
    tableWithoutMeaningfulColumnNames,
    tableWithTheadWithOnlyColumnNamesRow,
    tableWithoutTheadWithOnlyColumnNamesRow,
    tableWithoutTbodyWithOnlyColumnNamesRow,
    tableWithMultipleTbodies,
    tableWithColspansAndRowSpansEqualToOne,
    tableWithColspanInThead,
    tableWithColspanInTbody,
    tableWithRowspanInThead,
    tableWithRowspanInTbody,
    tableWithTheadAndNonEqualColumnsCount1,
    tableWithTheadAndNonEqualColumnsCount2,
    tableWithoutTheadAndNonEqualColumnsCount,
    tableWithTbodyWithoutAnyRows,
    tableWithoutTbodyWithoutAnyRows,
}
