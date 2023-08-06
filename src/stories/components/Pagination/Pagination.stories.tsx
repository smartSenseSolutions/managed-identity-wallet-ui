import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import PaginationComponent from './Pagination.component';
export default {
    title: 'Pagination',
    component: PaginationComponent,
    argTypes: {},
} as ComponentMeta<typeof PaginationComponent>;

const Template: ComponentStory<typeof PaginationComponent> = (args) => (
    <PaginationComponent
        totalRecord={10}
        onChangePagination={() => {
            console.log('on change pagination');
        }}
        // page={1}
    />
);

export const Pagination: ComponentStory<typeof PaginationComponent> = Template.bind({});
