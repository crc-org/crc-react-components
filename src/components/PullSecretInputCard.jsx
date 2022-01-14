import PropTypes from 'prop-types';
import React from 'react';
import {
    Card, CardTitle, CardBody, CardFooter,
    TextArea,
    Hint, HintTitle,
    HelperText, HelperTextItem
} from '@patternfly/react-core';
import InfoIcon from '@patternfly/react-icons/dist/esm/icons/info-icon';

import "./PullSecretInputCard.scss";


export default class PullSecretInputCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    
    render() {
        const style = {
            resize: "none",
            height: this.props.height
        };

        return (
            <Card isLarge isPlain>
                <CardTitle>Please provide a pull secret</CardTitle>
                <CardBody>
                    <TextArea id="pullsecretEntry"
                        style={style} autoResize={false}
                        value={this.props.pullsecret} onChange={this.props.onChanged} />
                </CardBody>
                <CardFooter>
                    <Hint>
                        <HintTitle>
                            <HelperText>
                            <HelperTextItem icon={<InfoIcon />}>The pull secret is necessary to allow you to pull container images from the registry.
                                A personal pull secret can be obtained from the <a target="_blank"
                                rel="noreferrer" href="https://cloud.redhat.com/openshift/create/local">CRC download page</a>.
                                Please use the "Copy pull secret" option and paste the content into the field above.</HelperTextItem>
                            </HelperText>
                        </HintTitle>
                    </Hint>
                </CardFooter>
            </Card>
        );
    }
}

PullSecretInputCard.propTypes = {
    pullsecret: PropTypes.string,
    height: PropTypes.string,
    onChanged: PropTypes.func
}

PullSecretInputCard.defaultProps = {
    height: "240px"
};