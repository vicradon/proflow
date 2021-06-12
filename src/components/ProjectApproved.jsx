import { Fragment } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Images from "./Images";

function ProjectApproved() {
  return (
    <Fragment>
      <h5 className="text-center display-4 text-success">Approved</h5>

      <img
        className="w-50 my-3"
        src={Images.ProjectApprovedCheckmark}
        alt="project approved"
      />
      <h5>Your project has been approved</h5>
      <p>
        Click on the button below to proceed to your dashboard and start your
        project
      </p>

      <Link to="/student/dashboard">
        <Button>Go to Dashboard</Button>
      </Link>
    </Fragment>
  );
}

export default ProjectApproved;
