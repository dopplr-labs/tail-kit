/// <reference types="react" />
import { Control, FieldErrors } from 'react-hook-form';
import { FormItemLayout } from './form-item';
declare enum LayoutOptions {
    HORIZONTAL = "horizontal",
    VERTICAL = "vertical",
    INLINE = "inline"
}
declare const FormContext: import("react").Context<{
    errors: FieldErrors;
    layout: LayoutOptions;
    formLabelCol?: FormItemLayout;
    formWrapperCol?: FormItemLayout;
    control?: Control;
}>;
export default FormContext;
