import React from 'react';
import PropTypes from 'prop-types';
import {
    Button,
    Form, FormGroup,
    TextInput,
    ActionGroup, Checkbox
} from '@patternfly/react-core';

import "./Configuration.scss";

export default class Configuration extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cpus: 0,
            memory: 0,
            "disk-size": 0,
            "consent-telemetry": false,
        };

        this.configurationSaveClicked = this.configurationSaveClicked.bind(this);
        this.configurationResetClicked = this.configurationResetClicked.bind(this);
        this.updateValue = this.updateValue.bind(this);

        this.pullsecretInput = React.createRef();
    }

    updateValues(values) {
        const self = this; // make sure 'self' references to this
        Object.entries(values).forEach(function(value) {
            self.updateValue(value[0], value[1]);
        });
    }

    updateValue(key, value) {
        if(this.state["" + key] !== undefined) {
            const newState = { ["" + key]: value };
            this.setState(newState);
        }
    }

    configurationSaveClicked() {
        this.props.onSaveClicked(this.state);
    }

    configurationResetClicked() {
        this.props.onResetClicked();
    }

    render() {
        return (
            <div>
                <Form isHorizontal isWidthLimited>
                    <FormGroup fieldId='config-cpu' label="CPU">
                        <TextInput id='config-cpu'
                            className="cpus"
                            value={this.state.cpus}
                            onChange={value => this.props.onValueChanged(this, 'cpus', value)} />
                    </FormGroup>
                    <FormGroup fieldId='config-memory' label="Memory">
                        <TextInput id='config-memory'
                            className="memory"
                            value={this.state.memory}
                            onChange={value => this.props.onValueChanged(this, 'memory', value)} />
                    </FormGroup>
                    <FormGroup fieldId='config-disksize' label="Disk size">
                        <TextInput id='config-disksize'
                            className="disksize"
                            value={this.state["disk-size"]}
                            onChange={value => this.props.onValueChanged(this, 'disk-size', value)} />
                    </FormGroup>
                    <FormGroup fieldId='config-telemetry' label="Telemetry">
                        <Checkbox id='config-consentTelemetry'
                            className="consentTelemetry"
                            value={this.state["consent-telemetry"]}
                            onChange={value => this.props.onValueChanged(this, 'consent-telemetry', value)}
                            label="Report telemetry to Red Hat"
                            description="Consent to allow basic information about the system and cluster to be collected for development and debugging purposes" />
                    </FormGroup>
                    <ActionGroup>
                        <Button variant="primary" onClick={this.configurationSaveClicked}>Save</Button>
                        <Button variant="link" onClick={this.configurationResetClicked}>Reset</Button>
                    </ActionGroup>
                    <FormGroup fieldId='config-pullsecret' label="Pullsecret">
                        <Button onClick={this.props.onPullsecretChangeClicked} variant="primary">Change</Button>
                    </FormGroup>
                </Form>
            </div>
        );
    }
}

Configuration.propTypes = {
    onValueChanged: PropTypes.func,
    onSaveClicked: PropTypes.func,
    onResetClicked: PropTypes.func,
    onPullsecretChangeClicked: PropTypes.func
};
