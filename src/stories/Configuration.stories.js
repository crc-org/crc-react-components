import React from 'react';
import Configuration from '../components/Configuration';

export default {
  title: 'Example/Configuration',
  component: Configuration,
  argTypes: {
  },
};

const Template = (args) => <Configuration {...args} />;

export const Default = Template.bind({});
Default.args = {
  
};
