import React from 'react';
import { Chip, ChipProps, Stack } from '@mui/material';
import Icons from '../../../Icons';
import { StyleChipsContainer, StyledIcon } from './Chips.styled';

type ChipsProps = {
    label: string;
    variant?: 'outlined' | 'filled';
    link?: string;
    actionType: 'edit' | 'delete' | null;
    actionFunction?: React.MouseEventHandler;
    onLinkClick?: React.MouseEventHandler;
    type?: 'delete' | string;
};

type MySvgComponentProps = ChipProps & {
    actionType: 'edit' | 'delete' | null;
};

const MySVGComponent = ({ actionType, ...props }: MySvgComponentProps): JSX.Element => {
    return (
        actionType !== null && (
            <StyledIcon {...props}>
                {actionType === 'delete' ? <Icons.CloseIcon height={8} width={8} /> : <Icons.EditIcon height={14} />}
            </StyledIcon>
        )
    );
};

function ChipsComponent({
    label,
    link,
    onLinkClick,
    type,
    variant,
    actionType = 'delete',
    actionFunction,
}: ChipsProps): JSX.Element {
    return (
        <StyleChipsContainer islink={!!link} actionType={actionType} type={type} variant={variant}>
            <Stack direction="row" spacing={1}>
                <Chip
                    onClick={onLinkClick}
                    classes={{ root: label ? 'customChipRoot' : 'chipWithoutLabel' }}
                    label={label}
                    variant={variant}
                    onDelete={(event) => {
                        actionFunction(event);
                    }}
                    deleteIcon={<MySVGComponent actionType={actionType} />}
                />
            </Stack>
        </StyleChipsContainer>
    );
}

export default ChipsComponent;
