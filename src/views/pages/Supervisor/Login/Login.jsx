import { Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Images from "../../../../components/Images";
import GeneralTemplate from "../../../templates/GeneralTemplate/GeneralTemplate";

function Login() {
  return (
    <GeneralTemplate>
      <h3>Welcome Back!</h3>
      <p className="text-gray">
        Help your students complete their projects seamlessly
      </p>

      <Form className="mb-4">
        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control placeholder="e.g. John Doe" />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Category</Form.Label>
          <Form.Control placeholder="e.g. Telecommunications" />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control placeholder="a least 8 characters" />
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

export default Login;
