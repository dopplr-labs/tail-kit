export declare enum VerticalPlacement {
    /** The content container is placed at top of the trigger */
    top = "top",
    /** The content container is placed along with mid position of the trigger */
    center = "center",
    /** The content container is placed at bottom of the trigger */
    bottom = "bottom"
}
export declare enum HorizontalPlacement {
    /** The content container is placed at left side of the trigger */
    left = "left",
    /** The left position of the content container and trigger co-incide */
    leftAlign = "leftAlign",
    /** The content container is placed along with mid position of the trigger */
    center = "center",
    /** The content container is placed at right side of the trigger */
    right = "right",
    /** The right position of the content container and trigger co-incide */
    rightAlign = "rightAlign"
}
export declare type Placement = [VerticalPlacement, HorizontalPlacement];
/**
 * Computes the placement of the content container with respect to
 * the trigger, based on the heuristics.
 *
 * This method finds out all the validate placements out of the allowed
 * placements and
 * * if there are no valid placements it returns the default placement
 * * if the default placement is a valid one the it returns the default placement
 * * else it returns the first valid placement
 *
 * TODO: Update the getPlacement method to compute the placement based on
 * constraint optimisation (Food for thought for someone working on it in future)
 */
export declare function getPlacement({ triggerBCR, contentContainerBCR, defaultPlacement, allowedPlacements, offsetHorizontal, offsetVertical, }: {
    triggerBCR: DOMRect;
    contentContainerBCR: DOMRect;
    /**
     * The default placement of the content container.
     *
     * Generally all the portal components have some kind of default placement.
     * Select as bottom and left-align, so is date picker
     * whereas tooltip might have center and right
     */
    defaultPlacement: Placement;
    /** List of all the placements allowed */
    allowedPlacements: Placement[];
    /** Vertical offset, the vertical gap between the trigger container and content container */
    offsetVertical: number;
    /** Horizontal offset, the horizontal gap between the trigger container and content container */
    offsetHorizontal: number;
}): Placement;
export declare function isVerticalPlacementValid({ triggerBCR, contentContainerBCR, verticalPlacement, offsetVertical, }: {
    triggerBCR: DOMRect;
    contentContainerBCR: DOMRect;
    verticalPlacement: VerticalPlacement;
    offsetVertical: number;
}): boolean;
export declare function isHorizontalPlacementValid({ triggerBCR, contentContainerBCR, horizontalPlacement, offsetHorizontal, }: {
    triggerBCR: DOMRect;
    contentContainerBCR: DOMRect;
    horizontalPlacement: HorizontalPlacement;
    offsetHorizontal: number;
}): boolean;
export declare function getTopPosition({ triggerBCR, contentContainerBCR, verticalPlacement, offsetVertical, }: {
    triggerBCR: DOMRect;
    contentContainerBCR: DOMRect;
    verticalPlacement: VerticalPlacement;
    offsetVertical: number;
}): number;
export declare function getLeftPosition({ triggerBCR, contentContainerBCR, horizontalPlacement, offsetHorizontal, }: {
    triggerBCR: DOMRect;
    contentContainerBCR: DOMRect;
    horizontalPlacement: HorizontalPlacement;
    offsetHorizontal: number;
}): number;
/**
 * Computes the tailwindcss className corresponding to transform orign based
 * on the content placement
 *
 * @param placement [VerticalPlacement, HorizontalPlacement] placement of the content
 */
export declare function getTransformOriginClassName(placement?: [VerticalPlacement, HorizontalPlacement]): string;
