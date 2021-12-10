import React from 'react';
import LogWindow from '../components/LogWindow';

export default {
  title: 'Example/LogWindow',
  component: LogWindow,
  argTypes: {
  },
};

const Template = (args) => <LogWindow {...args} />;

export const Default = Template.bind({});
Default.args = {
};
