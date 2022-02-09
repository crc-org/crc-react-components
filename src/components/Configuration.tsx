import React from 'react';
import PropTypes from 'prop-types';
import {
    Button,
    Form, FormGroup,
    TextInput, NumberInput,
    Checkbox,
    Tab, Tabs, TabTitleText,
    TabContentBody
} from '@patternfly/react-core';

import "./Configuration.scss";
import PresetSelection from './PresetSelection';

export interface ConfigurationProps {
    readonly height: number;
    readonly textInputWidth: number;
    onPullsecretChangeClicked: (event: React.SyntheticEvent) => void;
    onSaveClicked: (state: State) => void;
    onResetClicked: () => void;
}

export interface State {
    readonly activeTabKey: number;
    readonly preset: string;
    readonly cpus: number;
    readonly memory: number;
    readonly 'disk-size': number;
    readonly 'consent-telemetry': string;
    readonly 'http-proxy': string;
    readonly 'https-proxy': string;
    readonly 'no-proxy': string;
    readonly "proxy-ca-file": string;
    readonly [key: string]: string | number;
}
export default class Configuration extends React.Component<ConfigurationProps> {
    static propTypes = {
        onValueChanged: PropTypes.func,
        onSaveClicked: PropTypes.func,
        onResetClicked: PropTypes.func,
        onPullsecretChangeClicked: PropTypes.func,
        height: PropTypes.string,
        textInputWidth: PropTypes.string
    };

    static defaultProps = {
        height: "300px",
        textInputWidth: "320px"
    };

    state: State;
    constructor(props: ConfigurationProps) {
        super(props);
        this.state = {
            activeTabKey: 0,
            preset: "unknown",
            cpus: 0,
            memory: 0,
            'disk-size': 0,
            'consent-telemetry': "no",
            'http-proxy': "",
            'https-proxy': "",
            'no-proxy': "",
            "proxy-ca-file": ""
        };

        this.configurationSaveClicked = this.configurationSaveClicked.bind(this);
        this.configurationResetClicked = this.configurationResetClicked.bind(this);
        this.handleTabClick = this.handleTabClick.bind(this);

        this.updateClampedValue = this.updateClampedValue.bind(this);
        this.updateValue = this.updateValue.bind(this);
    }

    // Toggle currently active tab
    handleTabClick(event: React.SyntheticEvent, tabIndex: number | string): void {
        this.setState({
            activeTabKey: tabIndex
        });
    };

    updateValues(values: State) {
        const self = this; // make sure 'self' references to this
        Object.entries(values).forEach(function(value) {
            self.updateValue(value[0], value[1]);
        });
    }

    updateClampedValue(key: string, min: number, value: number): void {
        if(value < min) {
            value = min;
        }
        this.updateValue(key, value);
    }

