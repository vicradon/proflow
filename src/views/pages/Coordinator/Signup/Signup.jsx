import { useState } from "react";
import {
  Button,
  Form,
  Col,
  InputGroup,
  FormControl,
  Spinner,
} from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import GeneralTemplate from "../../../templates/GeneralTemplate/GeneralTemplate";
import Images from "../../../../components/Images.js";
import SignupSuccessModal from "../../../../components/SignupSuccessModal";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import maxios from "../../../../utils/maxios";

function CoordinatorSignup() {
  const [showSuccessModal, setSuccessModal] = useState(false);
  const [avatar, setAvatar] = useState();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [formFieldData, setFormFieldData] = useState({
    name: "",
    email: "",
    phone_number: "",
    department: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);
  const history = useHistory();

  const handleTextInputChange = ({ target }) => {
    const { name, value } = target;
    setFormFieldData({ ...formFieldData, [name]: value });
  };

  const handleSubmit = async (event) => {
    try {
      setError("");
      setFormSubmitted(true);
      event.preventDefault();

      const formData = new FormData();
      formData.append("avatar", avatar);

      Object.keys(formFieldData).forEach((key) => {
        formData.append(key, formFieldData[key]);
      });

      const { data } = await maxios.post(
        "/register?role=coordinator",
        formData
      );

      maxios.saveToLocalStorage(data);
      window.location.href = "/coordinator/dashboard";
    } catch (error) {
      const errors = error.response.data.errors
        ? Object.values(error.response.data.errors).join("\n")
        : "An error occured, our engineers are working hard to fix it";

      setError(errors);
      setFormSubmitted(false);
    }
  };
  return (
    <GeneralTemplate>
      <h3>We make it easy for you to coordinate students projects</h3>
      <p className="text-gray">
        Create a profile, onboard project supervisors and monitor the progress
        of students.
      </p>

      <Form onSubmit={handleSubmit} className="mb-4">
        <Form.Row className="mb-3">
          <Col
            sm={9}
            className="d-flex justify-content-between align-items-center mb-4"
          >
            <div>
              <img
                src={
                  avatar ? URL.createObjectURL(avatar) : Images.DefaultAvatar
                }
                className="rounded-circle"
                alt="Cinque Terre"
                width="130px"
                height="130px"
              />
            </div>
            <div className="ml-5">
              <Form.File
                className="mb-2"
                name="avatar"
                custom
                label="Avatar upload"
                accept="image/png, image/jpeg"
                onChange={({ target }) => setAvatar(target.files[0])}
              />

              <p className="text-gray d-block">
                300x300 px recommended JPGs and PNGs supported
              </p>
            </div>
          </Col>
          <Col sm={12}>
            <Form.Label>Name</Form.Label>
            <Form.Control
              name="name"
              onChange={handleTextInputChange}
              required
              placeholder="e.g. Dr John Doe"
            />
          </Col>
        </Form.Row>
        <Form.Row className="mb-3">
          <Col sm={6}>
            <Form.Label>Email</Form.Label>
            <Form.Control
              name="email"
              type="email"
              required
              placeholder="e.g. john.doe@gmail.com"
              onChange={handleTextInputChange}
            />
          </Col>
          <Col sm={6}>
            <Form.Label>Phone Number</Form.Label>
            <Form.Control
              name="phone_number"
              required
              placeholder="e.g. +2348438482043"
              onChange={handleTextInputChange}
            />
          </Col>
        </Form.Row>
        <Form.Row className="mb-3">
          <Col sm={6}>
            <Form.Label>Department</Form.Label>
            <Form.Control
              name="department"
              onChange={handleTextInputChange}
              required
              placeholder="e.g. Geology"
            />
          </Col>
          <Col sm={6}>
            <Form.Label>Password</Form.Label>
            <InputGroup>
              <FormControl
                type={passwordVisible ? "text" : "password"}
                required
                name="password"
                onChange={handleTextInputChange}
              />
              <InputGroup.Append>
                <InputGroup.Text className="cursor-pointer">
                  {passwordVisible ? (
                    <FaEye onClick={() => setPasswordVisible(false)} />
                  ) : (
                    <FaEyeSlash onClick={() => setPasswordVisible(true)} />
                  )}
                </InputGroup.Text>
              </InputGroup.Append>
            </InputGroup>
          </Col>
        </Form.Row>

        <Form.Row className="mb-3">
          <Form.Check
            required
            type="checkbox"
            label="I agree to the Terms Policy Conditions"
          />
        </Form.Row>

        <div>{error && <p className="text-danger">{error}</p>}</div>

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
          <span>Sign up</span>
        </Button>
      </Form>

      <div className="d-flex align-items-baseline justify-content-center">
        <p className="mx-1">Already have an account with us?</p>
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

export default CoordinatorSignup;
