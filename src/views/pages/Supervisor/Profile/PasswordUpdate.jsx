import { useState } from "react";
import { useHistory } from "react-router-dom";
import GeneralTemplate from "../../../templates/GeneralTemplate/GeneralTemplate";
import { Button, Form, InputGroup, FormControl } from "react-bootstrap";
import maxios from "../../../../utils/maxios";
import SubmitButton from "../../../../components/SubmitButton";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import errorHandler from "../../../../utils/errorHandler";

function PasswordUpdate() {
  const [formSubmiting, setFormSubmiting] = useState(false);
  const [error, setError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);

  const history = useHistory();
  const role = localStorage.getItem("role");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setFormSubmiting(true);

      await maxios.patch("/password", { password });

      setFormSubmiting(false);
      history.push(role === "student" ? "/" : "/supervisor/avatar-upload");
    } catch (error) {
      errorHandler(error).then((message) => setError(message));
      setFormSubmiting(false);
    }
  };

  return (
    <GeneralTemplate>
      <div className="mx-4">
        <p className="text-gray font-weight-bold text-center">
          Update Password
        </p>

        <Form onSubmit={handleSubmit} className="mb-4 d-block">
          <Form.Row className="mb-3 w-100">
            <Form.Label>Password</Form.Label>
            <InputGroup>
              <FormControl
                type={passwordVisible ? "text" : "password"}
                required
                placeholder="e.g. Correct Horse Battery Staple"
                name="password"
                onChange={({ target }) => setPassword(target.value)}
              />
              <InputGroup.Append>
                {/* <InputGroup.Text> */}
                <Button className="bg-dark text-white" variant="transparent">
                  {passwordVisible ? (
                    <FaEye onClick={() => setPasswordVisible(false)} />
                  ) : (
                    <FaEyeSlash onClick={() => setPasswordVisible(true)} />
                  )}
                </Button>
                {/* </InputGroup.Text> */}
              </InputGroup.Append>
            </InputGroup>
          </Form.Row>

          <div className="d-flex justify-content-end my-10">
            <SubmitButton disabled={formSubmiting} className="w-23 left-align">
              Update
            </SubmitButton>
          </div>
        </Form>
      </div>
    </GeneralTemplate>
  );
}

export default PasswordUpdate;
