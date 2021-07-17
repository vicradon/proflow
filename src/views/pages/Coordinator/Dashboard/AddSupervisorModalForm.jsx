import React, { useState, useEffect } from "react";
import { Modal, Form } from "react-bootstrap";
import SubmitButton from "../../../../components/SubmitButton.jsx";
import maxios from "../../../../utils/maxios";

function AddSupervisorModalForm({ showModal, closeModal, addToSupervisors }) {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    department: "",
    project_category: "iot",
  });
  const handleInputChange = ({ target }) => {
    const { name, value } = target;
    setFormData({ ...formData, [name]: value });
  };
  useEffect(() => {}, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setFormSubmitted(true);
      const { data } = await maxios.post("/supervisor/register", formData);
      addToSupervisors(data.supervisor);
      setFormSubmitted(false);
      closeModal();
    } catch (error) {
      setError(error.response.data.message);
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
              placeholder="e.g. Dr John Doe"
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
            <Form.Label>Supervisors category</Form.Label>
            <select
              name="project_category"
              onChange={handleInputChange}
              className="form-control"
              defaultValue="iot"
              required
            >
              <option value="iot">IoT</option>
              <option value="transportation">Transportation</option>
              <option value="communication">Communication</option>
            </select>
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

export default AddSupervisorModalForm;
