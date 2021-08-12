import React from 'react';
export declare enum MessageTypes {
    INFO = "info",
    SUCCESS = "success",
    WARNING = "warning",
    ERROR = "error",
    LOADING = "loading"
}
export declare type MessageListType = {
    id: string;
    title: string;
    type?: MessageTypes;
    icon?: React.ReactElement;
};
export declare type MessageOptions = {
    dismissTime?: number;
    icon?: React.ReactElement;
};
/**
 * MessageProvider properties
 */
declare type MessageProviderProps = {
    /** wrap your App within MessageProvider component */
    children: React.ReactElement;
    /** default time (in milli-seconds) after which Message component will disappear */
    defaultDismissTime?: number;
};
/**
 * Display global messages as feedback in response to user operations.
 *
 * ### When to use
 * * To provide feedback such as success, warning, error etc.
 * * A message is displayed at top and center and will be dismissed automatically, as a non-interrupting light-weighted prompt.
 * * Mostly useful to notify user for success or error API response
 *
 * ### How to use
 *
 * * Wrap your `<App />` within `<MessageProvider />` component
 * * Import `useMessage` hook wherever you want to render `Message` component
 * * `useMessage` provides you 2 methods which you can access using `const { message, removeMessage } = useMessage()`
 *
 * There are 5 different types of messages available to user. You can pass the string which you want to render in `Message` component as argument.
 *
 * * `message.info()`
 * * `message.success()`
 * * `message.error()`
 * * `message.warning()`
 * * `message.loading()`
 *
 * Use `removeMessage()` method to programmatically remove a message. `removeMessage()` takes the id of `Message` component you want to remove.
 * All `message` methods return the id of the message which you can use with `removeMessage()`
 */
export declare function MessageProvider({ children, defaultDismissTime, }: MessageProviderProps): JSX.Element;
export declare function useMessage(): {
    message: {
        info: (title: string, options?: MessageOptions) => string;
        success: (title: string, options?: MessageOptions) => string;
        warning: (title: string, options?: MessageOptions) => string;
        error: (title: string, options?: MessageOptions) => string;
        loading: (title: string, options?: MessageOptions) => string;
    };
    removeMessage: (id: string) => void;
};
export {};
