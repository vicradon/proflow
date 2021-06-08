import { Form } from "react-bootstrap";
import GeneralTemplate from "../../../templates/GeneralTemplate/GeneralTemplate";
import { useHistory } from "react-router-dom";
import SubmitButton from "../../../../components/SubmitButton";
import { useState } from "react";
import maxios from "../../../../utils/maxios";

function ProjectDetails() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [error, setError] = useState("");
  const history = useHistory();
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    description: "",
  });
  const handleInputChange = ({ target }) => {
    const { name, value } = target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    try {
      setError("");
      setFormSubmitted(true);
      event.preventDefault();

      const { data } = await maxios.post("/projects", formData);
      history.push(`/project/status/${data.supervisor_id}`);
    } catch (error) {
      const errors = error.response.data.errors
        ? Object.values(error.response.data.errors).join("\n")
        : "An error occured, our engineers are working hard to fix it";

      setError(errors);
      setFormSubmitted(false);
    }
  };

  return (
    <GeneralTemplate noAuth>
      <h5 className="text-center">
        Let's get started with a few details about your project
      </h5>
      <Form onSubmit={handleSubmit} className="mb-4">
        <Form.Group className="mb-3">
          <Form.Label>Project Name</Form.Label>
          <Form.Control
            name="name"
            onChange={handleInputChange}
            required
            placeholder="e.g. Automating logistics hauling in Nigeria."
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Project Category</Form.Label>

          <Form.Control
            name="category"
            onChange={handleInputChange}
            required
            as="select"
            custom
          >
            <option value="">Select Project Category</option>
            <option value="iot">IoT</option>
            <option value="transportation">Transportation</option>
            <option value="communication">Communication</option>
          </Form.Control>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Project Description</Form.Label>
          <Form.Control
            as="textarea"
            name="description"
            onChange={handleInputChange}
            rows={6}
            required
            placeholder="Enter short description about your project"
          />
        </Form.Group>

        <div className="d-flex justify-content-end">
          <SubmitButton disabled={formSubmitted} />
        </div>
      </Form>
    </GeneralTemplate>
  );
}

export default ProjectDetails;
