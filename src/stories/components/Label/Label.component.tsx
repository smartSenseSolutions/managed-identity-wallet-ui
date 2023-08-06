import React from 'react';
import { StyledLabelContainer } from './Label.styled';

type FormLabelProps = {
    children: React.ReactNode;
    htmlFor: string;
    isRequired?: boolean;
};

function LabelComponent({ children, htmlFor, isRequired, ...otherProps }: FormLabelProps): JSX.Element {
    return (
        <StyledLabelContainer {...otherProps} isRequired={isRequired} htmlFor={htmlFor}>
            {children}
        </StyledLabelContainer>
    );
}

export default LabelComponent;
