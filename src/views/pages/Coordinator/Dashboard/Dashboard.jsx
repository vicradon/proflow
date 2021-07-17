import React, { useState, useEffect } from "react";
import DashboardTemplate from "../../../templates/DashboardTemplate/DashboardTemplate";
import styles from "./styles.module.css";
import { Button } from "react-bootstrap";
import AddSupervisorModalForm from "./AddSupervisorModalForm";
import maxios from "../../../../utils/maxios";
import Loader from "../../../../components/Loader.jsx";
import SupervisorCard from "../../../../components/SupervisorCard/SupervisorCard";

function CoordinatorDashboard() {
  const [supervisorModalVisible, setSupervisorModalVisible] = useState(false);
  const [supervisors, setSupervisors] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSupervisors();
  }, []);

  const fetchSupervisors = async () => {
    try {
      const { data } = await maxios.get("/supervisors");
      setSupervisors(data.supervisors);
      setLoading(false);
    } catch (error) {
      console.log(9);
      setError(error.response.data.message);
      setLoading(false);
    }
  };

  const addToSupervisors = (supervisor) => {
    setSupervisors([...supervisors, supervisor]);
  };

  return (
    <DashboardTemplate>
      <div className="mx-4">
        <div className="rounded d-flex justify-content-between flex-wrap align-items-center mb-2">
          <div className="d-flex justify-content-center bg-white px-5 py-2 w-100 mx-auto align-items-center">
            <div>
              <h5 className="text-primary">Supervisors</h5>
              <p>Showing all supervisors</p>
            </div>
            <input
              type="text"
              className="form-control ml-3"
              placeholder="Search for Supervisors"
            />

            <label className="ml-4" htmlFor="exampleFormControlSelect1">
              Filter:
            </label>
            <select
              className="form-control ml-4"
              placeholder="All Categories"
              id="exampleFormControlSelect1"
            >
              <option value="all">All categories</option>
              <option value="iot">IoT</option>
              <option value="communication">Communication</option>
              <option value="transportation">Transportation</option>
            </select>
          </div>
        </div>
        <div className="d-flex justify-content-end">
          <Button onClick={() => setSupervisorModalVisible(true)}>
            Add Supervisor
          </Button>
        </div>
        <Loader show={loading} error={error} />

        {!supervisors.length && !loading && <p>No supervisors</p>}
        <div className={styles.cards}>
          {supervisors.map((supervisor) => {
            return (
              <SupervisorCard
                key={supervisor.id}
                supervisor_id={supervisor.id}
                name={supervisor.user.name}
                student_count={supervisor.student_count}
                avatar_url={supervisor.user.avatar_url}
                category={supervisor.project_category.name}
              />
            );
          })}
        </div>
      </div>

      <AddSupervisorModalForm
        showModal={supervisorModalVisible}
        closeModal={() => setSupervisorModalVisible(false)}
        addToSupervisors={addToSupervisors}
      />
    </DashboardTemplate>
  );
}

export default CoordinatorDashboard;
