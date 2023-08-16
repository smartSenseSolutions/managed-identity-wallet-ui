import React from 'react';
import { LinearProgressProps } from '@mui/material';
import { StyledLinearProgress } from './Progressbar.styled';

function ProgressbarComp(props: LinearProgressProps): JSX.Element {
    return <StyledLinearProgress {...props} />;
}

export default ProgressbarComp;
