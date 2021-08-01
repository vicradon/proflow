import styles from "./styles.module.css";
import { Link } from "react-router-dom";

function SupervisorCard({
  supervisor_id,
  name,
  email,
  student_count,
  avatar_url,
  category,
}) {
  return (
    <div className="d-flex flex-column p-5 justify-content-center text-center align-content-center m-2 bg-white position-relative">
      <div className={styles.groupcard}>{category}</div>
      <img src={avatar_url} className="rounded-circle mx-auto w-50"></img>
      <h3>{name}</h3>
      <p>{email}</p>
      <p>Students: {student_count}</p>
      <Link to={`/coordinator/supervisors/${supervisor_id}/students`}>
        View Details
      </Link>
    </div>
  );
}

export default SupervisorCard;
