import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import LabelComp from './Label.component';

export default {
    title: 'Label',
    component: LabelComp,
    argTypes: {},
} as ComponentMeta<typeof LabelComp>;

const Template: ComponentStory<typeof LabelComp> = (args) => {
    return <LabelComp {...args}></LabelComp>;
};

export const Label: ComponentStory<typeof LabelComp> = Template.bind({});
Label.args = {
    children: 'Label',
    isRequired: true,
    htmlFor: 'label',
};
