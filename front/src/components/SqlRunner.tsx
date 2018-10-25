import * as React from 'react';
import Modal from 'react-responsive-modal';
import sql from 'sql.js';
import SqlSelectResult from 'components/SqlSelectResult';
import sqlService from 'services/SqlService';

interface ISqlRunnerProps {
}

interface ISqlRunnerState {
    isModalOpen: boolean;
    selectResult: sql.DatabaseSelectResult | null;
}

class SqlRunner extends React.PureComponent<ISqlRunnerProps, ISqlRunnerState> {
    private codeTextAreaRef: React.RefObject<HTMLTextAreaElement>;

    constructor(props: ISqlRunnerProps) {
        super(props);

        this.state = {
            isModalOpen: false,
            selectResult: null,
        };

        this.codeTextAreaRef = React.createRef();
    }

    public render() {
        return (
            <div className="sql-select-result">
                <textarea ref={this.codeTextAreaRef} cols={120} rows={20}></textarea>
                <button onClick={() => this.onRunButtonClick()}>RUN</button>

                <Modal open={this.state.isModalOpen} onClose={() => this.onCloseModal()} center>
                    {this.state.selectResult !== null &&
                        <SqlSelectResult
                            className="test-table"
                            selectResult={this.state.selectResult}
                        />
                    }
                </Modal>
            </div>
        );
    }

    private onRunButtonClick() {
        const codeTextArea = this.codeTextAreaRef.current as HTMLTextAreaElement;
        const sqlCode = codeTextArea.value;

        try {
            const selectResult = sqlService.execSql(sqlCode)[0];

            if (!selectResult) {
                throw new Error('No SQL query was executed.');
            }

            this.setState({
                isModalOpen: true,
                selectResult,
            });
        } catch (e) {
            console.error(e);
        }
    }

    private onCloseModal() {
        this.setState({
            isModalOpen: false,
            selectResult: null,
        });
    }
}

export default SqlRunner;
