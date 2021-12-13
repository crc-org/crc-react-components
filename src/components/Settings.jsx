import React from 'react';
import PropTypes from 'prop-types';
import {
    Button,
    Form, FormGroup,
    TextInput, NumberInput,
    ActionGroup, Checkbox
} from '@patternfly/react-core';

import "./Settings.scss";

export default class Settings extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cpus: 0,
            memory: 0,
            'disk-size': 0,
        };

        this.pullsecretChangeClicked = this.pullsecretChangeClicked.bind(this);
        this.settingsSaveClicked = this.settingsSaveClicked.bind(this);
        this.settingsResetClicked = this.settingsResetClicked.bind(this);
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
        const newState = { ["" + key]: value };
        this.setState(newState);
    }

    pullsecretChangeClicked() {
        const value = this.pullsecretInput.current.value;
        this.props.onValueChanged(this, 'pullsecretContent', value);
    }

    settingsSaveClicked() {
        this.props.onSaveClicked(this.state);
    }

    settingsResetClicked() {
        this.props.onResetClicked();
    }

    render() {
        return (
            <div>
                <Form isHorizontal isWidthLimited>
                    <FormGroup fieldId='settings-cpu' label="CPU">
                        <NumberInput id='settings-cpu'
                            className="cpus"
                            inputName="cpus"
                            minusBtnAriaLabel="minus"
                            plusBtnAriaLabel="plus"
                            unit=""
                            value={this.state.cpus}
                            widthChars={5}
                            onPlus={event => this.updateValue('cpus', this.state.cpus + 1)}
                            onMinus={event => this.updateValue('cpus', this.state.cpus - 1)}
                            onChange={value => this.props.onValueChanged(this, 'cpus', value)} />
                    </FormGroup>
                    <FormGroup fieldId='settings-memory' label="Memory">
                        <NumberInput id='settings-memory'
                            className="memory"
                            inputName="memory"
                            minusBtnAriaLabel="minus"
                            plusBtnAriaLabel="plus"
                            unit="MiB"
                            value={this.state.memory}
                            widthChars={5}
                            onPlus={event => this.updateValue('memory', this.state.memory + 512)}
                            onMinus={event => this.updateValue('memory', this.state.memory - 512)}
                            onChange={value => this.props.onValueChanged(this, 'memory', value)} />
                    </FormGroup>
                    <FormGroup fieldId='settings-disksize' label="Disk size">
                        <NumberInput id='settings-disksize'
                            className="disk-size"
                            inputName="disk-size"
                            minusBtnAriaLabel="minus"
                            plusBtnAriaLabel="plus"
                            unit="GB"
                            value={this.state["disk-size"]}
                            widthChars={5}
                            onPlus={event => this.updateValue('disk-size', this.state["disk-size"] + 1)}
                            onMinus={event => this.updateValue('disk-size', this.state["disk-size"] - 1)}
                            onChange={value => this.props.onValueChanged(this, 'disk-size', value)} />
                    </FormGroup>
                    <FormGroup fieldId='settings-telemetry' label="Telemetry">
                        <Checkbox id='settings-consentTelemetry'
                            className="consentTelemetry"
                            value={this.state["consent-telemetry"]}
                            onChange={value => this.props.onValueChanged(this, 'consent-telemetry', value)}
                            label="Report telemetry to Red Hat"
                            description="Consent to allow basic information about the system and cluster to be collected for development and debugging purposes" />
                    </FormGroup>
                    <ActionGroup>
                        <Button variant="primary" onClick={this.settingsSaveClicked}>Save</Button>
                        <Button variant="link" onClick={this.settingsResetClicked}>Reset</Button>
                    </ActionGroup>
                    <FormGroup fieldId='settings-pullsecret' label="Pullsecret">
                        <TextInput id='settings-pullsecret'
                            className="pullsecret"
                            value={this.state.pullsecret}
                            ref={this.pullsecretInput}
                            onChange={value => this.props.onValueChanged(this, 'pull-secret', value)} />
                        <Button onClick={this.pullsecretChangeClicked} variant="primary">Change</Button>
                    </FormGroup>
                </Form>
            </div>
        );
    }
}

Button.propTypes = {
    onValueChanged: PropTypes.func,
    onSaveClicked: PropTypes.func,
    onResetClicked: PropTypes.func
};
