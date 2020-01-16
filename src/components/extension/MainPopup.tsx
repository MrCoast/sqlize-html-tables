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
import sql from 'sql.js';
import sqlService from 'services/SqlService';
import HtmlTablesDataImportStrategy from 'data-import-strategies/HtmlTablesDataImportStrategy';
import SqlSelectResult from 'components/demo/SqlSelectResult';

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
    const sqlQueryTextareaRef = React.createRef();
    const [sqlSelectResult, setSqlSelectResult] = React.useState<sql.IDatabaseSelectResult | null>(null);

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

    const onRunSqlClick = () => {
        const codeTextArea = sqlQueryTextareaRef.current as HTMLTextAreaElement;
        const sqlCode = codeTextArea!.value;

        try {
            const selectResult = sqlService.execSql(sqlCode)[0];

            if (!selectResult) {
                throw new Error('No SQL query was executed.');
            }

            console.log(selectResult);
            setSqlSelectResult(selectResult);
        } catch (e) {
            console.error(e);
        }
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
                        <tr><td><TextField inputRef={sqlQueryTextareaRef} variant="outlined" multiline rowsMax="4" rows="2" placeholder="SELECT * FROM table_1" style={{width: '100%'}} /></td></tr>
                        <tr><td><Button onClick={onRunSqlClick} variant="contained" color="primary">Run SQL</Button></td></tr>
                    </table>
                </ExpansionPanelDetails>
            </ExpansionPanel>
            <ExpansionPanel defaultExpanded>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography variant="subtitle1">SQL Result</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    { sqlSelectResult && <SqlSelectResult selectResult={sqlSelectResult} /> }
                </ExpansionPanelDetails>
            </ExpansionPanel>
        </div>
    );
}
