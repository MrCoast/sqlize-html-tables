import * as React from 'react';
import SqlRunner from 'components/demo/SqlRunner';
import DemoHtmlTable from 'components/demo/DemoHtmlTable';

class App extends React.Component {
    public render() {
        return (
            <div className="app-container">
                <h1>SQLize HTML tables Demo</h1>
                <SqlRunner />
                <DemoHtmlTable />
            </div>
        );
    }
}

export default App;
