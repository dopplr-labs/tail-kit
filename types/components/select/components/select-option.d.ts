import React from 'react';
import { OptionType } from '../types';
declare type SelectOptionProps = Omit<React.DetailedHTMLProps<React.LiHTMLAttributes<HTMLLIElement>, HTMLLIElement>, 'children' | 'tabIndex'> & {
    option: OptionType;
    highlighted?: boolean;
    selected?: boolean;
};
export declare function SelectOption({ option, highlighted, selected, className, style, ...restProps }: SelectOptionProps): JSX.Element;
export {};
