import Images from "../../../../components/Images";
import GeneralTemplate from "../../../templates/GeneralTemplate/GeneralTemplate";

function ProjectApproved() {
  return (
    <GeneralTemplate noAuth>
      <div className="d-flex flex-column align-items-center">
        <h5 className="text-center">Approval Status</h5>

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

        <Button className="w-50 shadow">Proceed</Button>
      </div>
    </GeneralTemplate>
  );
}

export default ProjectApproved;
