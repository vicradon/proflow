import { useState } from "react";
import { Button, Form, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import GeneralTemplate from "../../../templates/GeneralTemplate/GeneralTemplate";
import Images from "../../../../components/Images";
import SignupSuccessModal from "../../../../components/SignupSuccessModal";

function StudentSignup() {
  const [showSuccessModal, setSuccessModal] = useState(false);
  return (
    <GeneralTemplate>
      <h3>
        We make it easy for you to <br /> succeed in your project{" "}
      </h3>
      <p className="text-gray">
        Create a profile and .get access to a system that makes your project
        submission seamless.
      </p>

      <Form className="mb-4">
        <Form.Row className="mb-3">
          <Col sm={6}>
            <Form.Label>First Name</Form.Label>
            <Form.Control placeholder="e.g. John" />
          </Col>
          <Col sm={6}>
            <Form.Label>Last Name</Form.Label>
            <Form.Control placeholder="e.g. Doe" />
          </Col>
        </Form.Row>
        <Form.Row className="mb-3">
          <Col sm={6}>
            <Form.Label>Department</Form.Label>
            <Form.Control placeholder="e.g. Geology" />
          </Col>
          <Col sm={6}>
            <Form.Label>Reg No</Form.Label>
            <Form.Control placeholder="e.g. 20124824724" />
          </Col>
        </Form.Row>
        <Form.Row className="mb-3">
          <Col sm={6}>
            <Form.Label>Password</Form.Label>
            <Form.Control placeholder="at least 8 characters" />
          </Col>
          <Col sm={6}>
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control placeholder="at least 8 characters" />
          </Col>
        </Form.Row>
        <Form.Row className="mb-3">
          <Form.Check
            type="checkbox"
            label="I agree to the Terms Policy Conditions"
          />
        </Form.Row>

        <Button onClick={() => setSuccessModal(true)} className="w-100">
          Sign up
        </Button>
      </Form>

      <div className="d-flex justify-content-center align-items-baseline">
        <img
          src={Images.HorizontalLine}
          className="pb-1"
          alt="horizontal line"
        />
        <p className="mx-2">OR</p>
        <img
          src={Images.HorizontalLine}
          className="pb-1"
          alt="horizontal line"
        />
      </div>

      <div className="d-flex justify-content-center align-items-baseline mb-4">
        <img className="mx-4" src={Images.FacebookLogo} alt="Facebook Logo" />
        <img className="mx-4" src={Images.GoogleLogo} alt="Google Logo" />
      </div>

      <div className="d-flex align-items-baseline justify-content-center">
        <p className="mx-1">Don’t have an account with us? </p>
        <Link className="mx-1" to="#">
          Sign In
        </Link>
      </div>

      <SignupSuccessModal
        showModal={showSuccessModal}
        closeModal={() => setSuccessModal(false)}
      />
    </GeneralTemplate>
  );
}

export default StudentSignup;
