import { TextField } from '@mui/material';
import styled from 'styled-components';

export const StyledInputContainer = styled.div`
    position: relative;
`;

export const StyledInput = styled(TextField)`
    margin-bottom: 2rem !important;

    .MuiInputLabel-asterisk {
        color: ${({ theme }) => theme.colors.error};
        border: 0 !important;
    }

    .MuiInputBase-input {
        ${({ disabled }) => (disabled ? 'cursor: not-allowed;' : null)};
        color: ${({ theme }) => theme.colors.fontColorPrimary};
        background-color: ${({ theme, disabled }) => (disabled ? theme.colors.disabledInputGray : theme.colors.white)};
        border: solid 0.2rem ${({ theme }) => theme.colors.disabledInputGray};
        resize: vertical !important;
        font-weight: 400;
        font-size: 1.4rem;
        line-height: 2rem;
        padding: 0.8rem 1.2rem;
        border-radius: 0.4rem;
        letter-spacing: 1.23;

        &:focus {
            background-color: ${({ theme }) => theme.colors.activeInputGray};
            border: solid 0.2rem ${({ theme }) => theme.colors.secondary};
        }
        /* ::-webkit-resizer {
            border-width: 8px;
            border-style: solid;
            border-color: transparent orangered orangered transparent;
        } */
    }

    .MuiInputBase-root {
        ${({ disabled }) => (disabled ? { cursor: 'not-allowed' } : null)};
        padding: 0;

        .MuiOutlinedInput-notchedOutline {
            border: 0;
            border-radius: 0.4rem;
        }

        .Mui-disabled {
            background-color: ${({ theme }) => theme.colors.disabledInputGray};
            border: solid 0.2rem ${({ theme }) => theme.colors.disabledInputGray};
            resize: none !important;
            cursor: text;
        }
    }

    .MuiInputAdornment-root {
        margin-left: 0;
    }

    .MuiFormHelperText-root {
        font-family: ${({ theme }) => theme.fontFamily.primary};
        color: ${({ theme }) => theme.colors.black20};
        font-size: 1.2rem;
        line-height: 1.8rem;
        margin: 0.3rem 0 0 0;
    }
`;

export const StyledCharacterCount = styled.p`
    color: ${({ theme }) => theme.colors.black20};
    position: absolute;
    right: 1rem;
    bottom: 0;
    font-size: 1.2rem;
`;
