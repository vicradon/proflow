import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Images from "./Images.js";

function Navbar({ noAuth }) {
  return (
    <div className="container d-flex justify-content-between">
      <img src={Images.TextLogo} alt="proflow" />

      {!noAuth && (
        <div>
          <Link to="/login">
            <Button className="mx-2" variant="light-outline">
              Sign in
            </Button>
          </Link>
          <Link to="/">
            <Button className="mx-2" variant="primary">
              Sign up
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
}

export default Navbar;
