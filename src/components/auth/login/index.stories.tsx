import React from 'react';

import { ComponentMeta, ComponentStory } from '@storybook/react';

import { Login } from './index';

export default {
  title: 'Organism/Login',
  component: Login,
} as ComponentMeta<typeof Login>;

const Template: ComponentStory<typeof Login> = (args) => <Login {...args} />;

export const Default = Template.bind({});

Default.args = {
  children: 'Button',
};
