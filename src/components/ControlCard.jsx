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

        this.updateStatus = this.updateStatus.bind(this);
        this.status = React.createRef();
        this.actions = React.createRef();
    }

    updateStatus(values) {
        this.status.current.updateStatus(values);
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
                        onStartClicked={this.props.onStartClicked}
                        onStopClicked={this.props.onStopClicked}
                        onDeleteClicked={this.props.onDeleteClicked} />
                </CardFooter>
            </Card>
        );
    }
}

ControlCard.propTypes = {
    preset: PropTypes.string,
    onStartClicked: PropTypes.func,
    onStopClicked: PropTypes.func,
    onDeleteClicked: PropTypes.func
};
