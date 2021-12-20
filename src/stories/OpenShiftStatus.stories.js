import React from 'react';
import OpenShiftStatus from '../components/OpenShiftStatus';

export default {
  title: 'Example/OpenShiftStatus',
  component: OpenShiftStatus,
  argTypes: {
  },
};

const Template = (args) => <OpenShiftStatus {...args} />;

export const Default = Template.bind({});
Default.args = {
};
