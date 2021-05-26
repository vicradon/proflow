import Navbar from "../../../components/Navbar.jsx";
import styles from "./GeneralTemplate.module.css";

function GeneralTemplate({ noAuth, children }) {
  return (
    <div>
      <div className="py-2">
        <Navbar noAuth={noAuth} />
        <hr className="my-3" />
      </div>

      <div className={styles.outer_card + " bg-light py-5 pb-2"}>
        <div className={styles.content}>{children}</div>
      </div>
    </div>
  );
}

export default GeneralTemplate;
