import React from 'react';
import PropTypes from 'prop-types';

import "./LogWindow.scss";

export default class LogWindow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            log: "",
        };

        this.log = this.log.bind(this);
        this.clear = this.clear.bind(this);
    }

    log(value) {
        const oldstate = this.state.log;
        // prevent double newlines
        const newline = value.endsWith("\n") ? "" : "\r\n";
        const newState = { log: oldstate + value + newline };
        this.setState(newState);
    }

    clear() {
        const newState = { log: "" };
        this.setState(newState);
    }

    render() {
        const style = {
            backgroundColor: "black",
            color: "white"
        };

        return (
            <div>
                <textarea style={style} rows={this.props.rows} cols={this.props.cols} name="crc-log" readOnly value={this.state.log} />
            </div>
        );
    }
}

LogWindow.propTypes = {
    rows: PropTypes.number,
    cols: PropTypes.number
  };
  
LogWindow.defaultProps = {
    rows: 20,
    cols: 80
};