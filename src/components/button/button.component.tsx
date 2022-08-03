import {ButtonHTMLAttributes, FC} from 'react'

import {
    BaseButton,
    GoogleSignInButton,
    InvertedButton,
    LoadingSpinner
} from './button.styles';

export enum BUTTON_TYPE_CLASSES {
    base =  'base',
    google =  'google-sign-in',
    inverted = 'inverted',
};

const getButton = (buttonType = BUTTON_TYPE_CLASSES.base): typeof BaseButton =>
({
    [BUTTON_TYPE_CLASSES.base]: BaseButton,
    [BUTTON_TYPE_CLASSES.google]: GoogleSignInButton,
    [BUTTON_TYPE_CLASSES.inverted]: InvertedButton,
}[buttonType]);

export type ButtonProps_Type = {
    processing?: boolean,
    buttonType?: BUTTON_TYPE_CLASSES,
    children: React.ReactNode,
} & ButtonHTMLAttributes<HTMLButtonElement>  

const Button: FC<ButtonProps_Type> = ({ children, processing = false, buttonType, ...otherProps }) => {
    const CustomButton = getButton(buttonType);

    return (
        <CustomButton {...otherProps} {...otherProps}>
            {processing ? < LoadingSpinner /> : children}
        </CustomButton >
    )
}
export default Button