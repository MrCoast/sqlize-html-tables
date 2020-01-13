import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    AppBar,
    Button,
    ExpansionPanel,
    ExpansionPanelDetails,
    ExpansionPanelSummary,
    TextField,
    Toolbar,
    Typography,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles(() => ({
    appContainer: {
        width: '400px',
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
            <ExpansionPanel defaultExpanded>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography variant="subtitle1">Available tables</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <TextField variant="outlined" multiline rowsMax="4" rows="4" placeholder="table_1 (id, first_name, last_name)" style={{width: '100%'}} />
                </ExpansionPanelDetails>
            </ExpansionPanel>
            <ExpansionPanel defaultExpanded>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography variant="subtitle1">Run SQL query</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <table style={{width: '100%'}}>
                        <tr><td><TextField variant="outlined" multiline rowsMax="4" rows="2" placeholder="SELECT * FROM table_1" style={{width: '100%'}} /></td></tr>
                        <tr><td><Button variant="contained" color="primary">Run SQL</Button></td></tr>
                    </table>
                </ExpansionPanelDetails>
            </ExpansionPanel>
        </div>
    );
}
