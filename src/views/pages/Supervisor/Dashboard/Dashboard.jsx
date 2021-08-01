import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Table, Dropdown } from "react-bootstrap";
import DashboardTemplate from "../../../templates/DashboardTemplate/DashboardTemplate";
import Images from "../../../../components/Images.js";
import styles from "./styles.module.css";
import { MdMoreVert } from "react-icons/md";
import { FiSearch } from "react-icons/fi";
import Loader from "../../../../components/Loader";
import maxios from "../../../../utils/maxios";
import moment from "moment";
import errorHandler from "../../../../utils/errorHandler";

function SupervisorDashboard() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [students, setStudents] = useState([]);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const { data } = await maxios.get(`/supervisor/students`);
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
        <div>
          {/* <div className={styles.search_container}>
            <InputGroup className="w-50">
              <InputGroup.Prepend>
                <InputGroup.Text id="basic-addon1">
                  <FiSearch />
                </InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                placeholder="Username"
                aria-label="Username"
                aria-describedby="basic-addon1"
              />
            </InputGroup>
          </div>

          <div
            style={{ backgroundColor: "#F7F7F7" }}
            className="d-flex align-items-baseline justify-content-end py-4"
          >
            <p className="mr-3">Filter: </p>
            <select>
              <option value="all">All</option>
              <option value="approved">Approved projects</option>
              <option value="rejected">Rejected projects</option>
            </select>
          </div> */}

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

          {!students.length && !loading && (
            <p className="text-center">No students were assigned to you</p>
          )}
        </div>
      </div>
    </DashboardTemplate>
  );
}

export default SupervisorDashboard;
