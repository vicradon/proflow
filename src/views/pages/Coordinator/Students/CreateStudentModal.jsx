import React, { useState, useEffect } from "react";
import { Modal, Form } from "react-bootstrap";
import SubmitButton from "../../../../components/SubmitButton.jsx";
import errorHandler from "../../../../utils/errorHandler.js";
import maxios from "../../../../utils/maxios";

function CreateStudentModal({ showModal, closeModal, addToStudents }) {
  const [formSubmitted, setFormSubmitted] = useState(false);

  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    department: "",
    reg_number: "",
    password: "password",
  });
  const handleInputChange = ({ target }) => {
    const { name, value } = target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setFormSubmitted(true);
      const { data } = await maxios.post("/register?role=student", formData);
      addToStudents(data.user);
      setFormSubmitted(false);

      closeModal();
    } catch (error) {
      errorHandler(error).then((message) => setError(message));
      setFormSubmitted(false);
    }
  };
  return (
    <Modal centered show={showModal} onHide={closeModal}>
      <Modal.Body>
        <Form onSubmit={handleSubmit} className="mb-4 d-block">
          <Form.Row className="mb-3 w-100">
            <Form.Label>Full Name</Form.Label>
            <Form.Control
              onChange={handleInputChange}
              name="name"
              placeholder="e.g. John Doe"
              required
            />
          </Form.Row>
          <Form.Row className="mb-3 w-100">
            <Form.Label>Email</Form.Label>
            <Form.Control
              onChange={handleInputChange}
              name="email"
              placeholder="e.g. john.doe@gmail.com"
              required
            />
          </Form.Row>

          <Form.Row className="mb-3 w-100">
            <Form.Label>Reg Number</Form.Label>
            <Form.Control
              onChange={handleInputChange}
              name="reg_number"
              placeholder="e.g. 20171038424"
              required
            />
          </Form.Row>

          <Form.Row className="mb-3 w-100">
            <Form.Label>Department</Form.Label>
            <Form.Control
              onChange={handleInputChange}
              name="department"
              placeholder="e.g. Electrical Physics"
              required
            />
          </Form.Row>
          <p className="text-danger">{error}</p>

          <SubmitButton disabled={formSubmitted} className="w-100" />
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default CreateStudentModal;
