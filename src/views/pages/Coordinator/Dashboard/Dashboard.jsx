import React, { useState, useEffect } from "react";
import DashboardTemplate from "../../../templates/DashboardTemplate/DashboardTemplate";
import styles from "./styles.module.css";
import { Button } from "react-bootstrap";
import AddSupervisorModalForm from "./AddSupervisorModalForm";
import maxios from "../../../../utils/maxios";
import Loader from "../../../../components/Loader.jsx";
import SupervisorCard from "../../../../components/SupervisorCard/SupervisorCard";
import { Link } from "react-router-dom";
import { GoProject } from "react-icons/go";
import { IoSchoolOutline } from "react-icons/io5";
import { MdSupervisorAccount } from "react-icons/md";
import { AiOutlinePartition } from "react-icons/ai";
import SummaryCard from "../../../../components/SummaryCard";

function CoordinatorDashboard() {
  const [summary, setSummary] = useState({
    supervisor_count: 0,
    student_count: 0,
    project_count: 0,
    project_category_count: 0,
  });
  const [supervisorModalVisible, setSupervisorModalVisible] = useState(false);
  const [supervisors, setSupervisors] = useState([]);
  const [projectCategories, setProjectCategories] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetchSupervisorsAndProjectCategories();
  }, []);

  const fetchSupervisorsAndProjectCategories = async () => {
    try {
      const { data } = await maxios.get("/supervisors");
      const { data: projectCategoriesData } = await maxios.get(
        "/project-categories"
      );
      const { data: summaryData } = await maxios.get("/summary");
      setSupervisors(data.supervisors);
      setProjectCategories(projectCategoriesData.project_categories);
      setSummary(summaryData.summary);
      setLoading(false);
    } catch (error) {
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
        <h2>Summary</h2>
        <div className="d-flex align-items-center flex-wrap justify-content-between mb-4">
          <SummaryCard title="Total Projects" data={summary.project_count}>
            <GoProject color="#EC541F" size={40} />
          </SummaryCard>

          <SummaryCard title="Total Students" data={summary.student_count}>
            <IoSchoolOutline color="#54AA7E" size={40} />
          </SummaryCard>
          <SummaryCard
            title="Total Supervisors"
            data={summary.supervisor_count}
          >
            <MdSupervisorAccount color="#4095A2" size={40} />
          </SummaryCard>
          <SummaryCard
            title="Project Categories"
            data={summary.project_category_count}
          >
            <AiOutlinePartition color="#3F83F8" size={40} />
          </SummaryCard>
        </div>

        {/* <div className="rounded d-flex justify-content-between flex-wrap align-items-center mb-2">
          <div className="d-flex bg-white px-5 py-2 w-100 mx-auto align-items-center">
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
            </select>
          </div>
        </div> */}
        <h2>Supervisors</h2>
        <div className="d-flex justify-content-end">
          <Button
            disabled={projectCategories.length === 0}
            onClick={() => setSupervisorModalVisible(true)}
          >
            Add Supervisor
          </Button>
        </div>
        <Loader show={loading} error={error} />

        {!supervisors.length && !loading && (
          <p className="text-center">No supervisors</p>
        )}

        {!projectCategories.length && !loading && (
          <p className="text-center">
            No project categories, click{" "}
            <Link to="/coordinator/project-categories/add">here</Link> to create
            one
          </p>
        )}
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
        projectCategories={projectCategories}
        summary={summary}
        setSummary={setSummary}
      />
    </DashboardTemplate>
  );
}

export default CoordinatorDashboard;
