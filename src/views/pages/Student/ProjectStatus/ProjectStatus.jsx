import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import Images from "../../../../components/Images";
import maxios from "../../../../utils/maxios";
import GeneralTemplate from "../../../templates/GeneralTemplate/GeneralTemplate";

function ProjectStatus() {
  const { supervisor_id } = useParams();
  const [supervisorName, setSupervisorName] = useState("");
  const fetchSupervisor = async () => {
    const { data } = await maxios.get(`/users/${supervisor_id}`);
    return data.name;
  };

  useEffect(async () => {
    const name = await fetchSupervisor();
    setSupervisorName(name);
  }, []);

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

export default ProjectStatus;
