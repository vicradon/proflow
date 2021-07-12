import { Fragment } from "react";
import { Button, Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import Images from "../Images";
import styles from "./DashboardSidenav.module.css";

function DashboardSidenav() {
  const navlink_style = "mb-3 pl-4";
  const role = localStorage.getItem("role");
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
        {role === "student" && (
          <Fragment>
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
              to="/student/project/upload"
              eventKey="project-upload"
              className={navlink_style}
            >
              Project Upload
            </Nav.Link>
          </Fragment>
        )}

        {role === "supervisor" && (
          <Fragment>
            <Nav.Link
              as={NavLink}
              activeClassName={styles.active_link}
              to="/supervisor/dashboard"
              eventKey="dashboard"
              className={navlink_style}
            >
              Dashboard
            </Nav.Link>
            <Nav.Link
              as={NavLink}
              activeClassName={styles.active_link}
              to="/supervisor/recent-proposals"
              eventKey="recent-proposals"
              className={navlink_style}
            >
              Recent Proposals
            </Nav.Link>
          </Fragment>
        )}

        <Button variant="transparent" className="text-left ml-3 text-primary">
          Logout
        </Button>
      </Nav>
    </div>
  );
}

export default DashboardSidenav;
