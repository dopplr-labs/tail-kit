import React from 'react';
/**
 * Avatar Properties
 */
export declare type AvatarProps = {
    /** Add alternating text describing the image if you are using src prop */
    alt?: string;
    /** Render string inside Avatar */
    children?: string;
    /** Customize Avatar styles using className */
    className?: string;
    /** Render custom icon inside Avatar */
    icon?: React.ReactElement;
    /** The shape of Avatar */
    shape?: 'circle' | 'square';
    /** The size of Avatar */
    size?: 'large' | 'default' | 'small';
    /** Image source address to render inside Avatar */
    src?: string;
    /** Customize Avatar styles using style prop */
    style?: React.CSSProperties;
};
/**
 * Avatar can be used to represent users, collaborators or objects.
 * You can render `image`, `icon` or `text` inside Avatars.
 */
export declare function Avatar({ alt, children, className, icon, shape, size, src, style, }: AvatarProps): JSX.Element;
