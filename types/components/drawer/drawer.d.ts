import React from 'react';
export declare enum DrawerPlacement {
    left = "left",
    right = "right",
    top = "top",
    bottom = "bottom"
}
/**
 * Drawer component properties
 */
export declare type DrawerProps = {
    /** content rendered inside the modal */
    children: React.ReactNode;
    /** Whether a close (x) button is visible on top right of the Drawer dialog or not */
    closable?: boolean;
    /** The footer for Drawer */
    footer?: React.ReactNode;
    /** function called when the user is closing the drawer, either by clicking on cancel button or overlay */
    onRequestClose?: () => void;
    /** title of the drawer */
    title?: string;
    /** The placement of the Drawer */
    placement?: DrawerPlacement;
    /** parent of the portal container */
    portalParent?: HTMLElement;
    /** Define the size of drawer (width in case of left or right placement and height in case of top or bottom placement) */
    size?: number;
    /** whether drawer is visible or not */
    visible: boolean;
    /** Additional classes applied to the Drawer component */
    className?: string;
    /** Additional styles applied to the Drawer component */
    style?: React.CSSProperties;
};
/**
 *  A panel which slides in from the edge of the screen.
 *
 * ### When To Use
 *
 * A Drawer is a panel that is typically overlaid on top of a page and slides in from the side. It contains a set of information or actions. Since the user can interact with the Drawer without leaving the current page, tasks can be achieved more efficiently within the same context.
 *
 * * Use a Form to create or edit a set of information.
 * * Processing subtasks. When subtasks are too heavy for a Popover and we still want to keep the subtasks in the context of the main task, Drawer comes very handy.
 * * When the same Form is needed in multiple places.
 */
export declare function Drawer({ children, closable, footer, onRequestClose, placement, portalParent, size, title, visible, className, style, }: DrawerProps): React.ReactPortal;
export declare namespace Drawer {
    var DrawerPlacement: typeof import("./drawer").DrawerPlacement;
}
