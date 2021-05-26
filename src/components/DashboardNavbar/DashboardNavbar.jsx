import React from "react";
import styles from "./DashboardNavbar.module.css";
import { MdNotifications } from "react-icons/md";

function DashboardNavbar() {
  return (
    <div
      className={
        styles.root + " bg-white p-4 mb-3 shadow d-flex justify-content-end"
      }
    >
      <MdNotifications />
    </div>
  );
}

export default DashboardNavbar;
