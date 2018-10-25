import * as React from 'react';
import * as PropTypes from 'prop-types';
import sql from 'sql.js';

interface ISqlSelectResultProps {
    className?: string;
    selectResult: sql.DatabaseSelectResult;
}

class SqlSelectResult extends React.PureComponent<ISqlSelectResultProps> {
    protected static propTypes = {
        className: PropTypes.string,
        selectResult: PropTypes.object.isRequired,
    };

    public render() {
        return (
            <div className="sql-select-result">
                <h3>Select result</h3>
                {this.renderTable()}
            </div>
        );
    }

    private renderTable() {
        return (
            <table className={this.props.className}>
                {this.renderThead()}
                {this.renderTbody()}
            </table>
        );
    }

    private renderThead() {
        return (
            <thead>
                {this.renderRow(this.props.selectResult.columns)}
            </thead>
        );
    }

    private renderTbody() {
        return (
            <tbody>
                {this.props.selectResult.values.map((row, index) => this.renderRow(row, index + 1))}
            </tbody>
        );
    }

    private renderRow(values: any[], index: number = 0) {
        return (
            <tr key={index}>
                {values.map((value, cellIndex) => (
                    <td key={cellIndex}>
                        {value === null ? '(NULL)' : value}
                    </td>
                ))}
            </tr>
        );
    }
}

export default SqlSelectResult;
