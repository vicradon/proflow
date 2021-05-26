import { Button, Form, Col, Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import GeneralTemplate from "../../../templates/GeneralTemplate/GeneralTemplate";
import Images from "../../../../components/Images.js";

function ProjectCategory() {
  return (
    <GeneralTemplate>
      <p className="text-gray font-weight-bold text-center">
        Onboard project supervisors
      </p>

      <Form className="mb-4 d-block">
        <Form.Row className="mb-3 w-100">
          <Form.Label>Supervisor's name</Form.Label>
          <Form.Control placeholder="e.g. John" />
        </Form.Row>
        <Form.Row className="mb-3 w-100">
          <Form.Label>Supervisors category</Form.Label>
          <select className="form-control">
            <option value="Default">Information</option>
            <option value="Transport">Transport</option>
            <option value="Engineering">Engineering</option>
          </select>
        </Form.Row>

        <Form.Row className="mb-3 w-100">
          <Form.Label>Department</Form.Label>
          <Form.Control placeholder="e.g. computer science" />
        </Form.Row>
        <div className="d-flex justify-content-end my-10">
          <Button className="w-23 left-align">Login</Button>
        </div>
      </Form>
    </GeneralTemplate>
  );
}

export default ProjectCategory;
