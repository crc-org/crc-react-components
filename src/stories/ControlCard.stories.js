import React from 'react';
import ControlCard from '../components/ControlCard';

export default {
  title: 'Example/ControlCard',
  component: ControlCard,
  argTypes: {
  },
};

const Template = (args) => <ControlCard {...args} />;

export const Default = Template.bind({});
Default.args = {
};
