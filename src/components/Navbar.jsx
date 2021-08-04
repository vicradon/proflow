import { useContext } from "react";
import { Button, Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Context } from "../store.js";
import Images from "./Images.js";

function Navbar() {
  const { state } = useContext(Context);

  const logoutUser = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <div className="container d-flex justify-content-between">
      <h3>
        Automated Workflow Scheduling For Undergraduate Project Supervision
      </h3>

      {state.user.isAuthenticated && (
        <Button onClick={logoutUser}>Logout</Button>
      )}
      {!state.user.isAuthenticated && (
        <div className="d-flex align-items-center">
          <Button className="mr-3" variant="light" as={Link} to="/">
            Login
          </Button>

          <Button as={Link} to="/coordinator/signup">
            Sign up
          </Button>
        </div>
      )}
    </div>
  );
}

export default Navbar;
