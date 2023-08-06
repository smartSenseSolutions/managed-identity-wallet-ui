import { FormLabel, TextField } from '@mui/material';
import styled from 'styled-components';

interface StatusLabelsProps {
    bgColor: string;
    padding: string;
    onBlur?: () => void;
    isDateInput?: boolean;
    comment?: boolean;
    variantStyling?: 'outlined' | 'standard';
}

type MinHeightProps = {
    minHeight: string;
    label: boolean;
};

export const StyledInputContainer = styled.div<MinHeightProps>`
    min-height: ${({ minHeight }) => (minHeight ? minHeight : '0px')};
    position: relative;

    .MuiFormControl-root {
        margin-top: ${({ label }) => (label ? '0.6rem' : '')};
        width: 100%;

        .MuiFormHelperText-root {
            font-size: 1.2rem;
            line-height: 1.8rem;
            margin: 0.3rem 0 0 0;
            position: absolute;
            white-space: nowrap;
            bottom: -2rem;
        }
    }
`;

export const StyledInput = styled(TextField)<StatusLabelsProps>`
    &.MuiTextField-root {
        .MuiInputBase-root {
            background-color: ${({ theme, disabled }) =>
                disabled ? theme.colors.disabledInputGray : theme.colors.white};
            color: ${({ theme }) => theme.colors.fontColorPrimary};

            ${({ variantStyling, theme }) => {
                if (variantStyling === 'outlined') {
                    return {
                        border: `solid 0.2rem ${theme.colors.disabledInputGray}`,
                    };
                }
            }}
            ${({ isDateInput }) => {
                if (isDateInput) {
                    return {
                        paddingRight: '0',
                    };
                }
            }}
            padding-left: 0;

            ${({ comment }) => (comment ? 'padding-right: 3rem;' : null)}

            border-radius: 0.4rem;

            .MuiInputBase-input {
                ${({ disabled }) => (disabled ? 'cursor: not-allowed;' : null)};
                letter-spacing: 1.23;
                font-weight: 400;
                font-size: 1.4rem;
                line-height: 2rem;
                padding: ${({ isDateInput }) => (isDateInput ? '0.8rem 0.1rem 0.8rem 0.8rem' : '0.8rem')};
            }

            .MuiOutlinedInput-notchedOutline {
                border: 0;
                border-radius: 0.4rem;
            }
        }

        .Mui-focused {
            ${({ variantStyling, theme }) => {
                if (variantStyling === 'outlined') {
                    return {
                        backgroundColor: theme.colors.activeInputGray,
                        border: `solid 0.2rem ${theme.colors.secondary}`,
                    };
                }
            }}
        }

        .MuiFormHelperText-root {
            background-color: content-box;
            border: 0;
        }
    }
`;

export const StyledLabel = styled(FormLabel)`
    &.MuiFormLabel-root {
        color: ${({ theme }) => theme.colors.labelColor};
        font-size: 1.4rem;
        margin-bottom: 0 !important;

        .MuiFormLabel-asterisk {
            color: ${({ theme }) => theme.colors.error};
        }
    }
`;
