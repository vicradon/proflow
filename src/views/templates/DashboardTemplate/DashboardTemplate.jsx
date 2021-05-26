import styles from "./DashboardTemplate.module.css";
import DashboardSidenav from "../../../components/DashboardSidenav/DashboardSidenav.jsx";
import DashboardNavbar from "../../../components/DashboardNavbar/DashboardNavbar.jsx";

function DashboardTemplate({ children }) {
  return (
    <div>
      <div className={styles.sidenav}>
        <DashboardSidenav />
      </div>
      <div className={styles.main_content}>
        <DashboardNavbar />
        {children}
      </div>
    </div>
  );
}

export default DashboardTemplate;
