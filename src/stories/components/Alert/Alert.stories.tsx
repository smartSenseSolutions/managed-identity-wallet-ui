import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import AlertComp from './Alert.component';

export default {
    title: 'Alert',
    component: AlertComp,
    argTypes: {},
} as ComponentMeta<typeof AlertComp>;

const Template: ComponentStory<typeof AlertComp> = (args) => <AlertComp {...args} />;

export const AlertCompoent = Template.bind({});
AlertCompoent.args = {
    type: 'success',
};
