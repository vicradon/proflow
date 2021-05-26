import React from "react";
import { Modal, Button } from "react-bootstrap";
import Images from "./Images";

function SignupSuccessModal({ showModal, closeModal }) {
  return (
    <Modal centered show={showModal} onHide={closeModal}>
      <Modal.Body className="d-flex py-4 flex-column align-items-center">
        <img style={{ width: "100px" }} src={Images.TextLogo} alt="text logo" />
        <img
          style={{ width: "100px" }}
          src={Images.Checkmark}
          alt="Checkmark"
          className="my-4"
        />
        <p className="mb-3">Registration Successful!</p>
        <Button variant="primary">Go to dashboard</Button>
      </Modal.Body>
    </Modal>
  );
}

export default SignupSuccessModal;
