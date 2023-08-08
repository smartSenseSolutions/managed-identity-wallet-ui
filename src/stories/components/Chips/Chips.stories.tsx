import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Chips from './Chips.component';

export default {
    title: 'Chips',
    component: Chips,
    argTypes: {},
} as ComponentMeta<typeof Chips>;

const Template: ComponentStory<typeof Chips> = (args) => {
    const actionFunctionHandler = () => {
        console.log('You clicked the action icon.');
    };

    return (
        <div style={{ display: 'flex', gap: '2rem' }}>
            <Chips
                {...args}
                label="Outlined Chip"
                variant="outlined"
                actionType={'edit'}
                actionFunction={actionFunctionHandler}
            />
            <Chips {...args} label="Lena Sparks" variant="outlined" actionFunction={actionFunctionHandler} />
        </div>
    );
};

export const Normal = Template.bind({});
