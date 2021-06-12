import { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import ProjectApproved from "../../../../components/ProjectApproved";
import ProjectPending from "../../../../components/ProjectPending";
import ProjectRejected from "../../../../components/ProjectRejected";
import maxios from "../../../../utils/maxios";
import GeneralTemplate from "../../../templates/GeneralTemplate/GeneralTemplate";

function ProjectStatus() {
  const { supervisor_id } = useParams();
  const [supervisorName, setSupervisorName] = useState("");
  const [projectStatus, setProjectStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchData = async () => {
    try {
      setLoading(true);

      const { data: supervisor } = await maxios.get(`/users/${supervisor_id}`);
      const { data: project_data } = await maxios.get(`/project-status`);

      setLoading(false);

      return {
        supervisor_name: supervisor.name,
        project_status: project_data.status,
      };
    } catch (error) {
      setError(error.response.data.message);
      setLoading(false);
    }
  };

  useEffect(async () => {
    const { supervisor_name, project_status } = await fetchData();
    setSupervisorName(supervisor_name);
    setProjectStatus(project_status);
  }, []);

  return (
    <GeneralTemplate noAuth>
      <div className="d-flex flex-column align-items-center">
        <h5 className="text-center">Approval Status</h5>

        {projectStatus === "" && (
          <Spinner size="lg" animation="border" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner>
        )}
        {projectStatus === "approved" && <ProjectApproved />}
        {projectStatus === "pending" && (
          <ProjectPending setProjectStatus={setProjectStatus} />
        )}
        {projectStatus === "rejected" && <ProjectRejected />}

        <p className="text-danger">{error}</p>
      </div>
    </GeneralTemplate>
  );
}

export default ProjectStatus;
