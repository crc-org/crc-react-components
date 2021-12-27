import React from 'react';
import UnknownStatus from '../components/UnknownStatus';

export default {
  title: 'Example/UnknownStatus',
  component: UnknownStatus,
  argTypes: {
  },
};

const Template = (args) => <UnknownStatus {...args} />;

export const Default = Template.bind({});
Default.args = {
};
