import React from 'react';
import LogWindow from '../components/LogWindow';

export default {
  title: 'Example/LogWindow',
  component: LogWindow,
  argTypes: {
  },
};

var logWindow = React.createRef();
const Template = (args) => <LogWindow ref={logWindow} {...args} />;

export const Default = Template.bind({});
Default.args = {
};

setInterval(function() {

  logWindow.current.log("Lorem ipsum");

}, 1000);
