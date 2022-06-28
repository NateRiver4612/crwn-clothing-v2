import { useState } from 'react'
import FormInput from '../form-input/form-input.component'
import { createUserAuthWithEmailAndPassword, createUserDocumentFromAuth } from '../../utils/firebase/firebase.utils'
import './sign-up-form.styles.scss'
import Button from '../button/button.component'

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


    const resetFormFields = () => {
        setFormFields(defaultFormField);
    };


    const handleSubmit = async (event) => {
        event.preventDefault();

        if (password !== confirmPassword) {
            alert("Password do not match")
            return
        }

        try {

            const { user } = await createUserAuthWithEmailAndPassword(email, password)

            await createUserDocumentFromAuth(user, { displayName })

            //reset formfiels
            resetFormFields(defaultFormField)

            alert("Sign up successfully")
        } catch (error) {
            if (error.code === 'auth/email-already-in-use') {
                alert('Cannot create user, email already in use');
            } else {
                console.log("Firebase createUserAuthWithEmailAndPassword failed", error)
            }
        }
    }


    return (
        <div className='sign-up-container'>
            <h2>Don't have account </h2>
            <span>Sign up with your email and password</span>
            <form onSubmit={handleSubmit}>
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

                <Button type='submit'>Sign Up</Button>
            </form>
        </div >
    )
}

export default SignUpForm