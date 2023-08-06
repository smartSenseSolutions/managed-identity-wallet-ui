import React from 'react';
import { InputAdornment } from '@mui/material';
import { StyledInputContainer, StyledInput, StyledLabel } from './CustomInput.styled';

type AdormentType = {
    AdormentTypeIcon: JSX.Element;
    position: 'start' | 'end';
};

export type InputCompProps = {
    id: string;
    value: string;
    label?: string;
    type: string;
    variant?: 'outlined' | 'standard';
    disabled?: boolean;
    required?: boolean;
    error?: boolean;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | string) => void;
    fullWidth?: boolean;
    adornmentProps?: AdormentType;
    helperText?: string;
    inputRef?: React.Ref<HTMLInputElement>;
    bgColor?: string;
    autoFocus?: boolean;
    minHeight?: string;
    padding?: string;
    placeholder?: string;
    autoComplete?: string;
    defaultValue?: string;
    onBlur?: (event?: React.FocusEvent<HTMLElement, Element>) => void;
    classname?: string;
    comment?: boolean;
};

const CustomInput = ({
    value,
    type,
    label,
    variant,
    error,
    disabled,
    required,
    onChange,
    fullWidth,
    adornmentProps,
    helperText,
    inputRef,
    bgColor = '',
    autoFocus,
    minHeight,
    padding,
    placeholder,
    autoComplete,
    onBlur,
    classname,
    comment,
    ...otherProps
}: InputCompProps) => {
    const icon = adornmentProps?.AdormentTypeIcon;
    const adornment =
        adornmentProps?.position === 'start'
            ? {
                  startAdornment: <InputAdornment position="end">{icon}</InputAdornment>,
              }
            : {
                  endAdornment: <InputAdornment position="end">{icon}</InputAdornment>,
              };

    const helperTextVariable = <p>{helperText}</p>;

    return (
        <StyledInputContainer minHeight={minHeight} label={!!label} className={classname}>
            {label !== '' && label !== null && label !== undefined && (
                <StyledLabel required={required}>{label}</StyledLabel>
            )}
            <StyledInput
                type={type}
                variant={variant}
                error={error}
                value={value}
                disabled={disabled}
                required={required}
                onChange={(e) => onChange(type === 'file' ? e : e.target.value)}
                fullWidth={fullWidth}
                InputProps={{
                    ...adornment,
                    inputProps: { min: 0 },
                }}
                helperText={helperTextVariable}
                inputRef={inputRef}
                bgColor={bgColor}
                autoFocus={autoFocus}
                padding={padding}
                placeholder={placeholder}
                autoComplete={autoComplete ? autoComplete : 'off'}
                onBlur={onBlur}
                comment={comment}
                isDateInput={type === 'date'}
                variantStyling={variant}
                {...otherProps}
            ></StyledInput>
        </StyledInputContainer>
    );
};

CustomInput.defaultProps = {
    type: 'text',
    variant: 'outlined',
    error: false,
    disabled: false,
    restrictNegative: false,
    required: false,
    onChange: () => console.log('pressed'),
};

export default CustomInput;
