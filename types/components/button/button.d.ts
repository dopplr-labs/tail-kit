import React from 'react'
/** Button types */
export declare enum ButtonType {
  primary = 'primary',
  default = 'default',
  danger = 'danger',
  link = 'link',
}
/** Placement of icon with respect to button label */
export declare enum IconPlacement {
  /** icon would be render after the button text */
  afterLabel = 'afterLabel',
  /** icon would be render before the button text */
  beforeLabel = 'beforeLabel',
}
/**
 * Button properties
 */
export declare type ButtonProps = Omit<
  React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >,
  'children'
> & {
  /** text rendered inside button */
  label?: string
  /** icon rendered */
  icon?: JSX.Element
  /** placement of icon with respect to label, whether it should be before label or after label */
  iconPlacement?: IconPlacement
  /** type of the button */
  buttonType?: ButtonType
  /** show loading spinner in the button, if there is a icon present, it would render instead of the icon */
  loading?: boolean
  /** additional class applied to button */
  className?: string
  /** button styles */
  style?: React.CSSProperties
}
/**
 * Base component to render **button**.
 *
 * `Button` can be of type
 *
 *   * **primary** `Button.ButtonType.primary` solid filled button (with primary background color), to be used for primary actions
 *   * **default** `Button.ButtonType.default` bordered button (primary color) and text in primary color, to be used for secondary actions
 *   * **danger** `Button.ButtonType.danger` bordered button with error color, to be used in case of presenting any delete action to user
 *   * **link** `Button.ButtonType.link` button without any border, can be used to render menu icons where we don't want to show users any button border
 *
 *
 *  Generally the **icon** is placed before the button label. But that can also be changed, by configuring
 * `iconPlacement` prop to be
 *
 *  * `Button.IconPlacement.beforeLabel` rendering the button icon before the label
 *  * `Button.IconPlacement.afterLabel` rendering the button icon after the label
 */
