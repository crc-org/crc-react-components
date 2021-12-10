import React from 'react';

import { CockpitModule } from './CockpitModule'

export default {
  title: 'Design/Cockpit',
  component: CockpitModule
};

const Template = (args) =>  <CockpitModule {...args} />

export const Default = Template.bind({});
Default.args = {
};
