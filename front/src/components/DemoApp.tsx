import * as React from 'react';
import SqlRunner from 'components/SqlRunner';
import DemoHtmlTable from 'components/DemoHtmlTable';

class App extends React.Component {
    public render() {
        return (
            <div className="app-container">
                <h1>SQLize HTML tables</h1>
                <SqlRunner />
                <DemoHtmlTable />
            </div>
        );
    }
}

export default App;
