import React, { useState } from "react";
import { connect } from "react-redux";
import * as actions from "../actions/index";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

function Payment(props) {
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);

    const cardElement = elements.getElement(CardElement);
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    if (error) {
      setIsLoading(false);
      setErrorMessage(error.message);
    } else {
      const response = await fetch("/api/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ paymentMethodId: paymentMethod.id }),
      });

      const paymentResult = await response.json();

      if (paymentResult.error) {
        setErrorMessage(paymentResult.error.message);
      } else {
        setPaymentSuccess(true);
        cardElement.clear();
        props.fetchUser();
      }
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement options={cardStyle} />
      <button
        type="submit"
        style={{ marginTop: "6px" }}
        className="btn"
        disabled={!stripe || isLoading}
      >
        {isLoading ? "Processing..." : "Pay"}
      </button>
      {errorMessage && <div className="error">{errorMessage}</div>}
      {paymentSuccess && <div className="success">Payment successful!</div>}
    </form>
  );
}

const cardStyle = {
  style: {
    base: {
      color: "#32325d",
      fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
      fontSmoothing: "antialiased",
      fontSize: "16px",
      "::placeholder": {
        color: "#aab7c4",
      },
    },
    invalid: {
      color: "#fa755a",
      iconColor: "#fa755a",
    },
  },
};

export default connect(null, actions)(Payment);
