import React from 'react';
import PullSecretInputCard from '../components/PullSecretInputCard';

export default {
  title: 'Example/PullSecretInputCard',
  component: PullSecretInputCard,
  argTypes: {
  },
};

const Template = (args) => <PullSecretInputCard {...args} />;

export const Default = Template.bind({});
Default.args = {
};
