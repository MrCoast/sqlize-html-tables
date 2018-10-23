import * as React from 'react';
import SqlRunner from 'components/SqlRunner';

class App extends React.Component {
    public render() {
        return (
            <div className="app-container">
                <h1>SQLize HTML tables</h1>
                <SqlRunner />

                <table id="test-table" className="test-table">
                    <thead>
                        <tr>
                            <td>First Name</td>
                            <td>Last Name</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Victor</td>
                            <td>K</td>
                        </tr>
                        <tr>
                            <td>Ivan</td>
                            <td>Ivanov</td>
                        </tr>
                        <tr>
                            <td>Foo</td>
                            <td>Bar</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}

export default App;
