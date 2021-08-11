import React from 'react';
/**
 * Switch properties
 */
export declare type SwitchProps = {
    /** whether the switch is on on | off state */
    checked?: boolean;
    /** Property to initialize switch with a particular value */
    defaultChecked?: boolean;
    /** Disable switch */
    disabled?: boolean;
    /** function called when the state of switch is changed */
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    /** additional class names */
    className?: string;
    /** addtional styles */
    style?: React.CSSProperties;
};
/**
 * Switch component to render toggle
 */
export declare const Switch: React.ForwardRefExoticComponent<SwitchProps & React.RefAttributes<HTMLInputElement>>;
