import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { Row } from "react-bootstrap";
import {
  PaymentFormContainer,
  FormContainer,
  PaymentButton,
} from "./payment-form-styles";
import { useState } from "react";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../store/selector/user.selector";
import { selectCartTotal } from "../../store/cart/cart.selector";
import { BUTTON_TYPE_CLASSES } from "../button/button.component";
export const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const amount = useSelector(selectCartTotal);
  const currentUser = useSelector(selectCurrentUser);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const paymentHandler = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    setIsProcessingPayment(true);
    const response = await fetch("/.netlify/functions/create-payment-intent", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount: amount * 100 }),
    }).then((res) => res.json());

    const {
      paymentIntent: { client_secret },
    } = response;
    console.log(client_secret);
    const paymentResult = await stripe.confirmCardPayment(client_secret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: currentUser ? currentUser.displayName : "Guest",
        },
      },
    });
    setIsProcessingPayment(false);
    if (paymentResult.error) {
      alert(paymentResult.error.message);
    } else {
      if (paymentResult.paymentIntent.status === "succeeded") {
        alert("Payment Successful!");
      }
    }
  };
  return (
    <PaymentFormContainer>
      <FormContainer onSubmit={paymentHandler}>
        <h2 className="mb-5"> Credit Card Payment </h2>
        <CardElement />
        <Row className="justify-content-center">
          <PaymentButton
            buttonType={BUTTON_TYPE_CLASSES.inverted}
            isLoading={isProcessingPayment}
            type="submit"
          >
            Pay Now
          </PaymentButton>
        </Row>
      </FormContainer>
    </PaymentFormContainer>
  );
};