    updateValue(key: string, value: unknown) {
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
        const {activeTabKey } = this.state;

        const tabStyle = {
            height: this.props.height,
        }

        const proxyInputStyle = {
            width: this.props.textInputWidth
        }

        return (
            <div>
                <Tabs activeKey={activeTabKey} onSelect={this.handleTabClick} isBox={true}>

                    <Tab eventKey={0} title={<TabTitleText>Basic</TabTitleText>}>
                        <TabContentBody style={tabStyle} hasPadding>
                            <Form isHorizontal>
                                <FormGroup fieldId='settings-cpu' label="CPU">
                                    <NumberInput id='settings-cpu'
                                        className="cpus"
                                        inputName="cpus"
                                        minusBtnAriaLabel="minus"
                                        plusBtnAriaLabel="plus"
                                        unit=""
                                        min={1}
                                        value={this.state.cpus}
                                        widthChars={5}
                                        onPlus={event => this.updateValue('cpus', this.state.cpus + 1)}
                                        onMinus={event => this.updateClampedValue('cpus', 1, this.state.cpus - 1)}
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
                                        min={8192}
                                        value={this.state.memory}
                                        widthChars={5}
                                        onPlus={event => this.updateValue('memory', this.state.memory + 512)}
                                        onMinus={event => this.updateClampedValue('memory', 2048, this.state.memory - 512)}
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
                                        min={20}
                                        value={this.state["disk-size"]}
                                        widthChars={5}
                                        onPlus={event => this.updateValue('disk-size', this.state["disk-size"] + 1)}
                                        onMinus={event => this.updateClampedValue('disk-size', 10, this.state["disk-size"] - 1)}
                                        onChange={value => this.state['disk-size'] }
                                        />
                                </FormGroup>
                                <FormGroup fieldId='settings-preset' label="Preset">
                                    <PresetSelection id="settings-preset" isCompact
                                        className="preset"
                                        value={this.state["preset"]}
                                        onPresetChange={value => this.updateValue('preset', value)} />
                                </FormGroup>
                            </Form>
                        </TabContentBody>
                    </Tab>

                    <Tab eventKey={1} title={<TabTitleText>Other</TabTitleText>}>
                        <TabContentBody style={tabStyle} hasPadding>
                            <Form isHorizontal>
                                <FormGroup fieldId='config-telemetry' label="Telemetry">
                                    <Checkbox id='config-consentTelemetry'
                                        className="consentTelemetry"
                                        isChecked={this.state["consent-telemetry"] === "yes" ? true : false }
                                        onChange={value => this.updateValue('consent-telemetry', value === true ? "yes" : "no")}
                                        label="Report telemetry to Red Hat"
                                        description="Consent to allow basic information about the system and cluster to be collected for development and debugging purposes" />
                                </FormGroup>
                            </Form>
                        </TabContentBody>
                    </Tab>
                    
                    <Tab eventKey={2} title={<TabTitleText>Proxy</TabTitleText>}>
                        <TabContentBody style={tabStyle} hasPadding>
                            <Form isHorizontal>
                                <FormGroup fieldId='config-proxy' label="HTTP proxy">
                                    <TextInput style={proxyInputStyle} id='config-http-proxy'
                                            className="proxy"
                                            value={this.state["http-proxy"]}
                                            onChange={value => this.updateValue('http-proxy', value)} />
                                </FormGroup>
                                <FormGroup fieldId='config-proxy' label="HTTPS proxy">
                                    <TextInput style={proxyInputStyle} id='config-https-proxy'
                                            className="proxy"
                                            value={this.state["https-proxy"]}
                                            onChange={value => this.updateValue('https-proxy', value)} />
                                </FormGroup>
                                <FormGroup fieldId='config-proxy' label="No proxy">
                                    <TextInput style={proxyInputStyle} id='config-no-proxy'
                                            className="proxy"
                                            value={this.state["no-proxy"]}
                                            onChange={value => this.updateValue('no-proxy', value)} />
                                </FormGroup>
                                <FormGroup fieldId='config-proxy' label="Proxy CA file">
                                    <TextInput style={proxyInputStyle} id='config-proxy-ca-file'
                                            className="proxy"
                                            value={this.state["proxy-ca-file"]}
                                            onChange={value => this.updateValue('proxy-ca-file', value)} />
                                </FormGroup>
                            </Form>
                        </TabContentBody>
                    </Tab>

                    <Tab eventKey={3} title={<TabTitleText>OpenShift</TabTitleText>} isDisabled={ this.state.preset !== "openshift" }>                    
                      <TabContentBody style={tabStyle} hasPadding>
                            <Form isHorizontal>
                                <FormGroup fieldId='config-pullsecret' label="Pullsecret">
                                    <Button onClick={this.props.onPullsecretChangeClicked} variant="primary">Change</Button>
                                </FormGroup>
                            </Form>
                        </TabContentBody>
                    </Tab>

                </Tabs>

                <div style={{textAlign:"right"}}>
                    <Button variant="primary" onClick={this.configurationSaveClicked}>Save</Button>
                    <Button variant="link" onClick={this.configurationResetClicked}>Reset</Button>
                </div>
            </div>
        );
    }
}
