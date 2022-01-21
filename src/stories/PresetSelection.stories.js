import React from 'react';
import PresetSelection from '../components/PresetSelection';

export default {
  title: 'Example/PresetSelection',
  component: PresetSelection,
  argTypes: {
  },
};

const Template = (args) => <PresetSelection {...args} />;

export const Default = Template.bind({});
Default.args = {
};
