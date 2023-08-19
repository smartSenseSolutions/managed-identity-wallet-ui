import React, { useEffect, useState } from 'react';
import { Chip } from '@mui/material';
import Icons from '@miw/Icons';
import IconButton from '../IconButton';
import { StyledInputWithChips } from './InputWithChip.styled';

type Props = {
    id?: string;
    value?: string[];
    placeholder: string;
    variant: 'filled' | 'outlined' | 'standard';
    defaultValue?: string[];
    helperText?: string;
    error?: boolean;
    fullWidth?: boolean;
    clearInput?: boolean;
    onChange: Function;
    onAdd?: Function;
    onBeforeAdd: Function;
    width?: string;
    onDelete?: Function;
    onUpdateInput?: unknown;
    disabled?: boolean;
    onFocus?: unknown;
    onBlur?: unknown;
    blurBehaviour?: 'clear' | 'add';
};

const InputWithChipComponent = ({
    id,
    value,
    variant,
    placeholder,
    defaultValue,
    helperText,
    error,
    fullWidth,
    onChange,
    onAdd,
    onBeforeAdd,
    clearInput = false,
    width,
    onDelete,
    onUpdateInput,
    onFocus,
    onBlur,
    disabled = false,
    blurBehaviour = 'add',
}: Props): React.ReactNode | unknown => {
    const [chipValue, setChipValue] = useState<unknown>([]);

    useEffect(() => {
        if (clearInput) {
            setChipValue([]);
        }
    }, [clearInput]);

    useEffect(() => {
        setChipValue(value);
    }, [value]);

    return (
        <StyledInputWithChips
            id={id}
            onFocus={onFocus}
            value={chipValue}
            defaultValue={defaultValue || []}
            variant={variant}
            onBlur={onBlur}
            placeholder={placeholder}
            helperText={helperText}
            error={error}
            fullWidth={fullWidth}
            blurBehavior={blurBehaviour}
            onBeforeAdd={(chip: unknown) => onBeforeAdd(chip)}
            onChange={(chip: unknown) => onChange(chip)}
            onAdd={(chip: unknown) => onAdd(chip)}
            onDelete={(chip: unknown) => onDelete(chip)}
            clearInputValueOnChange={clearInput}
            onUpdateInput={onUpdateInput}
            width={width}
            disabled={disabled}
            chipRenderer={(args) => (
                <Chip
                    key={args.text}
                    label={args.value}
                    clickable={false}
                    onDelete={args.handleDelete}
                    deleteIcon={
                        <IconButton onClick={(e) => args.handleDelete(e)}>
                            <Icons.CloseIcon height={10} width={10} />{' '}
                        </IconButton>
                    }
                />
            )}
        />
    );
};

InputWithChipComponent.defaultProps = {
    variant: 'outlined',
};

export default InputWithChipComponent;
