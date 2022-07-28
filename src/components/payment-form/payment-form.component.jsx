import React, { useState, useEffect } from "react";
import {
    useStripe,
    useElements,
    CardElement
} from "@stripe/react-stripe-js";
import { Form, Card, ButtonPay } from "./payment-form.styles";
import { selectCurrentUser } from "../../store/user/user.seletor";
import { useSelector } from "react-redux/es/exports";
import { selectCartTotal } from "../../store/cart/cart.selector";

const cardStyle = {
    style: {
        base: {
            color: "#32325d",
            fontFamily: 'Arial, sans-serif',
            fontSmoothing: "antialiased",
            fontSize: "16px",
            "::placeholder": {
                color: "#32325d"
            }
        },
        invalid: {
            fontFamily: 'Arial, sans-serif',
            color: "#fa755a",
            iconColor: "#fa755a"
        }
    }
};



export const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const [clientSecret, setClientSecret] = useState('');
    const [processing, setProcessing] = useState('');

    const currentUser = useSelector(selectCurrentUser)
    const cartTotal = useSelector(selectCartTotal)

    console.log(cartTotal)
    console.log(currentUser)


    //set client secret
    useEffect(() => {
        const setClientSecretHelper = async () => {
            const response = await fetch("/.netlify/functions/create-payment-intent", {
                method: "post",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ amount: cartTotal * 100 })
            }).then((res) => res.json())

            const clientSecret = response.paymentIntent.client_secret
            setClientSecret(clientSecret)
        }

        setClientSecretHelper()

    }, [])


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!stripe || !elements) {
            return;
        }
        setProcessing(true);

        const payload = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement),
                billing_details: {
                    name: currentUser ? currentUser.displayName : "Guest"
                }
            }
        })

        if (payload.error) {
            alert(payload.error.message);
            setProcessing(false);
        } else {
            if (payload.paymentIntent.status === 'succeeded') {
                alert('Payment Successful!');
                setProcessing(false)
            }
        }

    }



    return (
        <Form id="payment-form" onSubmit={handleSubmit}>
            <Card id="card-element" options={cardStyle} />
            <ButtonPay processing={processing}>Pay now</ButtonPay>
        </Form>
    );
}