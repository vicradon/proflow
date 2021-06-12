import { Fragment } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Images from "./Images";

function ProjectRejected() {
  return (
    <Fragment>
      <h5 className="text-center display-4 text-danger">Rejected</h5>

      <img
        className="w-50 my-3"
        src={Images.ProjectRejectedCrossmark}
        alt="project approved"
      />
      <h5>Your project was rejected</h5>
      <p>
        Click on the button below to repropose a project topic and we’ll let you
        know the status of your proposal
      </p>

      <Link to="/project/setup">
        <Button>Repropose project</Button>
      </Link>
    </Fragment>
  );
}

export default ProjectRejected;
