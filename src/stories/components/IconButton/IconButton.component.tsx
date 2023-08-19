import React from 'react';
import MuiIconButton, { IconButtonProps } from '@mui/material/IconButton';

function IconButton({ children, ...others }: IconButtonProps): JSX.Element {
    return <MuiIconButton {...others}>{children}</MuiIconButton>;
}

export default IconButton;
