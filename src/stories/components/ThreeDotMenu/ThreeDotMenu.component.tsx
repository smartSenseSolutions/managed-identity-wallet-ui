import * as React from 'react';
import { IconButton, MenuItem } from '@mui/material';
import { StyledMenuMain, StyledMenu } from './ThreeDotMenu.styled';
import Icons from '../../../Icons';
import { itemsProps } from '@miw/types/common';

const ITEM_HEIGHT = 48;

type MenuItemsProps = {
    menuItems: itemsProps[];
    handleItemClick: (item: itemsProps) => void;
};

const ThreeDotItemMenu = ({ menuItems, handleItemClick }: MenuItemsProps) => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [anchorElMenu, setAnchorElMenu] = React.useState<HTMLLIElement | null>(null);

    const open = Boolean(anchorEl);
    const openMenu = Boolean(anchorElMenu);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const onItemClick = (event: React.MouseEvent<HTMLLIElement>, item: itemsProps) => {
        if (item && item.value === 'DOWNLOAD') {
            setAnchorElMenu(event.currentTarget);
        } else {
            handleItemClick(item);
            handleClose();
        }
    };

    const handleClose = () => {
        setAnchorEl(null);
        setAnchorElMenu(null);
    };

    return (
        <StyledMenuMain>
            <IconButton
                aria-label="more"
                id="long-button"
                aria-controls={open ? 'long-menu' : undefined}
                aria-expanded={open ? 'true' : undefined}
                aria-haspopup="true"
                onClick={handleClick}
            >
                <Icons.ThreeDotIcon />
            </IconButton>
            <StyledMenu
                id="long-menu"
                MenuListProps={{
                    'aria-labelledby': 'long-button',
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                PaperProps={{
                    style: {
                        maxHeight: ITEM_HEIGHT * 4.5,
                        width: '20ch',
                    },
                }}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
                {menuItems.map((item) => (
                    <MenuItem key={item.id} onClick={(event) => onItemClick(event, item)}>
                        {item?.label}
                    </MenuItem>
                ))}
            </StyledMenu>
        </StyledMenuMain>
    );
};

export default ThreeDotItemMenu;
