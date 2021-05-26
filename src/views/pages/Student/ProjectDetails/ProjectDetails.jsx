import { Button, Form } from "react-bootstrap";
import GeneralTemplate from "../../../templates/GeneralTemplate/GeneralTemplate";
import { Link } from "react-router-dom";

function ProjectDetails() {
  return (
    <GeneralTemplate noAuth>
      <h5 className="text-center">
        Let's get started with a few details about your project
      </h5>
      <Form className="mb-4">
        <Form.Group className="mb-3">
          <Form.Label>Project Name</Form.Label>
          <Form.Control placeholder="e.g. Automating logistics hauling in Nigeria." />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Project Category</Form.Label>
          <Form.Control placeholder="e.g. Transportation" />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Project Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={6}
            placeholder="Enter short description about your project"
          />
        </Form.Group>

        <div className="d-flex justify-content-end">
          <Button>Submit</Button>
        </div>
      </Form>
    </GeneralTemplate>
  );
}

export default ProjectDetails;
