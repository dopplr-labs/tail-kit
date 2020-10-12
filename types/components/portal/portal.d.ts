import React from 'react';
import { HorizontalPlacement, VerticalPlacement } from 'utils/portal';
declare type PortalProps = {
    /**
     * Ref of the trigger element. The content container would render
     * according the placement of the trigger
     * */
    triggerRef: React.RefObject<HTMLElement | null>;
    /** Whether portal is visible or not */
    visible: boolean;
    /** Content to be rendered inside the portal */
    children: React.ReactElement;
    /** Default vertical placement. If provided, the portal won't calculate the vertical position */
    verticalPlacement?: VerticalPlacement;
    /** Default horizontal placement. If provided, the portal won't calculate the horizontal position */
    horizontalPlacement?: HorizontalPlacement;
    /** parent of the portal container rendering the menu */
    portalParent?: HTMLElement;
};
export declare function Portal({ triggerRef, visible, children, verticalPlacement, horizontalPlacement, portalParent, }: PortalProps): JSX.Element;
export {};
