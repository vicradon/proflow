import { useState } from "react";
import { Button, Form, Spinner } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import maxios from "../../../../utils/maxios";
import GeneralTemplate from "../../../templates/GeneralTemplate/GeneralTemplate";

function CoordinatorLogin() {
  const [formDetails, setFormDetails] = useState({ email: "", password: "" });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [error, setError] = useState("");
  const handleInputChange = ({ target }) => {
    const { name, value } = target;
    setFormDetails({ ...formDetails, [name]: value });
  };
  const history = useHistory();

  const handleLogin = async (event) => {
    try {
      event.preventDefault();
      setError("");
      setFormSubmitted(true);

      const { data } = await maxios.post("/login", formDetails);

      if (data.user.profile_type !== "App\\Models\\Coordinator") {
        setError("Only coordinators can use this section");
        setFormSubmitted(false);
      } else {
        maxios.saveToLocalStorage(data);
        history.push("/coordinator/dashboard");
      }
    } catch (error) {
      setError(error.response.data.message);
      setFormSubmitted(false);
    }
  };
  return (
    <GeneralTemplate>
      <h3>Welcome back</h3>
      <p className="text-gray">
        Onboard project supervisors and monitor students progress
      </p>

      <Form onSubmit={handleLogin} className="mb-4 d-block">
        <Form.Row className="mb-3 w-100">
          <Form.Label>Email</Form.Label>
          <Form.Control
            onChange={handleInputChange}
            name="email"
            placeholder="e.g. John"
          />
        </Form.Row>
        <Form.Row className="mb-3 w-100">
          <Form.Label>Password</Form.Label>
          <Form.Control
            name="password"
            type="password"
            placeholder="e.g. Pass#45!"
            onChange={handleInputChange}
          />
        </Form.Row>

        <Form.Row className="mb-3 d-flex justify-content-between">
          <Form.Check type="checkbox" label="Remember me" />

          <Link className="ml-30" to="#">
            Forgot Password
          </Link>
        </Form.Row>

        <p className="text-danger">{error}</p>
        <Button
          type="submit"
          className="w-100 d-flex justify-content-center align-items-center"
          disabled={formSubmitted}
        >
          {formSubmitted && (
            <Spinner className="mr-2" animation="border" role="status">
              <span className="sr-only">Loading...</span>
            </Spinner>
          )}
          <span>Login</span>
        </Button>
      </Form>

      <div className="d-flex align-items-baseline justify-content-center">
        <p className="mx-1">Don’t have an account with us? </p>
        <Link className="mx-1" to="/coordinator/signup">
          Sign Up
        </Link>
      </div>
    </GeneralTemplate>
  );
}

export default CoordinatorLogin;
