import { Form } from "react-bootstrap";
import GeneralTemplate from "../../../templates/GeneralTemplate/GeneralTemplate";
import { useHistory } from "react-router-dom";
import SubmitButton from "../../../../components/SubmitButton";
import { Fragment, useState, useEffect } from "react";
import maxios from "../../../../utils/maxios";
import LoadingPage from "../../Shared/LoadingPage";

function ProjectDetails() {
  const [loading, setLoading] = useState(true);
  const [supervisorCount, setSupervisorCount] = useState(0);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [projectCategories, setProjectCategories] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [error, setError] = useState("");
  const history = useHistory();
  const [formData, setFormData] = useState({
    name: "",
    project_category: "",
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
  useEffect(() => {
    if (projectCategories.length > 0) {
      setFormData({ ...formData, project_category: projectCategories[0].name });
    }
  }, [projectCategories]);

  const checkForRejectedProject = async () => {
    try {
      const { data: projectCategoriesData } = await maxios.get(
        "/project-categories?with_supervisors"
      );
      const { data: supervisorCountData } = await maxios.get(
        "/supervisors/count"
      );
      setSupervisorCount(supervisorCountData.supervisor_count);

      setProjectCategories(projectCategoriesData.project_categories);
      const { data: project_data } = await maxios.get(`/project-status`);
      if (project_data.status === "rejected") {
        const { data: project_details } = await maxios.get("/project");
        setEditMode(true);
        setFormData({
          ...formData,
          name: project_details.project.name,
          description: project_details.project.description,
          project_category: project_details.project.project_category.name,
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
      event.preventDefault();
      setError("");
      setFormSubmitted(true);

      if (editMode) {
        await maxios.patch(`/projects/${formData.project_id}`, {
          ...formData,
          status: "pending",
        });
      } else {
        await maxios.post("/projects", formData);
      }

      history.push(`/student/project/status`);
    } catch (error) {
      errorHandler(error).then((message) => setError(message));
      setFormSubmitted(false);
    }
  };

  return (
    <Fragment>
      {loading && <LoadingPage />}
      {!loading && (
        <GeneralTemplate>
          {supervisorCount === 0 && (
            <p className="text-center">
              No supervisor has been added, so project creation is currently not
              permitted
            </p>
          )}
          {supervisorCount > 0 && (
            <Fragment>
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
                {!editMode && projectCategories.length > 0 && (
                  <Form.Group className="mb-3">
                    <Form.Label>Project Category</Form.Label>

                    <Form.Control
                      name="project_category"
                      // value={formData.category}
                      onChange={handleInputChange}
                      required
                      as="select"
                      custom
                      defaultValue={projectCategories[0].name}
                    >
                      {projectCategories.map((projectCategory) => (
                        <option
                          key={projectCategory.name}
                          value={projectCategory.name}
                        >
                          {projectCategory.name}
                        </option>
                      ))}
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
            </Fragment>
          )}
        </GeneralTemplate>
      )}
    </Fragment>
  );
}

export default ProjectDetails;