export declare const Button: React.ForwardRefExoticComponent<
  Pick<
    Omit<
      React.DetailedHTMLProps<
        React.ButtonHTMLAttributes<HTMLButtonElement>,
        HTMLButtonElement
      >,
      'children'
    > & {
      /** text rendered inside button */
      label?: string
      /** icon rendered */
      icon?: JSX.Element
      /** placement of icon with respect to label, whether it should be before label or after label */
      iconPlacement?: IconPlacement
      /** type of the button */
      buttonType?: ButtonType
      /** show loading spinner in the button, if there is a icon present, it would render instead of the icon */
      loading?: boolean
      /** additional class applied to button */
      className?: string
      /** button styles */
      style?: React.CSSProperties
    },
    | 'disabled'
    | 'loading'
    | 'hidden'
    | 'dir'
    | 'form'
    | 'label'
    | 'slot'
    | 'style'
    | 'title'
    | 'color'
    | 'icon'
    | 'translate'
    | 'prefix'
    | 'key'
    | 'className'
    | 'autoFocus'
    | 'formAction'
    | 'formEncType'
    | 'formMethod'
    | 'formNoValidate'
    | 'formTarget'
    | 'name'
    | 'type'
    | 'value'
    | 'defaultChecked'
    | 'defaultValue'
    | 'suppressContentEditableWarning'
    | 'suppressHydrationWarning'
    | 'accessKey'
    | 'contentEditable'
    | 'contextMenu'
    | 'draggable'
    | 'id'
    | 'lang'
    | 'placeholder'
    | 'spellCheck'
    | 'tabIndex'
    | 'radioGroup'
    | 'role'
    | 'about'
    | 'datatype'
    | 'inlist'
    | 'property'
    | 'resource'
    | 'typeof'
    | 'vocab'
    | 'autoCapitalize'
    | 'autoCorrect'
    | 'autoSave'
    | 'itemProp'
    | 'itemScope'
    | 'itemType'
    | 'itemID'
    | 'itemRef'
    | 'results'
    | 'security'
    | 'unselectable'
    | 'inputMode'
    | 'is'
    | 'aria-activedescendant'
    | 'aria-atomic'
    | 'aria-autocomplete'
    | 'aria-busy'
    | 'aria-checked'
    | 'aria-colcount'
    | 'aria-colindex'
    | 'aria-colspan'
    | 'aria-controls'
    | 'aria-current'
    | 'aria-describedby'
    | 'aria-details'
    | 'aria-disabled'
    | 'aria-dropeffect'
    | 'aria-errormessage'
    | 'aria-expanded'
    | 'aria-flowto'
    | 'aria-grabbed'
    | 'aria-haspopup'
    | 'aria-hidden'
    | 'aria-invalid'
    | 'aria-keyshortcuts'
    | 'aria-label'
    | 'aria-labelledby'
    | 'aria-level'
    | 'aria-live'
    | 'aria-modal'
    | 'aria-multiline'
    | 'aria-multiselectable'
    | 'aria-orientation'
    | 'aria-owns'
    | 'aria-placeholder'
    | 'aria-posinset'
    | 'aria-pressed'
    | 'aria-readonly'
    | 'aria-relevant'
    | 'aria-required'
    | 'aria-roledescription'
    | 'aria-rowcount'
    | 'aria-rowindex'
    | 'aria-rowspan'
    | 'aria-selected'
    | 'aria-setsize'
    | 'aria-sort'
    | 'aria-valuemax'
    | 'aria-valuemin'
    | 'aria-valuenow'
    | 'aria-valuetext'
    | 'dangerouslySetInnerHTML'
    | 'onCopy'
    | 'onCopyCapture'
    | 'onCut'
    | 'onCutCapture'
    | 'onPaste'
    | 'onPasteCapture'
    | 'onCompositionEnd'
    | 'onCompositionEndCapture'
    | 'onCompositionStart'
    | 'onCompositionStartCapture'
    | 'onCompositionUpdate'
    | 'onCompositionUpdateCapture'
    | 'onFocus'
    | 'onFocusCapture'
    | 'onBlur'
    | 'onBlurCapture'
    | 'onChange'
    | 'onChangeCapture'
    | 'onBeforeInput'
    | 'onBeforeInputCapture'
    | 'onInput'
    | 'onInputCapture'
    | 'onReset'
    | 'onResetCapture'
    | 'onSubmit'
    | 'onSubmitCapture'
    | 'onInvalid'
    | 'onInvalidCapture'
    | 'onLoad'
    | 'onLoadCapture'
    | 'onError'
    | 'onErrorCapture'
    | 'onKeyDown'
    | 'onKeyDownCapture'
    | 'onKeyPress'
    | 'onKeyPressCapture'
    | 'onKeyUp'
    | 'onKeyUpCapture'
    | 'onAbort'
    | 'onAbortCapture'
    | 'onCanPlay'
    | 'onCanPlayCapture'
    | 'onCanPlayThrough'
    | 'onCanPlayThroughCapture'
    | 'onDurationChange'
    | 'onDurationChangeCapture'
    | 'onEmptied'
    | 'onEmptiedCapture'
    | 'onEncrypted'
    | 'onEncryptedCapture'
    | 'onEnded'
    | 'onEndedCapture'
    | 'onLoadedData'
    | 'onLoadedDataCapture'
    | 'onLoadedMetadata'
    | 'onLoadedMetadataCapture'
    | 'onLoadStart'
    | 'onLoadStartCapture'
    | 'onPause'
    | 'onPauseCapture'
    | 'onPlay'
    | 'onPlayCapture'
    | 'onPlaying'
    | 'onPlayingCapture'
    | 'onProgress'
    | 'onProgressCapture'
    | 'onRateChange'
    | 'onRateChangeCapture'
    | 'onSeeked'
    | 'onSeekedCapture'
    | 'onSeeking'
    | 'onSeekingCapture'
    | 'onStalled'
    | 'onStalledCapture'
    | 'onSuspend'
    | 'onSuspendCapture'
    | 'onTimeUpdate'
    | 'onTimeUpdateCapture'
    | 'onVolumeChange'
    | 'onVolumeChangeCapture'
    | 'onWaiting'
    | 'onWaitingCapture'
    | 'onAuxClick'
    | 'onAuxClickCapture'
    | 'onClick'
    | 'onClickCapture'
    | 'onContextMenu'
    | 'onContextMenuCapture'
    | 'onDoubleClick'
    | 'onDoubleClickCapture'
    | 'onDrag'
    | 'onDragCapture'
    | 'onDragEnd'
    | 'onDragEndCapture'
    | 'onDragEnter'
    | 'onDragEnterCapture'
    | 'onDragExit'
    | 'onDragExitCapture'
    | 'onDragLeave'
    | 'onDragLeaveCapture'
    | 'onDragOver'
    | 'onDragOverCapture'
    | 'onDragStart'
    | 'onDragStartCapture'
    | 'onDrop'
    | 'onDropCapture'
    | 'onMouseDown'
    | 'onMouseDownCapture'
    | 'onMouseEnter'
    | 'onMouseLeave'
    | 'onMouseMove'
    | 'onMouseMoveCapture'
    | 'onMouseOut'
    | 'onMouseOutCapture'
    | 'onMouseOver'
    | 'onMouseOverCapture'
    | 'onMouseUp'
    | 'onMouseUpCapture'
    | 'onSelect'
    | 'onSelectCapture'
    | 'onTouchCancel'
    | 'onTouchCancelCapture'
    | 'onTouchEnd'
    | 'onTouchEndCapture'
    | 'onTouchMove'
    | 'onTouchMoveCapture'
    | 'onTouchStart'
    | 'onTouchStartCapture'
    | 'onPointerDown'
    | 'onPointerDownCapture'
    | 'onPointerMove'
    | 'onPointerMoveCapture'
    | 'onPointerUp'
    | 'onPointerUpCapture'
    | 'onPointerCancel'
    | 'onPointerCancelCapture'
    | 'onPointerEnter'
    | 'onPointerEnterCapture'
    | 'onPointerLeave'
    | 'onPointerLeaveCapture'
    | 'onPointerOver'
    | 'onPointerOverCapture'
    | 'onPointerOut'
    | 'onPointerOutCapture'
    | 'onGotPointerCapture'
    | 'onGotPointerCaptureCapture'
    | 'onLostPointerCapture'
    | 'onLostPointerCaptureCapture'
    | 'onScroll'
    | 'onScrollCapture'
    | 'onWheel'
    | 'onWheelCapture'
    | 'onAnimationStart'
    | 'onAnimationStartCapture'
    | 'onAnimationEnd'
    | 'onAnimationEndCapture'
    | 'onAnimationIteration'
    | 'onAnimationIterationCapture'
    | 'onTransitionEnd'
    | 'onTransitionEndCapture'
    | 'iconPlacement'
    | 'buttonType'
  > &
    React.RefAttributes<HTMLButtonElement>
> & {
  ButtonType: typeof ButtonType
  IconPlacement: typeof IconPlacement
}
