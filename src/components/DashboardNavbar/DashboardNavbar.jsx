import React from "react";
import styles from "./DashboardNavbar.module.css";
import { MdNotifications } from "react-icons/md";
import { Button } from "react-bootstrap";

function DashboardNavbar() {
  const user = JSON.parse(localStorage.getItem("user"));
  const role = localStorage.getItem("role");

  return (
    <div
      className={
        styles.root +
        " bg-white px-4 py-2 mb-3 shadow d-flex justify-content-end"
      }
    >
      <Button variant="light">
        <MdNotifications size={24} />
      </Button>

      <div className="d-flex align-items-center ml-2">
        <img
          width={50}
          height={50}
          className={styles.avatar}
          src={user.avatar_url}
        />

        <div className="d-flex flex-column ml-2">
          <p className="text-primary mb-0">{user.name}</p>
          <p className="mb-0">{role}</p>
        </div>
      </div>
    </div>
  );
}

export default DashboardNavbar;
