import { FormInputLabel, Input, Group } from './form-input.styles';
import { FC, InputHTMLAttributes } from 'react';

export type FormInputProps_type = {
    label:string
} & InputHTMLAttributes<HTMLInputElement>

const FormInput:FC<FormInputProps_type> = ({ label, ...otherProps }) => {
    return (
        <Group>
            <Input className='form-input' {...otherProps} />
            {label && (
                <FormInputLabel
                    shrink={Boolean(otherProps.value && typeof otherProps.value === 'string' && otherProps.value.length) }
                >
                    {label}
                </FormInputLabel>
            )}
        </Group>
    );
};

export default FormInput;