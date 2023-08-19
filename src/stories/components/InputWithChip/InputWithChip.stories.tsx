import React, { useState } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import InputWithChipComponent from './InputWithChip.component';

export default {
    title: 'InputWithChipComp',
    component: InputWithChipComponent,
    argTypes: {},
} as ComponentMeta<typeof InputWithChipComponent>;

const Template: ComponentStory<typeof InputWithChipComponent> = (args) => {
    const [value, setValue] = useState(['Apple', 'Banana']);

    const onBeforeAddValidation = (e) => {
        return true;
    };

    const handleOnChange = (e) => {
        setValue(e);
    };

    return (
        <InputWithChipComponent
            placeholder={'Enter Emails...'}
            defaultValue={value}
            onChange={(e) => handleOnChange(e)}
            onBeforeAdd={(e) => onBeforeAddValidation(e)}
            error={true}
            helperText="Please add min 4 fruits"
        />
    );
};

export const InputWithChip: ComponentStory<typeof InputWithChipComponent> = Template.bind({});
