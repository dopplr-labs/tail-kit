/// <reference types="react" />
import { MessageOptions } from './message';
export declare const MessageContext: import("react").Context<{
    message: {
        info: (title: string, options?: MessageOptions) => string;
        success: (title: string, options?: MessageOptions) => string;
        warning: (title: string, options?: MessageOptions) => string;
        error: (title: string, options?: MessageOptions) => string;
        loading: (title: string, options?: MessageOptions) => string;
    };
    removeMessage: (id: string) => void;
}>;
