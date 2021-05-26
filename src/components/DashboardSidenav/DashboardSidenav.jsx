import React from "react";
import Images from "../Images";
import styles from "./DashboardSidenav.module.css";

function DashboardSidenav() {
  return (
    <div className={styles.root}>
      <img src={Images.TextLogoWhite} alt="Proflow" />

      <hr />
    </div>
  );
}

export default DashboardSidenav;
