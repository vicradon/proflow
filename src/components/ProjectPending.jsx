import { Fragment, useState } from "react";
import maxios from "../utils/maxios";
import Images from "./Images";
import SubmitButton from "./SubmitButton";

function ProjectPending({ setProjectStatus }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const checkProjectStatus = async () => {
    try {
      setLoading(true);
      const { data: project_data } = await maxios.get(`/project-status`);
      console.log(project_data);
      setProjectStatus(project_data.status);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error.response.data.message);
    }
  };

  return (
    <Fragment>
      <h5 className="text-center display-4 text-warning">Pending</h5>

      <img
        className="w-50 my-3"
        src={Images.ProjectPendingNullmark}
        alt="project pending"
      />
      <h5>Your project is awaiting approval</h5>
      <p>Click on the button below to check your project's status</p>

      <p className="text-danger">{error}</p>

      <SubmitButton
        disabled={loading}
        onClick={checkProjectStatus}
        className="w-50 shadow"
      >
        Check Project Status
      </SubmitButton>
    </Fragment>
  );
}

export default ProjectPending;
