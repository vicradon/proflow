import { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { Form, Col } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import GeneralTemplate from "../../../templates/GeneralTemplate/GeneralTemplate";
import Images from "../../../../components/Images";
import SignupSuccessModal from "../../../../components/SignupSuccessModal";
import maxios from "../../../../utils/maxios";
import SubmitButton from "../../../../components/SubmitButton";

function StudentSignup() {
  const [showSuccessModal, setSuccessModal] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const history = useHistory();

  const schema = yup.object().shape({
    first_name: yup.string().required("first name is required"),
    last_name: yup.string().required("last name is required"),
    email: yup.string().email(),
    phone_number: yup.string().required("phone number is required"),
    reg_number: yup
      .number()
      .min(11)
      .required("reg number is required")
      .positive()
      .integer(),
    department: yup.string().required(),
    password: yup.string().min(8).required(),
    confirmPassword: yup
      .string()
      .required()
      .min(8)
      .oneOf([yup.ref("password"), null], "Passwords must match"),
    terms: yup.bool().required().oneOf([true], "Terms must be accepted"),
  });

  const formik = useFormik({
    // For use when speed testing

    // initialValues: {
    //   first_name: "John",
    //   last_name: "Doe",
    //   email: "vonnewman@gmail.com",
    //   phone_number: "082934874832",
    //   reg_number: "20178439284",
    //   department: "Mechanical Science",
    //   password: "password",
    //   confirmPassword: "password",
    //   terms: true,
    // },
    initialValues: {
      first_name: "",
      last_name: "",
      email: "",
      phone_number: "",
      reg_number: "",
      department: "",
      password: "",
      confirmPassword: "",
      terms: false,
    },
    validationSchema: schema,
    onSubmit: async (values) => {
      try {
        setFormSubmitted(true);
        const { data } = await maxios.post("/register?role=student", values);
        maxios.saveToLocalStorage(data);
        window.location.href = "/student/profile/avatar";
      } catch (error) {
        const errors = error.response.data.errors
          ? Object.values(error.response.data.errors).join("\n")
          : "";
        alert(errors);
        setFormSubmitted(false);
      }
    },
  });

  const { handleSubmit, handleChange, values, touched, errors } = formik;

  return (
    <GeneralTemplate>
      <h3>
        We make it easy for you to <br /> succeed in your project{" "}
      </h3>
      <p className="text-gray">
        Create a profile and .get access to a system that makes your project
        submission seamless.
      </p>

      <Form noValidate onSubmit={handleSubmit} className="mb-4">
        <Form.Row className="mb-3">
          <Col sm={6}>
            <Form.Label>First Name</Form.Label>
            <Form.Control
              placeholder="e.g. John"
              name="first_name"
              value={values.first_name}
              onChange={handleChange}
              isValid={touched.first_name && !errors.first_name}
              isInvalid={!!errors.first_name}
            />
            <Form.Control.Feedback type="invalid">
              {errors.first_name}
            </Form.Control.Feedback>
          </Col>
          <Col sm={6}>
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              placeholder="e.g. Doe"
              name="last_name"
              value={values.last_name}
              onChange={handleChange}
              isValid={touched.last_name && !errors.last_name}
              isInvalid={!!errors.last_name}
            />
            <Form.Control.Feedback type="invalid">
              {errors.last_name}
            </Form.Control.Feedback>
          </Col>
        </Form.Row>
        <Form.Row className="mb-3">
          <Col sm={6}>
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              placeholder="e.g. john.doe@email.com"
              name="email"
              value={values.email}
              onChange={handleChange}
              isValid={touched.email && !errors.email}
              isInvalid={!!errors.email}
            />
            <Form.Control.Feedback type="invalid">
              {errors.email}
            </Form.Control.Feedback>
          </Col>
          <Col sm={6}>
            <Form.Label>Phone number</Form.Label>
            <Form.Control
              placeholder="e.g. 090288283738"
              name="phone_number"
              value={values.phoneNumber}
              onChange={handleChange}
              isInvalid={!!errors.phoneNumber}
              isValid={touched.phoneNumber && !errors.phoneNumber}
            />
            <Form.Control.Feedback type="invalid">
              {errors.phoneNumber}
            </Form.Control.Feedback>
          </Col>
        </Form.Row>
        <Form.Row className="mb-3">
          <Col sm={6}>
            <Form.Label>Department</Form.Label>
            <Form.Control
              placeholder="e.g. Geology"
              name="department"
              value={values.department}
              onChange={handleChange}
              isInvalid={!!errors.department}
              isValid={touched.department && !errors.department}
            />
            <Form.Control.Feedback type="invalid">
              {errors.department}
            </Form.Control.Feedback>
          </Col>
          <Col sm={6}>
            <Form.Label>Reg Number</Form.Label>
            <Form.Control
              placeholder="e.g. 20124824724"
              name="reg_number"
              value={values.reg_number}
              onChange={handleChange}
              isInvalid={!!errors.reg_number}
              isValid={touched.reg_number && !errors.reg_number}
            />
            <Form.Control.Feedback type="invalid">
              {errors.reg_number}
            </Form.Control.Feedback>
          </Col>
        </Form.Row>
        <Form.Row className="mb-3">
          <Col sm={6}>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="at least 8 characters"
              name="password"
              value={values.password}
              onChange={handleChange}
              isInvalid={!!errors.password}
              isValid={touched.password && !errors.password}
            />
            <Form.Control.Feedback type="invalid">
              {errors.password}
            </Form.Control.Feedback>
          </Col>
          <Col sm={6}>
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="at least 8 characters"
              name="confirmPassword"
              value={values.confirmPassword}
              onChange={handleChange}
              isInvalid={!!errors.confirmPassword}
              isValid={touched.confirmPassword && !errors.confirmPassword}
            />
            <Form.Control.Feedback type="invalid">
              {errors.confirmPassword}
            </Form.Control.Feedback>
          </Col>
        </Form.Row>
        <Form.Row className="mb-3">
          <Form.Check
            type="checkbox"
            name="terms"
            label="Agree to terms and conditions"
            onChange={handleChange}
            isInvalid={!!errors.terms}
            feedback={errors.terms}
            id="validationFormik0"
          />
        </Form.Row>

        <SubmitButton disabled={formSubmitted} className="w-100">
          Sign up
        </SubmitButton>
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
