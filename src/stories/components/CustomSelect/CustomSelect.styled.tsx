import Select from 'react-select';
import CreatableSelect from 'react-select/creatable';
import styled, { css } from 'styled-components';
type selectProps = { chip_width: string };
export const DropdownStyle = css<selectProps>`
    .react-select__multi-value__label {
        max-width: ${({ chip_width }) => (chip_width ? chip_width : '20rem !important')};
    }
    .react-select {
        &__control {
            background-color: ${({ theme }) => theme.colors.enabledInputGray};
            border-color: ${({ theme }) => theme.colors.enabledInputGray};
            color: ${({ theme }) => theme.colors.fontColorPrimary};
            min-height: 3.6rem;

            &:hover {
                border-color: ${({ theme }) => theme.colors.secondary};
                box-shadow: 0 0 0 1px ${({ theme }) => theme.colors.secondary};
            }

            &--is-focused {
                background-color: ${({ theme }) => theme.colors.activeInputGray};
                border-color: ${({ theme }) => theme.colors.secondary};
                box-shadow: 0 0 0 1px ${({ theme }) => theme.colors.secondary};
            }
        }

        &__single-value {
            line-height: 1.4;
        }

        &__multi-value {
            background-color: ${({ theme }) => theme.colors.white};
        }

        &__indicator-separator {
            width: 0px;
        }

        &__indicator {
            color: ${({ theme }) => theme.colors.iconDarkGray};
            width: 3.5rem;
            height: 3.3rem;
            justify-content: center;
            align-items: center;
        }

        &__menu {
            background-color: ${({ theme }) => theme.colors.white};
            border-color: ${({ theme }) => theme.colors.secondary};
            box-shadow: 0px 0px 1px $secondary !important;
            padding: 1.2rem 1rem 1.2rem 1.2rem;

            &-list {
                padding-right: 1.2rem;
            }
        }

        &__option {
            &--is-selected {
                color: ${({ theme }) => theme.colors.fontColorPrimary};
                background-color: ${({ theme }) => theme.colors.secondary};
                border-radius: 4px;
            }

            &--is-focused {
                color: ${({ theme }) => theme.colors.white};
                background-color: ${({ theme }) => theme.colors.secondary};
            }

            &:active {
                color: ${({ theme }) => theme.colors.white};
                background-color: ${({ theme }) => theme.colors.secondary};
            }
        }

        &__value-container {
            max-height: 6rem;
            overflow: auto;
        }
    }
    .react-select__control--is-disabled {
        .react-select__multi-value,
        .react-select__multi-value__label {
            background-color: rgba(249, 249, 249, 0.5);
            color: ${({ theme }) => theme.colors.labelColor};
        }
    }
`;

export const StyledSelect = styled(Select)<selectProps>`
    ${DropdownStyle}
`;

export const StyledCreatableSelect = styled(CreatableSelect)<selectProps>`
    ${DropdownStyle}
`;
