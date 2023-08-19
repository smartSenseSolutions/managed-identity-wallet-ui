import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import Grid from '../Grid';
import CustomAccordian from './Accordian.component';

export default {
    title: 'Accordian',
    component: CustomAccordian,
    argTypes: {},
} as ComponentMeta<typeof CustomAccordian>;

const Template: ComponentStory<typeof CustomAccordian> = (args) => {
    return (
        <Grid>
            <div>
                <CustomAccordian
                    id={'panel1'}
                    ariaControls={'panel1-content'}
                    accordionHeader={'Additional Info'}
                    accordionBody={
                        <p>
                            Guidance for Disclosure GRI-308-1 Environmental criteria can include the topics covered in
                            other GRI Topic Standards (e.g., GRI 302: Energy 2016, GRI 303: Water and Effluents 2018,
                            GRI 305: Emissions 2016) Background This disclosure informs stakeholders about the
                            percentage of suppliers selected or contracted subject to
                        </p>
                    }
                    {...args}
                ></CustomAccordian>
            </div>
            <div>
                <CustomAccordian
                    id={'panel2'}
                    ariaControls={'panel2-content'}
                    isStartIcon={true}
                    isGriSummaryAccordion={true}
                    accordionHeader={'SASB'}
                    accordionBody={
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda non animi esse.
                            Perferendis sint adipisci asperiores aut dolorum quasi omnis sunt nulla. Tenetur sint,
                            maiores suscipit velit fuga saepe necessitatibus.
                        </p>
                    }
                    {...args}
                ></CustomAccordian>
            </div>
        </Grid>
    );
};

export const CustomAccordians = Template.bind({});
