// import * as $ from 'jquery';
const $ = require('jquery');
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
import sqlService from 'services/SqlService';
import HtmlTablesDataImportStrategy from 'data-import-strategies/HtmlTablesDataImportStrategy';

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

const fetchDOM = () => document.body.outerHTML;

declare var chrome: any;

export default function MainPopup() {
    const classes = useStyles();

    const [pageDOMContent, setPageDOMContent] = React.useState('');

    const onScanPageClick = () => {
        chrome.tabs.executeScript({
            code: '(' + fetchDOM + ')();',
        }, (results: any[]) => {
            const r = processPageDOMContent(results[0]);
            setPageDOMContent(r);
        });
    };

    const processPageDOMContent = (domContent: string) => {
        const jqDocument = $(domContent);
        const tables = jqDocument.find('table').toArray();

        sqlService.importData(new HtmlTablesDataImportStrategy(tables));

        const availableSqlTables = sqlService.getAvailableTables();

        const availableSqlTablesSummary = availableSqlTables.map((sqlTableName) => {
            const columnsSummary = sqlService
                .getColumnsInTable(sqlTableName)
                .map((columnSummary) => `  ${columnSummary}`)
                .join(`\n`);

            return `${sqlTableName}\n${columnsSummary}`;
        }).join(`\n`);
        console.log(availableSqlTablesSummary);

        return availableSqlTablesSummary;
    };

    return (
        <div className={classes.appContainer}>
            <AppBar position="sticky">
                <Toolbar>
                    <Typography variant="caption" className={classes.title}>SQLize HTML tables</Typography>
                    <Button onClick={onScanPageClick} variant="contained" className={classes.scanPageButton}>Scan page</Button>
                </Toolbar>
            </AppBar>
            <ExpansionPanel defaultExpanded>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography variant="subtitle1">Available tables</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <TextField variant="outlined" multiline rowsMax="4" rows="4" placeholder="table_1 (id, first_name, last_name)" value={pageDOMContent} style={{width: '100%'}} />
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
