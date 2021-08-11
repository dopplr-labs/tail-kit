import React from 'react';
import { OptionType } from './types';
export declare type SelectProps = {
    /** The default selected value */
    defaultValue?: string;
    /**
     * The value of the selected option. To be used in conjunction with `onChange` when
     * using with select as a controlled component.
     * */
    value?: string;
    /** Handler function called when the selected option is changed */
    onChange?: (selectedOption: string | undefined) => void;
    /** Intial label in toggle button */
    placeholder?: string;
    /** Options to render in dropdown */
    options: (OptionType | string)[];
    /** Disable select component */
    disabled?: boolean;
    /** Show clear button to clear selection */
    allowClear?: boolean;
    /** Additional classes applied to the select component */
    className?: string;
    /** Additional styles applied to the select component */
    style?: React.CSSProperties;
    /** parent of the portal container rendering the menu */
    portalParent?: HTMLElement;
};
/**
 * Component to render **select menu**.
 *
 * This component can be used either as a controlled component by passing both `onChange` and `value` or
 * as uncontrolled component. When using as an uncontrolled copmonent, a `defaultValue` can be provided to
 * set the initial selected value.
 *
 * This is a basic select menu which can render a label, a icon for an option. The compononent can take options
 * in the form of `OptionType` or `string`.
 */
export declare function Select({ defaultValue, value, onChange, options, placeholder, disabled, allowClear, className, style, portalParent, }: SelectProps): JSX.Element;
