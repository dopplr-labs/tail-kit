import React from 'react';
export declare enum TabType {
    pill = "pill",
    underline = "underline"
}
export declare enum TabPosition {
    top = "top",
    bottom = "bottom",
    left = "left",
    right = "right"
}
export declare type Tab = {
    /** Title of the tab */
    title: string;
    /** Icon to be rendered along with the tab title */
    icon?: JSX.Element;
    /** Unique key to identify the tab */
    key: string;
    /** Tab content */
    content: React.ReactNode;
};
/** Tabs properties */
export declare type TabsProps = {
    /** Key of the tab selected */
    tab?: string;
    /**
     * Key of the default tab selected. This should be used when the Tab component is used in uncontrolled way
     * */
    defaultTab?: string;
    /** Callback function called when the active tab is changed. */
    onTabChange?: (activeTabKey: string) => void;
    /**
     * The type of the tab item rendered inside the tabs list. If it is pill, then it would render
     * the tab title and icon with pills and else the active tab would be underlined
     */
    type?: TabType;
    /**
     * The position of the tabs list with respect to the content.
     * By default the tabs list would be rendered over the top of the content.
     */
    position?: TabPosition;
    tabs: Tab[];
    /**
     * Extra content to be rendered in the tabs list.
     * It would be rendered at the end of the tabs list. It won't scroll even if the tabs list might scroll
     * */
    extraContent?: React.ReactNode;
    /** Additional classes for styling */
    className?: string;
    /** Additional styles */
    style?: React.CSSProperties;
    /** Additional classes for styling tab bar */
    tabBarClassName?: string;
    /** Additonal styles for tab bar */
    tabBarStyle?: React.CSSProperties;
};
/**
 * Component to render **tabs**.
 *
 * The `Tabs` component can be configured to render the **tabs list** in various styles by changing `position` and `type` parameters.
 */
export declare function Tabs({ tab: tabKey, defaultTab: defaultTabKey, onTabChange, tabs, type, position, extraContent, className, style, tabBarClassName, tabBarStyle, }: TabsProps): JSX.Element;
export declare namespace Tabs {
    var TabType: typeof import("./tabs").TabType;
    var TabPosition: typeof import("./tabs").TabPosition;
}
