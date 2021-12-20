import React from 'react';

import "./Status.scss";

export default class UnknownStatus extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    updateStatus(values) {
        console.log("Unknown preset");
        console.log(values);
    }

    render() {
        return (
            <table className="pf-c-table pf-m-grid-md pf-m-compact">
                <tbody>
                    <tr>
                        <th>&nbsp;</th>
                        <td>&nbsp;</td>
                    </tr>
                    <tr>
                        <th>&nbsp;</th>
                        <td>&nbsp;</td>
                    </tr>
                    <tr>
                        <th>&nbsp;</th>
                        <td width="200px">&nbsp;</td>
                    </tr>
                    <tr>
                        <th>&nbsp;</th>
                        <td>&nbsp;</td>
                    </tr>
                </tbody>
            </table>
        );
    }
}
