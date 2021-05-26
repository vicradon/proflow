import Images from "../../../../components/Images";
import GeneralTemplate from "../../../templates/GeneralTemplate/GeneralTemplate";

function ProjectRejected() {
  return (
    <GeneralTemplate noAuth>
      <div className="d-flex flex-column align-items-center">
        <h5 className="text-center">Approval Status</h5>

        <img
          className="w-50 my-3"
          src={Images.ProjectRejectedCrossmark}
          alt="project approved"
        />
        <h5>Your project has been rejected</h5>
        <p>
          Click on the button below to repropose a project topic and we’ll let
          you know the status of your proposal
        </p>

        <Button className="w-50 shadow">Repropose project</Button>
      </div>
    </GeneralTemplate>
  );
}

export default ProjectRejected;
