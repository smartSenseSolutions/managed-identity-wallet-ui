import styled from 'styled-components';
import { Dialog, DialogActions, DialogTitle } from '@mui/material';
import { DialogContent } from '@material-ui/core';

type StyledDialogProps = {
    max_height: string;
    min_height: string;
};

type StyledDialogBodyProps = {
    is_header: boolean;
    is_footer: boolean;
};

export const StyledDialog = styled(Dialog)<StyledDialogProps>`
    .MuiDialog-paper {
        box-shadow: 0px 0px 15px ${({ theme }) => theme.colors.rgbBlack10};
        min-width: 46.8rem;
        min-height: ${({ min_height }) => (min_height ? min_height : '28.9rem')};
        max-height: ${({ max_height }) => (max_height ? max_height : '')};
        margin: 0;
        padding: 2rem 3.2rem;
        max-width: unset;
        overflow: hidden;
    }
`;

export const StyledDialogTitle = styled(DialogTitle)`
    display: flex;
    align-items: center;
    justify-content: space-between;

    &.MuiDialogTitle-root {
        border-bottom: solid 2px ${({ theme }) => theme.colors.enabledInputGray};
        font-size: 1.8rem;
        line-height: 2rem;
        padding: 0 0 1rem 0;
    }

    .sideHeader {
        border-left: solid 1px ${({ theme }) => theme.colors.iconDarkGray};
        font-size: 1.4rem;
        line-height: 1.8rem;
        margin-left: 1rem;
        padding-left: 1rem;
    }
`;

export const StyledDialogBody = styled(DialogContent)<StyledDialogBodyProps>`
    &.MuiDialogContent-root {
        padding-top: ${({ is_header }) => (is_header ? '2.5rem !important' : 'unset!important')};
        padding-bottom: ${({ is_footer }) => (is_footer ? '2.5re !important' : 'unset!important')};
        padding-left: unset !important;
        padding-right: unset !important;
    }
`;

export const StyledDialogActions = styled(DialogActions)`
    &.MuiDialogActions-root {
        border-top: solid 2px ${({ theme }) => theme.colors.enabledInputGray};
        padding: 2rem 0 0 0;

        button {
            text-transform: none;
        }
    }
`;
