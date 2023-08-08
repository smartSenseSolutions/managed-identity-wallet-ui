import React, { FocusEventHandler, useState } from 'react';
import { StyledCharacterCount, StyledInput, StyledInputContainer } from './CustomTextArea.styled';

export type CustomTextAreaProps = {
    id: string;
    variant?: 'outlined';
    value?: string;
    defaultValue?: unknown;
    placeholder?: string;
    maxLength?: string;
    fullWidth?: boolean;
    disabled?: boolean;
    rows?: number;
    required?: boolean;
    helperText?: string;
    error?: boolean;
    onChange: (value: string) => void;
    onFocus?: FocusEventHandler<HTMLInputElement>;
    onBlur?: (event?: React.FocusEvent<HTMLElement, Element>) => void;
};

const CustomTextArea = ({
    value,
    onChange,
    id,
    disabled,
    fullWidth,
    maxLength,
    placeholder,
    rows,
    defaultValue,
    variant,
    required,
    onFocus,
    helperText,
    error,
    onBlur,
}: CustomTextAreaProps) => {
    const [charLength, setCharLength] = useState(value ? value.length : 0);

    return (
        <StyledInputContainer>
            <StyledInput
                multiline
                id={id}
                variant={variant}
                defaultValue={defaultValue}
                rows={rows}
                value={value}
                fullWidth={fullWidth}
                disabled={disabled}
                placeholder={placeholder}
                inputProps={{ maxLength: maxLength ? maxLength : '' }}
                required={required}
                onChange={(e) => {
                    setCharLength(e.target.value.length);
                    onChange(e.target.value);
                }}
                onFocus={onFocus}
                helperText={helperText}
                error={error}
                onBlur={onBlur}
            />
            {maxLength && (
                <StyledCharacterCount>
                    {charLength}/{maxLength}
                </StyledCharacterCount>
            )}
        </StyledInputContainer>
    );
};

CustomTextArea.defaultProps = {
    fullWidth: true,
    onChange: () => {},
    rows: 5,
    // maxLength: '1000',
};

export default CustomTextArea;
