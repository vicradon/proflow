import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Table, InputGroup, FormControl, Dropdown } from "react-bootstrap";
import DashboardTemplate from "../../../templates/DashboardTemplate/DashboardTemplate";
import Images from "../../../../components/Images.js";
import styles from "./styles.module.css";
import { MdMoreVert } from "react-icons/md";
import { FiSearch } from "react-icons/fi";
import Loader from "../../../../components/Loader";
import maxios from "../../../../utils/maxios";
import moment from "moment";

function SupervisorStudents() {
  const { supervisor_id } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [students, setStudents] = useState([]);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const { data } = await maxios.get(
        `/supervisor/students?supervisor_id=${supervisor_id}`
      );
      setStudents(data.students);
      setLoading(false);
    } catch (error) {
      errorHandler(error).then((message) => setError(message));
      setLoading(false);
    }
  };

  return (
    <DashboardTemplate>
      <div className="mx-4">
        {!students.length && !loading && (
          <p className="text-center">No students under this supervisor</p>
        )}
        <Link to="/coordinator/dashboard">&larr; Back to supervisors</Link>
        <h2>Students</h2>

        <Table className={"bg-white " + styles.table} hover responsive>
          <thead>
            <tr>
              <th className="text-primary">Student Name</th>
              <th className="text-primary">Department</th>
              <th className="text-primary">Category</th>
              <th className="text-primary">Date Added</th>
              <th className="text-primary">Action</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student, index) => {
              return (
                <tr key={index}>
                  <td className="d-flex align-items-center p-3">
                    <img
                      src={student.user.avatar_url}
                      alt={student.user.name}
                      className={styles.avatar}
                      width={50}
                    />
                    <span className="ml-1">{student.user.name}</span>
                  </td>
                  <td className="align-middle">{student.user.department}</td>
                  <td className="align-middle">
                    {student.project.project_category.name}
                  </td>
                  <td className="align-middle">
                    {student.user
                      ? moment(student.user.created_at).format("ll")
                      : ""}
                  </td>
                  <td className="align-middle">
                    <Dropdown>
                      <Dropdown.Toggle variant="light-outline">
                        <MdMoreVert size={24} />
                      </Dropdown.Toggle>

                      <Dropdown.Menu>
                        <Dropdown.Item
                          as={Link}
                          to={`/supervisor/students/${student.id}`}
                        >
                          View
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>

        <Loader error={error} show={loading} />
      </div>
    </DashboardTemplate>
  );
}

export default SupervisorStudents;
