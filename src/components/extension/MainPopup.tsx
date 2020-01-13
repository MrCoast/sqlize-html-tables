import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    AppBar,
    Button,
    Toolbar,
    Typography,
} from '@material-ui/core';

const useStyles = makeStyles(() => ({
    appContainer: {
        width: '400px',
        height: '400px',
        flexGrow: 1,
    },
    title: {
        flexGrow: 1,
    },
    scanPageButton: {
        flexGrow: 1,
    },
}));

export default function MainPopup() {
    const classes = useStyles();

    return (
        <div className={classes.appContainer}>
            <AppBar position="sticky">
                <Toolbar>
                    <Typography variant="caption" className={classes.title}>SQLize HTML tables</Typography>
                    <Button variant="contained" className={classes.scanPageButton}>Scan page</Button>
                </Toolbar>
            </AppBar>
        </div>
    );
}
