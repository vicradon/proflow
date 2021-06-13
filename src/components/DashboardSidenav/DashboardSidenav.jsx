import React from "react";
import { Button, Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import Images from "../Images";
import styles from "./DashboardSidenav.module.css";

function DashboardSidenav() {
  const navlink_style = "mb-3 pl-4";
  return (
    <div className={styles.root}>
      <div className="d-flex justify-content-center py-2">
        <img width="120px" src={Images.TextLogoWhite} alt="Proflow" />
      </div>

      <hr className={styles.hr} />

      <Nav
        defaultActiveKey="/student/dashboard"
        className="flex-column sidebar-links-container"
      >
        <Nav.Link
          as={NavLink}
          activeClassName={styles.active_link}
          to="/student/dashboard"
          eventKey="dashboard"
          className={navlink_style}
        >
          Dashboard
        </Nav.Link>
        <Nav.Link
          as={NavLink}
          activeClassName={styles.active_link}
          to="/supervisor/students"
          eventKey="students"
          className={navlink_style}
        >
          Students
        </Nav.Link>
        <Button variant="transparent" className="text-left ml-3 text-primary">
          Logout
        </Button>
      </Nav>
    </div>
  );
}

export default DashboardSidenav;
