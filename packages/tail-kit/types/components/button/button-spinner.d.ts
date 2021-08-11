import React from 'react';
/** Button Spinner propertier */
export declare type ButtonSpinnerProps = {
    /** additional class names */
    className?: string;
    /** additional styles */
    style?: React.CSSProperties;
};
/** Component for rendering spinner inside the `Button` component when `loading=true` */
export declare function ButtonSpinner({ className, style }: ButtonSpinnerProps): JSX.Element;
