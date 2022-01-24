import React from 'react';
import PropTypes from 'prop-types';
import {
    Button,
    Form, FormGroup,
    TextInput, NumberInput,
    ActionGroup, Checkbox
} from '@patternfly/react-core';

import "./Configuration.scss";
import PresetSelection from './PresetSelection.jsx';

export default class Configuration extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            preset: "unknown",
            cpus: 0,
            memory: 0,
            'disk-size': 0,
            'consent-telemetry': false,
            'disk-size': 0,
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
                <Form isHorizontal>
                    <FormGroup fieldId='settings-cpu' label="CPU">
                        <NumberInput id='settings-cpu'
                            className="cpus"
                            inputName="cpus"
                            minusBtnAriaLabel="minus"
                            plusBtnAriaLabel="plus"
                            unit=""
                            min="1"
                            value={this.state.cpus}
                            widthChars={5}
                            onPlus={event => this.updateValue('cpus', this.state.cpus + 1)}
                            onMinus={event => this.updateValue('cpus', this.state.cpus - 1)}
                            onChange={value => this.state['cpus'] } 
                            />
                    </FormGroup>
                    <FormGroup fieldId='settings-memory' label="Memory">
                        <NumberInput id='settings-memory'
                            className="memory"
                            inputName="memory"
                            minusBtnAriaLabel="minus"
                            plusBtnAriaLabel="plus"
                            unit="MiB"
                            min="8192"
                            value={this.state.memory}
                            widthChars={5}
                            onPlus={event => this.updateValue('memory', this.state.memory + 512)}
                            onMinus={event => this.updateValue('memory', this.state.memory - 512)}
                            onChange={value => this.state['memory'] } 
                            />
                    </FormGroup>
                    <FormGroup fieldId='settings-disksize' label="Disk size">
                        <NumberInput id='settings-disksize'
                            className="disk-size"
                            inputName="disk-size"
                            minusBtnAriaLabel="minus"
                            plusBtnAriaLabel="plus"
                            unit="GB"
                            min="20"
                            value={this.state["disk-size"]}
                            widthChars={5}
                            onPlus={event => this.updateValue('disk-size', this.state["disk-size"] + 1)}
                            onMinus={event => this.updateValue('disk-size', this.state["disk-size"] - 1)}
                            onChange={value => this.state['disk-size'] }
                            />
                    </FormGroup>
                    <FormGroup fieldId='settings-preset' label="Preset">
                        <PresetSelection id="settings.preset" isCompact
                            className="preset"
                            inputName="preset"
                            podmanDescription="This option will allow you to use podman to run containers inside a VM environment."
                            openshiftDescription="This option will run a full cluster environment as a single node, providing a registry, monitoring and access to Operator Hub"
                            value={this.state.preset}
                            onChange={value => this.updateValue('preset', value)} />
                    </FormGroup>
                    <FormGroup fieldId='config-telemetry' label="Telemetry">
                        <Checkbox id='config-consentTelemetry'
                            className="consentTelemetry"
                            isChecked={this.state["consent-telemetry"] === "yes" ? true : false }
                            onChange={value => this.updateValue('consent-telemetry', value === true ? "yes" : "no")}
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
