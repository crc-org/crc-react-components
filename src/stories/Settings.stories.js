import React from 'react';
import Settings from '../components/Settings';

export default {
  title: 'Example/Settings',
  component: Settings,
  argTypes: {
  },
};

const Template = (args) => <Settings {...args} />;

export const Default = Template.bind({});
Default.args = {
};
