import { useState } from "react";
import { Button, Form, Spinner } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import maxios from "../../../../utils/maxios";
import GeneralTemplate from "../../../templates/GeneralTemplate/GeneralTemplate";

function SupervisorLogin() {
  const { email, password, return_url } = useParams();
  const [formDetails, setFormDetails] = useState({
    email: email ? email : "",
    password: password ? password : "",
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [error, setError] = useState("");
  const handleInputChange = ({ target }) => {
    const { name, value } = target;
    setFormDetails({ ...formDetails, [name]: value });
  };

  const handleLogin = async (event) => {
    try {
      event.preventDefault();
      setError("");
      setFormSubmitted(true);

      const { data } = await maxios.post("/login", formDetails);

      if (data.user.profile_type !== "App\\Models\\Supervisor") {
        setError("Only supervisors can use this section");
        setFormSubmitted(false);
      } else {
        maxios.saveToLocalStorage(data);

        if (return_url) {
          window.location.href = return_url;
        }

        if (!data.user.avatar_url) {
          window.location.href = "/supervisor/avatar-upload";
        } else {
          window.location.href = "/supervisor/dashboard";
        }
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
        Help your students complete their projects seamlessly
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
    </GeneralTemplate>
  );
}

export default SupervisorLogin;
