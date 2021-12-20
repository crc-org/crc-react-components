import React from 'react';
import {
    Card,
    Page,
    PageSection
} from '@patternfly/react-core';

import ControlCard from '../components/ControlCard';
import Configuration from '../components/Configuration';
import LogWindow from '../components/LogWindow';

export function CockpitModule() {
    return (
        <Page>
            <PageSection>
                <ControlCard />
            </PageSection>
            <PageSection>
                <Card>
                    <LogWindow />
                </Card>
                <Card>
                    <Configuration />
                </Card>
            </PageSection>
        </Page>
  );
}