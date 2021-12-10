import React from 'react';
import Status from '../components/Status';

export default {
  title: 'Example/Status',
  component: Status,
  argTypes: {
  },
};

const Template = (args) => <Status {...args} />;

export const Default = Template.bind({});
Default.args = {
};
