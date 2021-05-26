import { useState } from "react";
import { Button, Form, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import GeneralTemplate from "../../../templates/GeneralTemplate/GeneralTemplate";
import Images from "../../../../components/Images.js";
import SignupSuccessModal from "../../../../components/SignupSuccessModal";

function CategoryLogin() {
  const [showSuccessModal, setSuccessModal] = useState(false);
  return (
    <GeneralTemplate>
      <h3>Welcome back</h3>
      <p className="text-gray">
        Onboard project supervisors and monitor students progress
      </p>

      <Form className="mb-4 d-block">
        <Form.Row className="mb-3 w-100">
          <Form.Label>First Name</Form.Label>
          <Form.Control placeholder="e.g. John" />
          <Form.Label>Password</Form.Label>
          <Form.Control placeholder="e.g. Pass#45!" />
        </Form.Row>

        <Form.Row>
          <div className="mb-3 d-flex justify-content-between">
            <div>
              <Form.Check type="checkbox" label="Remember me" />
            </div>
            <div>
              <Link className="ml-30" to="#">
                Forgot Password
              </Link>
            </div>
          </div>
        </Form.Row>

        <Button onClick={() => setSuccessModal(true)} className="w-100">
          Login
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

export default CategoryLogin;
