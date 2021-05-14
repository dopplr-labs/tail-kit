import React from 'react';
declare type ContainerRef = React.RefObject<HTMLElement | null>;
declare type HookProps = {
    /**
     * Array of containers to be whitelisted. If any click event is triggered outside these containers,
     * then the handler would be called
     *
     * Make sure that this doesn't change during the runtime
     * use useMemoOne hook to set the containers
     */
    containers: ContainerRef[];
    /** Whether to listen for outside click or not */
    active: boolean;
    /** Handler function called on outside click */
    onClick: (event: MouseEvent) => void;
};
/**
 * Hook for handling click outside a parent container.
 * This hooks is useful while building elements like select and modal
 * where we need to close them on clicking outside the parent element.
 *
 * This poses an interesting challenge while nesting components that want to change their
 * state on outside click. For example, what would happen
 * when a select menu is present inside a modal. When the user clicks on outside,
 * we should close the select menu, rather than the modal. As the menu is *top most*
 * element present. So we need to maintain some kind of order, to save the top element
 * and the outside click handler should only call the handler for it.
 *
 * To do it
 * 1. we generate a containerId for each of the outside click handler hook
 * 2. if the hook is active we push the containerId to the list of container ids, and remove on deactive
 * 3. when a click is triggered, we check if the containerId for a hook correspond to the top containerId
 * 4. if step 3 is correct, then check if the element is triggered out the list of containers passed
 * 5. if step 4 is incorrect, then call the outside click handler
 *
 * **VERY VERY IMPORTANT NOTE**
 * From the above implementation details, you would have get a feeling that something is wrong. The
 * order of the elements are not determined semantically. If the parent element gets activated after the
 * child element, then the outside click handler of the parent would get fired, instead of the children. This might
 * seem very odd, but this is not a bug, but a feature.
 *
 * In our UI Kit, most of the elements which have to listen for the outside click to change their state
 * are rendered within a portal (which is appended directly inside the body), so checking if the element is present
 * inside the parent won't work as expected. For example
 *
 * <Modal>
 *  <Select>
 *  </Select>
 * </Modal>
 *
 * Both the Modal as well as Select would be rendered in a portal, so if you try to find the
 * children of select are present inside the Modal it won't work.
 *
 * This leaves us to our assumption that the select would be activated after the modal as rendered
 * (as the activation of Select would happen when it is opened, which can only happen after the Modal is opened).
 *
 *
 * So for now we rely on the activation order, rather than the semantic parent child relationship. If this assumption
 * breaks in future, we have to rethink this implementation.
 *
 * Best of Luck to the future maintainer. May you find an elegant implementation than this.
 *
 */
export declare function useOutsideClick({ containers, active, onClick }: HookProps, 
/**
 * array of container ids
 * by default it points to a global array, which need to be passed everytime,
 * this explict passing is done to make the hook testable
 */
elements?: string[]): void;
export {};
