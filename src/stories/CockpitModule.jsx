import React from 'react';
import {
    Card,
    Page,
    PageSection,
    Text,
    TextContent
} from '@patternfly/react-core';

import ControlCard from '../components/ControlCard';
import Configuration from '../components/Configuration';
import LogWindow from '../components/LogWindow';

export function CockpitModule() {
    return (
        <Page>
            <PageSection>
                <TextContent>
                    <Text component="h2">Status</Text>
                </TextContent>
                <ControlCard />
            </PageSection>
            <PageSection>
                <TextContent>
                    <Text component="h2">Logs</Text>
                </TextContent>
                <Card style={{ padding: "20px" }}>
                    <LogWindow />
                </Card>
            </PageSection>
            <PageSection>
                <TextContent>
                    <Text component="h2">Configuration</Text>
                </TextContent>
                <Card style={{ padding: "20px" }}>
                    <Configuration />
                </Card>
            </PageSection>
        </Page>
  );
}