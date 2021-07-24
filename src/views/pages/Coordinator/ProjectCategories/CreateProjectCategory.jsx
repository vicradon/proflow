import { useState } from "react";
import { Form } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import DashboardTemplate from "../../../templates/DashboardTemplate/DashboardTemplate";
import SubmitButton from "../../../../components/SubmitButton.jsx";
import maxios from "../../../../utils/maxios";

function CreateProjectCategory() {
  const [formSubmiting, setFormSubmiting] = useState(false);
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const history = useHistory();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setFormSubmiting(true);
      const { data } = await maxios.post("/project-categories", { name });
      setFormSubmiting(false);
      history.push("/coordinator/project-categories");
    } catch (error) {
      setError(error.response.data.message);
      setFormSubmiting(false);
    }
  };

  return (
    <DashboardTemplate>
      <div className="mx-4">
        <p className="text-gray font-weight-bold text-center">
          Create Project Category
        </p>

        <Form onSubmit={handleSubmit} className="mb-4 d-block">
          <Form.Row className="mb-3 w-100">
            <Form.Label>Category name</Form.Label>
            <Form.Control
              onChange={({ target }) => setName(target.value)}
              placeholder="e.g. John"
            />
          </Form.Row>

          <div className="d-flex justify-content-end my-10">
            <SubmitButton disabled={formSubmiting} className="w-23 left-align">
              Add
            </SubmitButton>
          </div>
        </Form>
      </div>
    </DashboardTemplate>
  );
}

export default CreateProjectCategory;
