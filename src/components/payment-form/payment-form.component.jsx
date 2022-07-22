import React, { useState, useEffect } from "react";
import {
    useStripe,
    useElements
} from "@stripe/react-stripe-js";
import { Form, Card, ButtonPay } from "./payment-form.styles";
import { async } from "@firebase/util";


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

    //set client secret
    useEffect(() => {
        const setClientSecretHelper = async () => {
            const response = await fetch("/.netlify/functions/create-payment-intent", {
                method: "post",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ amount: 1000 * 100 })
            }).then((res) => res.json())

            console.log(response)
        }

        setClientSecretHelper()

    }, [])


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!stripe || !elements) {
            return;
        }

        setProcessing(true);


    }



    return (
        <Form id="payment-form" onSubmit={handleSubmit}>
            <Card id="card-element" options={cardStyle} />
            <ButtonPay >Pay now</ButtonPay>
        </Form>
    );
}