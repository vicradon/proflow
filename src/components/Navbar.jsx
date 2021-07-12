import { useContext } from "react";
import { Button, Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Context } from "../store.js";
import Images from "./Images.js";

function Navbar({ noAuth }) {
  const { state } = useContext(Context);

  const logoutUser = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  const UnAuthComponents = () => (
    <div className="d-flex justify-content-between">
      <Dropdown>
        <Dropdown.Toggle className="mx-2" variant="light-outline">
          Login
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item as={Link} to="/coordinator/login">
            As Coordinator
          </Dropdown.Item>
          <Dropdown.Item as={Link} to="/supervisor/login">
            As Supervisor
          </Dropdown.Item>
          <Dropdown.Item as={Link} to="/student/login">
            As Student
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      <Dropdown>
        <Dropdown.Toggle className="mx-2" variant="primary">
          Sign up
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item as={Link} to="/coordinator/signup">
            As Coordinator
          </Dropdown.Item>
          <Dropdown.Item as={Link} to="/student/signup">
            As Student
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );

  return (
    <div className="container d-flex justify-content-between">
      <img src={Images.TextLogo} alt="proflow" />
      {localStorage.getItem("stuff")}
      {!noAuth && state.user.isAuthenticated && (
        <Button onClick={logoutUser}>Logout</Button>
      )}
      {!noAuth && !state.user.isAuthenticated && <UnAuthComponents />}
    </div>
  );
}

export default Navbar;
