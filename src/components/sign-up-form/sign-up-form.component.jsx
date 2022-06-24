import { useState } from 'react'
import FormInput from '../form-input/form-input.component'
import { createUserAuthWithEmailAndPassword } from '../../utils/firebase/firebase.utils'


const defaultFormField = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
}


const SignUpForm = () => {
    const [formFields, setFormFields] = useState(defaultFormField)
    const { displayName, email, password, confirmPassword } = formFields

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormFields({ ...formFields, [name]: value })
    }


    const handleSubmit = async (event) => {
        event.preventDefalut();
        await createUserAuthWithEmailAndPassword(email, password)
    }


    return (
        <div>
            <h1>Sign up with your email and password</h1>
            <form onClick={handleSubmit}>
                <FormInput
                    label='Display Name'
                    type='text'
                    required
                    onChange={handleChange}
                    name='displayName'
                    value={displayName}
                />

                <FormInput
                    label='Email'
                    type='email'
                    required
                    onChange={handleChange}
                    name='email'
                    value={email}
                />

                <FormInput
                    label='Password'
                    type='password'
                    required
                    onChange={handleChange}
                    name='password'
                    value={password}
                />

                <FormInput
                    label='Confirm Password'
                    type='password'
                    required
                    onChange={handleChange}
                    name='confirmPassword'
                    value={confirmPassword}
                />
                <button type='submit'>Sign Up</button>
            </form>
        </div>
    )
}

export default SignUpForm