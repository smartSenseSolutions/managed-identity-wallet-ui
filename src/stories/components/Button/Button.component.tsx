import React, { useMemo, useRef } from 'react';
// import { ButtonPropsVariantOverrides, ButtonPropsSizeOverrides } from '@mui/material/Button';
import { StyledButton, StyledLoadingController } from './Button.styled';

export type ButtonVariants = 'contained' | 'text' | 'outlined' | 'secondary' | 'outlined_secondary' | 'closed';

export type ButtonSizes = 'mini' | 'compact' | 'small' | 'regular' | 'medium' | 'large';

declare module '@mui/material/Button' {
    interface ButtonPropsVariantOverrides {
        secondary: true;
        outlined_secondary: true;
        closed: true;
    }

    interface ButtonPropsSizeOverrides {
        mini: true;
        compact: true;
        regular: true;
    }
}

export interface ButtonPropTypes {
    row?: unknown;
    children: React.ReactNode;
    onClick: React.MouseEventHandler<HTMLButtonElement>;
    variant?: ButtonVariants;
    size?: ButtonSizes;
    href?: string;
    isLoading?: boolean;
    startIcon?: React.ReactNode;
    endIcon?: React.ReactNode;
    disabled?: boolean;
    fullWidth?: boolean;
    ref: React.MutableRefObject<HTMLButtonElement>;
    id: string;
    type?: 'submit' | 'reset' | 'file' | 'text';
    form?: string;
    buttonBgColor?: string;
    buttonTextColor?: string;
    buttonHoverBgColor?: string;
    buttonHoverTextColor?: string;
}

export const LoadingSizeMap: Record<ButtonSizes, number> = {
    mini: 15,
    compact: 20,
    small: 20,
    regular: 20,
    medium: 25,
    large: 25,
};

export const getLoadingStyleAsPerVariantAndSize = (variant: ButtonVariants, size: ButtonSizes): { size: number } => {
    return {
        size: LoadingSizeMap[size],
    };
};

export const getDisabledClassnamesAsPerVariant = (variant: ButtonVariants): string => {
    return `${variant}-disabled`;
};

function ButtonComponent({
    row,
    children,
    id,
    ref,
    disabled,
    endIcon,
    fullWidth,
    href,
    isLoading,
    size,
    startIcon,
    type,
    variant,
    onClick,
    form,
    buttonBgColor = '',
    buttonTextColor = '',
    buttonHoverBgColor = '',
    buttonHoverTextColor = '',
}: ButtonPropTypes): React.ReactElement {
    const buttonRef = useRef<HTMLButtonElement | null>();
    const loadingStyle = useMemo(() => getLoadingStyleAsPerVariantAndSize(variant, size), [variant, size]);
    const disabledClassName = useMemo(() => getDisabledClassnamesAsPerVariant(variant), [variant]);

    return (
        <StyledButton
            variant={variant}
            disabled={disabled || isLoading}
            startIcon={startIcon}
            endIcon={endIcon}
            fullWidth={fullWidth}
            href={href}
            size={size}
            onClick={onClick}
            classes={{ disabled: disabledClassName }}
            type={type}
            form={form}
            ref={ref}
            id={id}
            buttonBgColor={buttonBgColor}
            buttonTextColor={buttonTextColor}
            buttonHoverBgColor={buttonHoverBgColor}
            buttonHoverTextColor={buttonHoverTextColor}
            {...(variant === 'text' || variant === 'closed'
                ? {
                      disableRipple: true,
                      disableElevation: true,
                      disableFocusRipple: true,
                  }
                : {})}
            {...(isLoading === true && buttonRef && buttonRef.current
                ? { style: { minWidth: buttonRef.current.clientWidth } }
                : {})}
        >
            {isLoading ? <StyledLoadingController {...loadingStyle} /> : children}
        </StyledButton>
    );
}

const defaultProps: Partial<ButtonPropTypes> = {
    variant: 'contained',
    isLoading: false,
    size: 'compact',
};

ButtonComponent.defaultProps = defaultProps;

export default ButtonComponent;
