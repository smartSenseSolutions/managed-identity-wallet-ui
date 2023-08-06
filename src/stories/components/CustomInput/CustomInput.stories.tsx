import { ComponentMeta, ComponentStory } from '@storybook/react';
import Grid from '../Grid';
import CustomInput from './CustomInput.component';

export default {
    title: 'Input',
    component: CustomInput,
    argTypes: {
        type: {
            options: ['text', 'number', 'password', 'email', 'file', 'datetime-local'],
            control: 'select',
        },
    },
} as ComponentMeta<typeof CustomInput>;

const Template: ComponentStory<typeof CustomInput> = (args) => {
    return (
        <Grid>
            <CustomInput type="text" placeholder="Regular State" {...args}></CustomInput>
            <CustomInput
                type="text"
                placeholder="Helper State"
                helperText="Helper Text"
                error={false}
                {...args}
            ></CustomInput>
            <CustomInput
                type="text"
                placeholder="Validation State"
                helperText="Helper Text"
                error={true}
                {...args}
            ></CustomInput>
            <CustomInput type="text" disabled={true} {...args} placeholder={'This field is disabled'}></CustomInput>
            <CustomInput
                type="text"
                placeholder="Validation State"
                helperText="Helper Text"
                error={true}
                required={true}
                label={'Required'}
                {...args}
            ></CustomInput>
            <CustomInput
                type="text"
                placeholder="Validation State"
                helperText="Helper Text"
                error={true}
                label={'Required'}
                {...args}
            ></CustomInput>
        </Grid>
    );
};

export const CustomInputs = Template.bind({});
