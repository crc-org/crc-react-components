import React from 'react';
import PropTypes from 'prop-types';
import PodmanStatus from './PodmanStatus.jsx';
import OpenShiftStatus from './OpenShiftStatus.jsx';

import "./Status.scss";

export default class Status extends React.Component {
    constructor(props) {
        super(props);

        this.status = React.createRef();
    }

    updateStatus(values) {
        this.status.current.updateStatus(values);
    }

    render() {
        if(this.props.preset === "podman") {
            return <PodmanStatus ref={this.status} />
        } else 
        if(this.props.preset === "openshift") {
            return <OpenShiftStatus ref={this.status} />
        }

        return(
            <>
                Unknown preset
            </>
        );
    }
}

Status.propTypes = {
    preset: PropTypes.string
};
