import React from 'react';
import PropTypes from 'prop-types';
import {
    Card, CardTitle, CardBody, CardFooter,
} from '@patternfly/react-core';
import Actions from './Actions.jsx'
import Status from './Status.jsx'

import "./ControlCard.scss";

export default class ControlCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            CrcStatus: this.props.status
        };

        this.updateStatus = this.updateStatus.bind(this);
        this.status = React.createRef();
        this.actions = React.createRef();
    }

    updateStatus(values) {
        this.status.current.updateStatus(values);
    }
    
    componentWillReceiveProps(nextProps) {
        this.setState({
            CrcStatus: nextProps.status
        })
    }

    render() {
        return (
            <Card className="crc-controlcard">
                <CardTitle>CodeReady Containers</CardTitle>
                <CardBody>
                    <Status ref={this.status}
                        preset={this.props.preset}/>
                </CardBody>
                <CardFooter>
                    <Actions ref={this.actions}
                        status={this.state.CrcStatus}
                        onPlayPauseClicked={this.props.onPlayPauseClicked}
                        onDeleteClicked={this.props.onDeleteClicked} />
                </CardFooter>
            </Card>
        );
    }
}

ControlCard.propTypes = {
    preset: PropTypes.string,
    status: PropTypes.string,
    onPlayPauseClicked: PropTypes.func,
    onDeleteClicked: PropTypes.func
};
