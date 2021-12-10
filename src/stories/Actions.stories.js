import React from 'react';
import Actions from '../components/Actions';

export default {
  title: 'Example/Actions',
  component: Actions,
  argTypes: {
  },
};

const Template = (args) => <Actions {...args} />;

export const Default = Template.bind({});
Default.args = {
};
