import { Form } from "react-bootstrap";
import GeneralTemplate from "../../../templates/GeneralTemplate/GeneralTemplate";
import { useHistory } from "react-router-dom";
import SubmitButton from "../../../../components/SubmitButton";
import { Fragment, useState, useEffect } from "react";
import maxios from "../../../../utils/maxios";
import LoadingPage from "../../Shared/LoadingPage";

function ProjectDetails() {
  const [loading, setLoading] = useState(true);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [error, setError] = useState("");
  const history = useHistory();
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    description: "",
    project_id: "",
  });
  const handleInputChange = ({ target }) => {
    const { name, value } = target;
    setFormData({ ...formData, [name]: value });
  };

  useEffect(() => {
    checkForRejectedProject();
  }, []);

  const checkForRejectedProject = async () => {
    try {
      const { data: project_data } = await maxios.get(`/project-status`);
      if (project_data.status === "rejected") {
        const { data: project_details } = await maxios.get("/project");
        setEditMode(true);
        setFormData({
          ...formData,
          name: project_details.project.name,
          description: project_details.project.description,
          category: project_details.project.project_category.name,
          project_id: project_details.project.id,
        });
        setLoading(false);
      }
      if (project_data.status === "pending") {
        history.push("/student/project/status");
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const handleSubmit = async (event) => {
    try {
      setError("");
      setFormSubmitted(true);
      event.preventDefault();

      if (editMode) {
        await maxios.patch(`/projects/${formData.project_id}`, formData);
      } else {
        await maxios.post("/projects", formData);
      }

      history.push(`/student/project/status`);
    } catch (error) {
      // const errors = error.response.data.errors
      //   ? Object.values(error.response.data.errors).join("\n")
      //   : "An error occured, our engineers are working hard to fix it";
      // setError(errors);

      setError(error.response.data.message);
      setFormSubmitted(false);
    }
  };

  return (
    <Fragment>
      {loading && <LoadingPage />}
      {!loading && (
        <GeneralTemplate noAuth>
          {editMode ? (
            <h5 className="text-center">
              Ammend your project so it can be accepted
            </h5>
          ) : (
            <h5 className="text-center">
              Let's get started with a few details about your project
            </h5>
          )}
          <Form onSubmit={handleSubmit} className="mb-4">
            <Form.Group className="mb-3">
              <Form.Label>Project Name</Form.Label>
              <Form.Control
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                placeholder="e.g. Automating logistics hauling in Nigeria."
              />
            </Form.Group>
            {!editMode && (
              <Form.Group className="mb-3">
                <Form.Label>Project Category</Form.Label>

                <Form.Control
                  name="category"
                  value={formData.category}
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
            )}{" "}
            <Form.Group className="mb-3">
              <Form.Label>Project Description</Form.Label>
              <Form.Control
                as="textarea"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={6}
                required
                placeholder="Enter short description about your project"
              />
            </Form.Group>
            {error && <p className="text-center">{error}</p>}
            <div className="d-flex justify-content-end">
              <SubmitButton disabled={formSubmitted}>
                {editMode ? "Update" : "Submit"}
              </SubmitButton>
            </div>
          </Form>
        </GeneralTemplate>
      )}
    </Fragment>
  );
}

export default ProjectDetails;
