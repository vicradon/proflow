import { Button, Form } from "react-bootstrap";
import GeneralTemplate from "../../../templates/GeneralTemplate/GeneralTemplate";
import { Link, useParams } from "react-router-dom";
import Images from "../../../../components/Images";

function SupervisorPairing() {
  const { supervisor_id } = useParams();

  return (
    <GeneralTemplate>
      <div className="d-flex flex-column align-items-center">
        <h5 className="text-center">Supervisors pairing</h5>

        <img
          className="w-50 my-3"
          src={Images.SupervisorPairing}
          alt="supervisor pairing"
        />
        <p>You have been paired with Dr Chidi Annabelle.</p>
        <p>Check back later to see if your project was approved </p>

        <Button className="w-50 shadow">Check approval status</Button>
      </div>
    </GeneralTemplate>
  );
}

export default SupervisorPairing;
