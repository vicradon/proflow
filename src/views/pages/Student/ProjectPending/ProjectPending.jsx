import Images from "../../../../components/Images";
import GeneralTemplate from "../../../templates/GeneralTemplate/GeneralTemplate";
import { Button } from "react-bootstrap";

function ProjectPending() {
  return (
    <GeneralTemplate noAuth>
      <div className="d-flex flex-column align-items-center">
        <h5 className="text-center">Approval Status</h5>

        <img
          className="w-50 my-3"
          src={Images.ProjectPendingNullmark}
          alt="project approved"
        />
        <h5>Your project is awaiting approval</h5>
        <p>Click on the button below to check your project's status</p>

        <Button className="w-50 shadow">Check project status</Button>
      </div>
    </GeneralTemplate>
  );
}

export default ProjectPending;
