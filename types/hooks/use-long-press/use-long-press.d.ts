/// <reference types="react" />
declare type PressHandler = (event: MouseEvent) => void;
export declare function useLongPress<T extends HTMLElement>({ onPress, delay, }: {
    onPress: PressHandler;
    delay?: number;
}): import("react").MutableRefObject<T>;
export {};
