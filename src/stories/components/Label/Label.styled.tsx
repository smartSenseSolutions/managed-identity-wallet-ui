import styled from 'styled-components';

type StyledLabelProp = {
    isRequired: boolean | undefined;
};

export const StyledLabelContainer = styled.label<StyledLabelProp>`
    &.MuiFormLabel-root {
        color: ${({ theme }) => theme.colors.labelColor};
        font-size: 1.4rem;
        margin-bottom: 0 !important;
        .MuiFormLabel-asterisk {
            color: ${({ theme }) => theme.colors.error};
        }
    }
    &&:after {
        content: ${(props) => `"${props.isRequired ? '*' : ''}"`};
        color: ${({ theme }) => theme.colors.error};
    }
`;
