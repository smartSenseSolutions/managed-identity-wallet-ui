import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Button from './Button.component';
import Grid, { GridItem } from '../Grid';
import Icons from '../../../Icons';

export default {
    title: 'Buttons',
    component: Button,
    argTypes: {},
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => {
    return (
        <div>
            <Grid col={5}>
                <GridItem description="Standard / FullWidth / Filled">
                    <Button {...args} startIcon={'+'} variant="contained" size="compact">
                        Compact
                    </Button>
                </GridItem>
                <GridItem description="Standard / FullWidth / Filled">
                    <Button {...args} variant="contained" size="small">
                        Small
                    </Button>
                </GridItem>
                <GridItem description="Standard / FullWidth / Filled">
                    <Button {...args} variant="contained" size="regular">
                        Regular
                    </Button>
                </GridItem>
                <GridItem description="Standard / FullWidth / Filled">
                    <Button {...args} variant="contained" size="medium">
                        Medium
                    </Button>
                </GridItem>
                <GridItem description="Standard / FullWidth / Filled">
                    <Button {...args} variant="contained" size="large">
                        Large
                    </Button>
                </GridItem>
            </Grid>
            <Grid col={5}>
                <GridItem description="Standard / FullWidth / Outlined">
                    <Button {...args} variant="outlined" size="compact">
                        Compact
                    </Button>
                </GridItem>

                <GridItem description="Standard / FullWidth / Outlined">
                    <Button {...args} variant="outlined" size="small">
                        Small
                    </Button>
                </GridItem>

                <GridItem description="Standard / FullWidth / Outlined">
                    <Button {...args} variant="outlined" size="regular">
                        Regular
                    </Button>
                </GridItem>

                <GridItem description="Standard / FullWidth / Outlined">
                    <Button {...args} variant="outlined" size="medium">
                        Medium
                    </Button>
                </GridItem>

                <GridItem description="Standard / FullWidth / Outlined">
                    <Button {...args} variant="outlined" size="large">
                        Large
                    </Button>
                </GridItem>
            </Grid>
            <Grid col={3}>
                <GridItem description="Standard / FullWidth / Text">
                    <Button {...args} variant="text" startIcon={<Icons.EditIcon height={12} width={11} />}>
                        Edit
                    </Button>
                </GridItem>

                <GridItem description="Standard / FullWidth / Filled / Disabled">
                    <Button {...args} variant="contained" disabled>
                        Button Disabled
                    </Button>
                </GridItem>
                <GridItem description="Standard / FullWidth / Outlined / Disabled">
                    <Button {...args} variant="outlined" disabled>
                        Button Disabled
                    </Button>
                </GridItem>
            </Grid>
        </div>
    );
};

export const Normal = Template.bind({});
