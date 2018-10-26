import * as React from 'react';

class DemoHtmlTable extends React.PureComponent {
    public render() {
        return (
            <table id="test-table" className="test-table">
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
                        <td>Ivan</td>
                        <td>Ivanov</td>
                    </tr>
                    <tr>
                        <td>3</td>
                        <td>Foo</td>
                        <td>Bar</td>
                    </tr>
                    <tr>
                        <td>4</td>
                        <td>Lisa</td>
                        <td>Wayne</td>
                    </tr>
                    <tr>
                        <td>5</td>
                        <td>Kate</td>
                        <td>Trimberg</td>
                    </tr>
                </tbody>
            </table>
        );
    }
}

export default DemoHtmlTable;
