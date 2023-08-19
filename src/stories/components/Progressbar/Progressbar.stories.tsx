import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import ProgressbarComp from './Progressbar.component';

export default {
    title: 'ProgressbarComp',
    component: ProgressbarComp,
    argTypes: {},
} as ComponentMeta<typeof ProgressbarComp>;

const Template: ComponentStory<typeof ProgressbarComp> = () => {
    return <ProgressbarComp progress={20} variant="determinate" />;
};

export const Progressbar = Template.bind({});
