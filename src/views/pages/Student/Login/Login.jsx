import { Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import GeneralTemplate from "../../../templates/GeneralTemplate/GeneralTemplate";
import Images from "../../../../components/Images";

function StudentLogin() {
  return (
    <GeneralTemplate>
      <h3>Welcome Back!</h3>
      <p className="text-gray">
        Complete your projects seamlessly. Keep up with life
      </p>

      <Form className="mb-4">
        <Form.Group className="mb-3">
          <Form.Label>Reg No</Form.Label>
          <Form.Control placeholder="e.g. 20124824724" />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Reg No</Form.Label>
          <Form.Control placeholder="e.g. 20124824724" />
        </Form.Group>
        <Form.Group className="mb-3 d-flex justify-content-between align-items-baseline">
          <Form.Check type="checkbox" label="Remember me" />

          <Link to="#">Forgot Password</Link>
        </Form.Group>

        <Button className="w-100">Login</Button>
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
        <p className="mx-1">Already have an account?</p>
        <Link className="mx-1" to="#">
          Sign Up
        </Link>
      </div>
    </GeneralTemplate>
  );
}

export default StudentLogin;
