import ChipInput from 'material-ui-chip-input';
import styled from 'styled-components';

type StyledInputWithChipsProps = {
    width?: string;
    disabled?: boolean;
};

export const StyledInputWithChips = styled(ChipInput)<StyledInputWithChipsProps>`
    &.MuiFormControl-root {
        .MuiOutlinedInput-root {
            background-color: rgb(255, 255, 255);
            .MuiOutlinedInput-notchedOutline {
                border: 2px solid ${({ theme }) => theme.colors.disabledInputGray};
            }
        }

        .MuiInputBase-root {
            ${({ disabled, theme }) => {
                if (disabled) {
                    return {
                        backgroundColor: theme.colors.disabledInputGray,
                    };
                }
            }}
            width: ${({ width }) => (width ? width : '')};
            max-height: 6rem;
            overflow: auto;
            padding: 0.8rem;

            .MuiChip-root {
                background-color: ${({ theme }) => theme.colors.white} !important;
                height: 2rem;
                padding: 3px 0;
                margin: 0 3px;

                .MuiChip-label {
                    overflow: hidden;
                    whitespace: nowrap;
                    text-overflow: ellipsis;
                    max-width: 14rem;
                    padding: 0 5px;
                    line-height: 1.6;
                }

                .MuiIconButton-root {
                    padding-right: 0;
                    border-radius: 0;

                    &:hover {
                        background-color: white;
                    }
                }

                &:active {
                    box-shadow: none;
                }
            }

            input {
                font-size: 1.4rem;
                line-height: 1.21;
                margin: 0;
                padding: 0 3px;

                ${({ disabled }) => {
                    if (disabled) {
                        return {
                            cursor: 'default',
                        };
                    }
                }}
            }

            fieldset {
                top: -6px;
                padding: 0px !important;
            }

            &:hover {
                ${({ disabled, theme }) => {
                    if (!disabled) {
                        return {
                            outline: `1px solid ${theme.colors.secondary}`,
                        };
                    }
                }}
            }
        }

        .MuiFormHelperText-contained {
            font-size: 1.2rem;
            line-height: 1.21;
            margin-top: 8px;
            margin-right: 0;
            margin-left: 2px;
        }
    }
`;
