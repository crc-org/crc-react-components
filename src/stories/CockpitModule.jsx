import React from 'react';
import {
    Card,
    Page,
    PageSection
} from '@patternfly/react-core';

import Status from '../components/Status';
import Settings from '../components/Settings';
import LogWindow from '../components/LogWindow';
import Actions from '../components/Actions';

export function CockpitModule() {
    return (
        <Page>
            <PageSection>
                <Status />

                <Card>
                    <Actions />
                </Card>
            </PageSection>
            <PageSection>
                <Card>
                    <LogWindow />
                </Card>
                <Card>
                    <Settings />
                </Card>
            </PageSection>
        </Page>
  );
}