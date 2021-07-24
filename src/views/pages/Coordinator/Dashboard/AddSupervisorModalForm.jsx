import React, { useState, useEffect } from "react";
import { Modal, Form } from "react-bootstrap";
import SubmitButton from "../../../../components/SubmitButton.jsx";
import maxios from "../../../../utils/maxios";

function AddSupervisorModalForm({
  showModal,
  closeModal,
  addToSupervisors,
  projectCategories,
  summary,
  setSummary,
}) {
  const [formSubmitted, setFormSubmitted] = useState(false);

  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    department: "",
    project_category: "",
  });
  const handleInputChange = ({ target }) => {
    const { name, value } = target;
    setFormData({ ...formData, [name]: value });
  };

  useEffect(() => {
    if (projectCategories.length > 0) {
      setFormData({ ...formData, project_category: projectCategories[0].name });
    }
  }, [projectCategories]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setFormSubmitted(true);
      const { data } = await maxios.post("/supervisor/register", formData);
      addToSupervisors(data.supervisor);
      setFormSubmitted(false);
      setSummary({
        ...summary,
        supervisor_count: summary.supervisor_count + 1,
      });
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
          {projectCategories.length > 0 && (
            <Form.Row className="mb-3 w-100">
              <Form.Label>Supervisors category</Form.Label>
              <select
                name="project_category"
                onChange={handleInputChange}
                className="form-control"
                defaultValue={projectCategories[0].name}
                required
              >
                {projectCategories.map((category) => (
                  <option key={category.name} value={category.name}>
                    {category.name}
                  </option>
                ))}
              </select>
            </Form.Row>
          )}
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
