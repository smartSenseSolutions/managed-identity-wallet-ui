import styled from 'styled-components';
import { LinearProgress } from '@mui/material';

export const StyledLinearProgress = styled(LinearProgress)`
    &.MuiLinearProgress-root {
        border-radius: 6px;
        height: 7px;
        background: ${({ theme }) => theme.colors.primary};
    }
    & .MuiLinearProgress-bar {
        background-color: ${({ theme }) => theme.colors.secondary};
        border-radius: 6px;
    }
`;
