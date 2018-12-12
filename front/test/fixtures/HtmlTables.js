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

export default {
    fullyDefinedTable,
    fullyDefinedTableWithId,
    fullyDefinedTableWithCaption,
    tableWithoutThead,
    tableWithoutTbody,
    tableWithoutMeaningfulColumnNames,
    tableWithoutTheadWithOnlyColumnNamesRow,
    tableWithoutTbodyWithOnlyColumnNamesRow,
}
