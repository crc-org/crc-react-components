import React from 'react';
import PropTypes from 'prop-types';
import {
    Button,
    Spinner
} from '@patternfly/react-core';
import {
    PlayIcon,
    PauseIcon,
    TrashIcon,
} from '@patternfly/react-icons/dist/esm/icons'

import styles from "./Actions.module.scss";

export default class Actions extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            CrcStatus: this.props.status
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            CrcStatus: nextProps.status
        })
    }

    render() {
        const isRunning = this.state.CrcStatus === "Running";
        const isStarting = this.state.CrcStatus === "Starting";

        return (
            <div className={styles.crcActions}>
                <Button className={styles.playPauseButton}
                    onClick={this.props.onPlayPauseClicked}
                    variant={ isRunning || isStarting ? "secondary" : "primary" } >
                        {
                            isStarting ? <Spinner diameter="16px" isSVG /> : 
                                ( isRunning ? <PauseIcon /> : <PlayIcon /> )
                        }
                </Button>{' '}
                <Button className={styles.deleteButton}
                    onClick={this.props.onDeleteClicked}
                    variant="danger">
                        <TrashIcon />
                </Button>
            </div>
        );
    }
}

Actions.propTypes = {
    status: PropTypes.string,
    onPlayPauseClicked: PropTypes.func,
    onDeleteClicked: PropTypes.func
};
