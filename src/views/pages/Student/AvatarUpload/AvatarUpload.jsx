import { useState } from "react";
import { Button, Form, Spinner } from "react-bootstrap";
import GeneralTemplate from "../../../templates/GeneralTemplate/GeneralTemplate";
import Images from "../../../../components/Images";
import maxios from "../../../../utils/maxios";
import { useHistory } from "react-router-dom";
function AvatarUpload() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [avatar, setAvatar] = useState();
  const history = useHistory();

  let nextRoute = "";

  switch (localStorage.getItem("role")) {
    case "student": {
      nextRoute = "/student/project/setup";
      break;
    }
    case "supervisor": {
      nextRoute = "/supervisor/dashboard";
      break;
    }
    default: {
      nextRoute = "/";
      break;
    }
  }

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      setError("");
      setFormSubmitted(true);

      const formData = new FormData();
      formData.append("avatar", avatar);

      const { data } = await maxios.post("/users/avatar", formData);
      maxios.saveToLocalStorage(data);
      history.push(nextRoute);
    } catch (error) {
      const errors = error.response.data.errors
        ? Object.values(error.response.data.errors).join("\n")
        : "An error occured, our engineers are working hard to fix it";

      setError(errors);
      setFormSubmitted(false);
    }
  };

  const handleFileChange = ({ target }) => {
    if (target.files[0].size > 2 * 1024 * 1024) {
      setError("File too large, choose another");
    } else {
      setError("");
      setAvatar(target.files[0]);
    }
  };

  return (
    <GeneralTemplate>
      <div className={"d-flex flex-column align-items-center"}>
        <h3 className="text-center">Upload your passport</h3>

        <img
          className="my-3 rounded-circle"
          width="130px"
          height="130px"
          src={avatar ? URL.createObjectURL(avatar) : Images.DefaultAvatar}
          alt="person"
        />

        <Form onSubmit={handleSubmit}>
          <Form.File
            required
            className="mb-2"
            name="avatar"
            custom
            label="Avatar upload"
            accept="image/png, image/jpeg"
            onChange={handleFileChange}
          />
          <div className="d-flex flex-column">
            <div>{error && <p className="text-danger">{error}</p>}</div>

            <Button type="submit" disabled={formSubmitted}>
              {formSubmitted && (
                <Spinner className="mr-2" animation="border" role="status">
                  <span className="sr-only">Loading...</span>
                </Spinner>
              )}
              <span>Upload</span>
            </Button>
          </div>
        </Form>
      </div>
    </GeneralTemplate>
  );
}

export default AvatarUpload;
