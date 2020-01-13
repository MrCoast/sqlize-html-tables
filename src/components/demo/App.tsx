import * as React from 'react';
import SqlRunner from 'components/demo/SqlRunner';
import DemoHtmlTable from 'components/demo/DemoHtmlTable';
import ExtensionMainPopup from 'components/extension/MainPopup';

class App extends React.Component {
    public render() {
        return (
            <div className="app-container">
                <h1>SQLize HTML tables Demo</h1>
                <SqlRunner />
                <DemoHtmlTable />
                <br />
                <ExtensionMainPopup />
            </div>
        );
    }
}

export default App;
