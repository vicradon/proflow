import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Table } from "react-bootstrap";
import DashboardTemplate from "../../../templates/DashboardTemplate/DashboardTemplate";
import Images from "../../../../components/Images.js";
import styles from "./styles.module.css";
import { MdMoreVert } from "react-icons/md";

function SupervisorDashboard() {
  const [students, setStudents] = useState([
    {
      name: "Achonwa Alvan",
      department: "CSC",
      category: "Telecom",
      date_added: "Feb 3, 2020",
    },
    {
      name: "Chizo Nwazuo",
      department: "CSC",
      category: "Systems",
      date_added: "Feb 3, 2020",
    },
    {
      name: "Collins Adeleke",
      department: "CSC",
      category: "IoT",
      date_added: "Feb 3, 2020",
    },
    {
      name: "Elendu Christiana",
      department: "CSC",
      category: "Research",
      date_added: "Feb 3, 2020",
    },
  ]);
  return (
    <DashboardTemplate>
      <div className="mx-4">
        <div className="d-flex flex-column">
          <h5 className="mx-2">Total Students: 17</h5>
          <h5 className="mx-2">Paired Students: 15</h5>
        </div>

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
                  <td className="d-flex align-items-center">
                    <img
                      src={`https://robohash.org/${student.category}.png`}
                      alt={student.name}
                      className={styles.avatar}
                    />
                    <span className="ml-1">{student.name}</span>
                  </td>
                  <td>{student.department}</td>
                  <td>{student.category}</td>
                  <td>{student.date_added}</td>
                  <td>
                    <MdMoreVert />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    </DashboardTemplate>
  );
}

export default SupervisorDashboard;
