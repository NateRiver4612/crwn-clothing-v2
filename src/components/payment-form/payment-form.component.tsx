import React, { useState, useEffect, FormEvent } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { Form, Card, ButtonPay } from "./payment-form.styles";
import { selectCurrentUser } from "../../store/user/user.seletor";
import { useSelector } from "react-redux/es/exports";
import { selectCartTotal } from "../../store/cart/cart.selector";

import { StripeCardElement } from "@stripe/stripe-js";

const cardStyle = {
  style: {
    base: {
      color: "#32325d",
      fontFamily: "Arial, sans-serif",
      fontSmoothing: "antialiased",
      fontSize: "16px",
      "::placeholder": {
        color: "#32325d",
      },
    },
    invalid: {
      fontFamily: "Arial, sans-serif",
      color: "#fa755a",
      iconColor: "#fa755a",
    },
  },
};

const isStripeCardElement = (
  card: StripeCardElement | null
): card is StripeCardElement => card !== null;

export const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState("");
  const [processing, setProcessing] = useState(false);

  const currentUser = useSelector(selectCurrentUser);
  const cartTotal = useSelector(selectCartTotal);

  //set client secret
  useEffect(() => {
    const setClientSecretHelper = async () => {
      const response = await fetch(
        "/.netlify/functions/create-payment-intent",
        {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ amount: (cartTotal as number) * 100 }),
        }
      ).then((res) => res.json());

      const clientSecret = response.paymentIntent.client_secret;
      setClientSecret(clientSecret);
    };

    setClientSecretHelper();
  }, []);

  const handleSubmit = async (e: FormEvent): Promise<void> => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }
    setProcessing(true);

    const StripeCard = elements.getElement(CardElement);

    if (!isStripeCardElement(StripeCard)) return;

    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: StripeCard,
        billing_details: {
          name: currentUser ? currentUser.displayName : "Guest",
        },
      },
    });

    if (payload.error) {
      alert(payload.error.message);
      setProcessing(false);
    } else {
      if (payload.paymentIntent.status === "succeeded") {
        alert("Payment Successful!");
        setProcessing(false);
      }
    }
  };

  return (
    <Form id="payment-form" onSubmit={handleSubmit}>
      <Card id="card-element" options={cardStyle} />
      <ButtonPay processing={processing}>Pay now</ButtonPay>
    </Form>
  );
};
