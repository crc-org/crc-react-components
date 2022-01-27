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

        this.textAreaLog = React.createRef();
    }

    componentDidUpdate() {
        this.textAreaLog.current.scrollTop = this.textAreaLog.current.scrollHeight;
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
            color: "white",
            resize: "none",
            border: "0px"
        };

        if (this.props.width !== "") {
            style.width = this.props.width
        }
        if (this.props.height !== "") {
            style.height = this.props.height
        }

        return (
            <div>
                <textarea ref={this.textAreaLog} 
                    style={style} readOnly 
                    rows={this.props.rows} cols={this.props.cols} name="crc-log"
                    value={this.state.log}
                    />
            </div>
        );
    }
}

LogWindow.propTypes = {
    rows: PropTypes.number,
    cols: PropTypes.number,
    width: PropTypes.string,
    height: PropTypes.string
};
  
LogWindow.defaultProps = {
    rows: 20,
    cols: 80
};