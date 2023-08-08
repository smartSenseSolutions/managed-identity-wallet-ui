import styled from 'styled-components';

type StyleChipsContainerProps = {
    variant: 'outlined' | 'filled';
    actionType: 'delete' | 'edit';
    islink: boolean;
    type: 'delete' | string;
};

export const StyleChipsContainer = styled.div<StyleChipsContainerProps>`
    .MuiChip-root {
        &:hover {
            background-color: ${({ variant }) => (variant === 'outlined' ? 'unset' : 'rgba(0, 0, 0, 0.04)')};
        }

        &:active {
            box-shadow: ${({ variant }) =>
                variant === 'outlined'
                    ? 'unset'
                    : '0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)'};
        }
    }

    .customChipRoot {
        cursor: default;
        border: none;
    }

    .chipWithoutLabel {
        border: none;
        cursor: default;

        .MuiChip-label {
            display: none;
        }
    }

    .MuiChip-deleteIcon {
    }

    .MuiChip-label {
        color: ${({ theme, islink }) => (islink ? theme.colors.infoDark : theme.colors.blackPrimary)};
        font-size: 1.4rem;
        line-height: 1.8rem;
        padding: 0 0.8rem;

        ${({ actionType, type, islink }) => ({
            fontWeight: actionType === 'delete' || type === 'delete' ? '400' : '600',
            fontSize: actionType === ('delete' || type === 'delete') && '1.2rem',
            lineHeight: actionType === ('delete' || type === 'delete') && '2rem',
            textDecorationLine: islink && 'underline',
            cursor: islink ? 'pointer' : 'default',
        })}
    }
`;

export const StyledIcon = styled.span`
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    height: 2.5rem;
    width: 2.5rem;
    border-radius: 50%;

    &:hover {
        background-color: ${({ theme }) => theme.colors.primaryBlack20};
    }
`;
