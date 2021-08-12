/// <reference types="react" />
export declare type NPSScaleProps = {
    /** Callback function which is triggered when a user selects score */
    onSubmit?: (value: number) => void;
};
export declare function NPSScale({ onSubmit }: NPSScaleProps): JSX.Element;
