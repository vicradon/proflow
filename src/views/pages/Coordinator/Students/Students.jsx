import React, { useState, useEffect } from "react";
import DashboardTemplate from "../../../templates/DashboardTemplate/DashboardTemplate";
import styles from "./styles.module.css";
import { Button, Table, Dropdown } from "react-bootstrap";
import maxios from "../../../../utils/maxios";
import Loader from "../../../../components/Loader.jsx";
import SupervisorCard from "../../../../components/SupervisorCard/SupervisorCard";
import { Link } from "react-router-dom";
import CreateStudentModal from "./CreateStudentModal";
import errorHandler from "../../../../utils/errorHandler";
import moment from "moment";
import { MdMoreVert } from "react-icons/md";

function CoordinatorStudents() {
  const [studentModalVisible, setStudentModalVisible] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [students, setStudents] = useState([]);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const { data: response } = await maxios.get(`/users?role=student`);
      setStudents(response.data);
      setLoading(false);
    } catch (error) {
      errorHandler(error).then((message) => setError(message));
      setLoading(false);
    }
  };

  const addToStudents = (student) => {
    setStudents([...students, student]);
  };

  return (
    <DashboardTemplate>
      <div className="mx-4 mt-4">
        <div className="d-flex justify-content-between">
          <h2>Students</h2>
          <Button className="mb-4" onClick={() => setStudentModalVisible(true)}>
            Add Student
          </Button>
        </div>

        <Table className={"bg-white " + styles.table} hover responsive>
          <thead>
            <tr>
              <th className="text-primary">Name</th>
              <th className="text-primary">Email</th>
              <th className="text-primary">Department</th>
              <th className="text-primary">Date Added</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student, index) => {
              return (
                <tr key={index}>
                  <td className="d-flex align-items-center p-3">
                    {student.avatar_url && (
                      <img
                        src={student.avatar_url}
                        alt={student.name}
                        className={styles.avatar}
                        width={50}
                      />
                    )}
                    <span className="ml-1">{student.name}</span>
                  </td>
                  <td className="align-middle">{student.email}</td>
                  <td className="align-middle">{student.department}</td>

                  <td className="align-middle">
                    {student ? moment(student.created_at).format("ll") : ""}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
        {!students.length && !loading && (
          <p className="text-center">No students</p>
        )}
        <Loader error={error} show={loading} />

        <CreateStudentModal
          showModal={studentModalVisible}
          closeModal={() => setStudentModalVisible(false)}
          addToStudents={addToStudents}
        />
      </div>
    </DashboardTemplate>
  );
}

export default CoordinatorStudents;
