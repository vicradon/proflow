import { useState, useEffect } from "react";
import { useParams } from "react-router";
import DashboardTemplate from "../../../templates/DashboardTemplate/DashboardTemplate.jsx";
import styles from "./styles.module.css";
import Loader from "../../../../components/Loader.jsx";
import maxios from "../../../../utils/maxios";

function SupervisorStudents() {
  const { supervisor_id } = useParams();
  const [students, setStudents] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSupervisor();
  }, []);

  const fetchSupervisor = async () => {
    try {
      const { data } = await maxios.get(
        `/supervisor/students?supervisor_id=${supervisor_id}`
      );
      setStudents(data.students);
      setLoading(false);
    } catch (error) {
      setError(error.response.data.message);
      setLoading(false);
    }
  };

  return (
    <DashboardTemplate>
      <div className="mx-4">
        <Loader show={loading} error={error} />
        {!students.length && !loading && (
          <p className="text-center">No students under this supervisor</p>
        )}
      </div>
    </DashboardTemplate>
  );
}

export default SupervisorStudents;
