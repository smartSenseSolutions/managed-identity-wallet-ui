import { useState } from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import Grid from '../Grid';
import CustomSelect, { DropdownItem } from './CustomSelect.component';
import { colourOptions } from './MockData';

export default {
    title: 'Dropdown',
    component: CustomSelect,
    argTypes: {},
} as ComponentMeta<typeof CustomSelect>;

const Template: ComponentStory<typeof CustomSelect> = (args) => {
    const [singleValue, setSingleValue] = useState<DropdownItem | null>();
    const [multiValue, setMultiValue] = useState<DropdownItem | null>();
    const [creatableValue, setCreatableValue] = useState<DropdownItem | null>();
    const [newList, setNewList] = useState<DropdownItem[] | null>(colourOptions);

    const onAddnewElement = (newItem: string) => {
        setNewList((prevList) => [...prevList, { label: newItem, value: newItem }]);
    };

    return (
        <Grid>
            <CustomSelect
                id={'test_id'}
                className={''}
                defaultValue={null}
                closeMenuOnSelect={true}
                value={singleValue}
                onFocus={undefined}
                onChange={(item: any) => setSingleValue(item)}
                onInputChange={() => {}}
                options={colourOptions}
                placeholder={'Select Single Color'}
                isCreatable={false}
            />

            <CustomSelect
                id={'test_id'}
                className={''}
                defaultValue={null}
                closeMenuOnSelect={false}
                value={multiValue}
                onFocus={undefined}
                onChange={(item: any) => setMultiValue(item)}
                onInputChange={() => {}}
                options={colourOptions}
                isMulti={true}
                placeholder={'Select Multi Color'}
                isClearable={false}
                isCreatable={false}
            />

            <CustomSelect
                id={'test_id'}
                defaultValue={creatableValue}
                value={creatableValue}
                closeMenuOnSelect={false}
                onFocus={undefined}
                onChange={undefined}
                onInputChange={undefined}
                options={newList}
                onCreateOption={(item) => {
                    onAddnewElement(item);
                    setCreatableValue({ label: item, value: item });
                }}
                isCreatable={true}
            />

            <CustomSelect
                disable={true}
                onChange={undefined}
                id={''}
                defaultValue={{
                    value: '',
                    label: '',
                    isDisabled: false,
                }}
                onFocus={undefined}
                options={[]}
                closeMenuOnSelect={false}
                onInputChange={undefined}
                isCreatable={false}
            />
        </Grid>
    );
};

export const CustomDropdown = Template.bind({});
