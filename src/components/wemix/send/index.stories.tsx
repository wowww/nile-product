import React from 'react';

import { ComponentMeta, ComponentStory } from '@storybook/react';

import { WemixSend } from './index';

export default {
  title: 'Molecule/Token/Wemix/Send',
  component: WemixSend,
} as ComponentMeta<typeof WemixSend>;

const Template: ComponentStory<typeof WemixSend> = (args) => <WemixSend {...args} />;

export const Default = Template.bind({});

Default.args = {
  to: '0x9C8F96905eB0089061bA7EB618248fE35c037407',
  value: 0.1,
};
