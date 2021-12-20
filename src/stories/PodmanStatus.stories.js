import React from 'react';
import PodmanStatus from '../components/PodmanStatus';

export default {
  title: 'Example/PodmanStatus',
  component: PodmanStatus,
  argTypes: {
  },
};

const Template = (args) => <PodmanStatus {...args} />;

export const Default = Template.bind({});
Default.args = {
};
