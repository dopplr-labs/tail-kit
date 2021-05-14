import React from 'react';
import { Placement } from 'utils/portal';
declare enum ContentVisibility {
    HIDDEN = "HIDDEN",
    INVISIBLE = "INVISIBLE",
    SHOWN = "SHOWN"
}
declare type PortalProps = {
    /**
     * Ref of the trigger element. The content container would render
     * according the placement of the trigger
     * */
    triggerRef: React.RefObject<HTMLElement | null>;
    /** Whether portal is visible or not */
    visible: boolean;
    /** Content to be rendered inside the portal */
    children: React.ReactElement | ((_: {
        contentVisibility: ContentVisibility;
        containerPlacement: Placement;
        contentStyle?: React.CSSProperties;
    }) => React.ReactElement);
    defaultPlacement: Placement;
    allowedPlacements: Placement[];
    offsetHorizontal?: number;
    offsetVertical?: number;
    /** Handler function called when the portal children is rendered in the correct position */
    onContentMount?: () => void;
    /** Handler function called when the portal children is unmounted */
    onContentUnmount?: () => void;
    /** parent of the portal container rendering the menu */
    portalParent?: HTMLElement;
};
export declare function Portal({ triggerRef, visible, children, allowedPlacements, defaultPlacement, offsetHorizontal, offsetVertical, onContentMount, onContentUnmount, portalParent, }: PortalProps): JSX.Element;
export {};
