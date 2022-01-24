import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@patternfly/react-core';

import "./PresetSelection.scss";

export default class PresetSelection extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            presetSelected: this.props.value
        }
        this.description = "";

        this.handlePresetSelectClick = this.handlePresetSelectClick.bind(this);
    }
  
    handlePresetSelectClick = (event, value) => {
        this.setState({ presetSelected: value });

        if(value === "podman") {
            this.description = this.props.podmanDescription;
        }
        if(value === "openshift") {
            this.description = this.props.openshiftDescription;
        }

        if(this.props.onChanged !== null) {
            this.props.onChange(value);
        }
    };

    componentWillReceiveProps(nextProps) {
        this.setState({
           presetSelected: nextProps.value
        })
      }

    render() {
        var compactTemplate = (
            <>
                <div role="group">
                    <Button className="preset-selection-button-compact"
                        variant={ (this.state.presetSelected === "openshift") ? "primary" : "secondary" }
                        onClick={ event => this.handlePresetSelectClick(event, 'openshift') }>OpenShift</Button>
                    <Button className="preset-selection-button-compact"
                        variant={ (this.state.presetSelected === "podman") ? "primary" : "secondary" }
                        onClick={ event => this.handlePresetSelectClick(event, 'podman') }>Podman</Button>
                </div>
                <span className="preset-description">{this.description}</span>
            </>
        )

        var regularTemplate = (
            <>
                <div role="group">
                    <Button isLarge className="preset-selection-button"
                        variant={ (this.state.presetSelected === "openshift") ? "primary" : "secondary" }
                        onClick={ event => this.handlePresetSelectClick(event, 'openshift') }>OpenShift</Button>
                    <span className="preset-description">{this.props.openshiftDescription}</span>
                    <Button isLarge className="preset-selection-button"
                        variant={ (this.state.presetSelected === "podman") ? "primary" : "secondary" }
                        onClick={ event => this.handlePresetSelectClick(event, 'podman') }>Podman</Button>
                    <span className="preset-description">{this.props.podmanDescription}</span>
                </div>
            </>
        )

        return (
            this.props.isCompact ? compactTemplate : regularTemplate
        );
    }
}


PresetSelection.propTypes = {
    value: PropTypes.string,
    podmanDescription: PropTypes.string,
    openshiftDescription: PropTypes.string,
    onChange: PropTypes.func
}

PresetSelection.defaultProps = {
    value: "unknown",
    podmanDescription: "This option will allow you to use podman to run containers inside a VM environment.",
    openshiftDescription: "This option will run a full cluster environment as a single node, providing a registry, monitoring and access to Operator Hub"
}; 