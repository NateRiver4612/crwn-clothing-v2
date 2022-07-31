import styled from "styled-components";
import { CardElement } from "@stripe/react-stripe-js";
import Button from "../button/button.component";

export const Form = styled.form`
  width: 58vw;
  display: flex;
  flex-direction: column;
  align-self: center;
  align-items: flex-end;
  box-shadow: 0px 0px 0px 0.5px rgba(50, 50, 93, 0.1),
    0px 2px 5px 0px rgba(50, 50, 93, 0.1), 0px 1px 1.5px 0px rgba(0, 0, 0, 0.07);
  border-radius: 7px;
  padding: 40px;
`;

export const Card = styled(CardElement)`
  border-radius: 4px 4px 0 0;
  padding: 12px;
  border: 1px solid rgba(50, 50, 93, 0.1);
  max-height: 44px;
  width: 100%;
  background: white;
  box-sizing: border-box;
`;

export const ButtonPay = styled(Button)`
  width: 20% !important;
`;
