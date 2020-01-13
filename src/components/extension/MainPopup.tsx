import * as React from 'react';
import { AppBar, Toolbar, Typography } from '@material-ui/core';

class App extends React.Component {
    public render() {
        return (
            <div className="app-container">
                <AppBar position="sticky">
                    <Toolbar>
                        <Typography variant="caption">SQLize HTML tables</Typography>
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}

export default App;
