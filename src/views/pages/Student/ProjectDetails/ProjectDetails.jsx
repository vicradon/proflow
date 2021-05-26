import { Button, Form } from "react-bootstrap";
import GeneralTemplate from "../../../templates/GeneralTemplate/GeneralTemplate";
import { Link } from "react-router-dom";
function ProjectDetails() {
  return (
    <GeneralTemplate noAuth>
      <h4 className="text-center">
        Let's get started with a few details about your project
      </h4>
      <Form className="mb-4">
        <Form.Group className="mb-3">
          <Form.Label>Project Name</Form.Label>
          <Form.Control placeholder="e.g. Automating logistics hauling in Nigeria." />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Reg No</Form.Label>
          <Form.Control placeholder="e.g. Transportation" />
        </Form.Group>
        <Form.Group className="mb-3 d-flex justify-content-between align-items-baseline">
          <Form.Check type="checkbox" label="Remember me" />

          <Link to="#">Forgot Password</Link>
        </Form.Group>

        <Button className="w-100">Login</Button>
      </Form>
    </GeneralTemplate>
  );
}

export default ProjectDetails;
