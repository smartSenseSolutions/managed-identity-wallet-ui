import Icons from '../../../Icons';
import { FocusEventHandler } from 'react';
import { components, createFilter } from 'react-select';
import { StyledCreatableSelect, StyledSelect } from './CustomSelect.styled';

export type DropdownItem = {
    value: string;
    label: string;
    isDisabled?: boolean;
};

export type CustomSelectProps = {
    id: string;
    className?: string;
    defaultValue?: DropdownItem;
    closeMenuOnSelect: boolean;
    value?: DropdownItem | undefined;
    onFocus: any;
    onChange: any;
    onInputChange?: Function;
    maxMenuHeight?: number;
    maxMenuWidth?: number;
    onBlur?: (e: React.FocusEvent<HTMLElement, Element>) => void;
    name?: string;
    hideSelectedOptions?: boolean;
    isDisabled?: boolean;
    isLoading?: boolean;
    isClearable?: boolean;
    isRtl?: boolean;
    isSearchable?: boolean;
    isMulti?: boolean;
    required?: boolean;
    disable?: boolean;
    chipMaxWidth?: string;
    placeholder?: string;
    options: DropdownItem[];
    insideDialog?: boolean;
    isCreatable: boolean;
    onCreateOption?: (inputValue: string) => void;
    menuIsOpen?: boolean;
    matchFromStart?: boolean;
    removeClearIndicator?: boolean;
    removeDropDownIndicator?: boolean;
};

const ClearIndicator = (props) => {
    return (
        <components.ClearIndicator {...props}>
            <Icons.CloseIcon width={10} height={10} fill={'black'} />
        </components.ClearIndicator>
    );
};

const ClearWhiteIndicator = (props) => {
    return (
        <components.ClearIndicator {...props}>
            <Icons.CloseIcon width={10} height={10} fill={'#fff'} />
        </components.ClearIndicator>
    );
};

const DropdownIndicator = (props) => {
    return (
        <components.DropdownIndicator {...props}>
            <Icons.DownIcon width={18} height={16} fill={'#000'} />
        </components.DropdownIndicator>
    );
};

const ClearDropdownIndicator = (props) => {
    return (
        <components.DropdownIndicator {...props}>
            <Icons.DownIcon width={18} height={16} fill={'#fff'} />
        </components.DropdownIndicator>
    );
};
const CustomSelect = ({
    id,
    className,
    defaultValue,
    closeMenuOnSelect,
    value,
    onFocus,
    onChange,
    onInputChange,
    maxMenuHeight,
    maxMenuWidth,
    onCreateOption,
    onBlur,
    hideSelectedOptions,
    isLoading,
    isClearable,
    isRtl,
    isSearchable,
    isMulti,
    chipMaxWidth,
    required,
    disable,
    placeholder,
    options,
    insideDialog = false,
    isCreatable = false,
    menuIsOpen,
    matchFromStart = false,
    removeClearIndicator = false,
    removeDropDownIndicator = false,
}: CustomSelectProps) => {
    if (isCreatable)
        return (
            <StyledCreatableSelect
                id={id}
                className={className}
                defaultValue={defaultValue}
                closeMenuOnSelect={closeMenuOnSelect}
                value={value}
                onFocus={onFocus}
                onChange={onChange}
                maxMenuHeight={maxMenuHeight}
                onBlur={onBlur}
                hideSelectedOptions={hideSelectedOptions}
                isDisabled={disable}
                isLoading={isLoading}
                isClearable={isClearable}
                isRtl={isRtl}
                chip_width={chipMaxWidth}
                isSearchable={isSearchable}
                isMulti={isMulti}
                required={required}
                placeholder={placeholder}
                options={options}
                classNamePrefix={'react-select'}
                menuPortalTarget={insideDialog ? document.body : undefined}
                onCreateOption={onCreateOption}
                components={{
                    DropdownIndicator: removeDropDownIndicator ? ClearDropdownIndicator : DropdownIndicator,
                    ClearIndicator: removeClearIndicator ? ClearWhiteIndicator : ClearIndicator,
                }}
                menuIsOpen={menuIsOpen}
                filterOption={createFilter({ matchFrom: matchFromStart ? ('start' as const) : ('any' as const) })}
            />
        );

    return (
        <StyledSelect
            id={id}
            className={className}
            defaultValue={defaultValue}
            closeMenuOnSelect={closeMenuOnSelect}
            value={value}
            onFocus={onFocus}
            onChange={onChange}
            maxMenuHeight={maxMenuHeight}
            onBlur={onBlur}
            hideSelectedOptions={hideSelectedOptions}
            isDisabled={disable}
            isLoading={isLoading}
            isClearable={isClearable}
            chip_width={chipMaxWidth}
            isRtl={isRtl}
            isSearchable={isSearchable}
            isMulti={isMulti}
            required={required}
            placeholder={placeholder}
            options={options}
            classNamePrefix={'react-select'}
            menuPortalTarget={insideDialog ? document.body : undefined}
            components={{
                DropdownIndicator: removeDropDownIndicator ? ClearDropdownIndicator : DropdownIndicator,
                ClearIndicator: removeClearIndicator ? ClearWhiteIndicator : ClearIndicator,
            }}
            menuIsOpen={menuIsOpen}
            filterOption={createFilter({ matchFrom: matchFromStart ? ('start' as const) : ('any' as const) })}
        />
    );
};

CustomSelect.defaultProps = {
    isRtl: false,
    disable: false,
};

export default CustomSelect;
