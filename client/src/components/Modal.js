import React, { useState } from "react";
import Modal from "react-modal";
import Payment2 from "./Payment2";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_KEY);

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

Modal.setAppElement("#root");

const PaymentModal = () => {
  const [modalIsOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <div>
      <button onClick={openModal} className="btn">
        Make Payment
      </button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Payment Modal"
      >
        <h2>Enter Your Payment Information</h2>
        <Elements stripe={stripePromise}>
          <Payment2 />
        </Elements>
        <button
          className="btn red darken-3"
          style={{ marginTop: "6px" }}
          onClick={closeModal}
        >
          Close
        </button>
      </Modal>
    </div>
  );
};

export default PaymentModal;
