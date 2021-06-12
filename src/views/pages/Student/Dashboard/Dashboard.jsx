import React, { useState } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import DashboardTemplate from "../../../templates/DashboardTemplate/DashboardTemplate";
import Images from "../../../../components/Images.js";
import styles from "./styles.module.css";
import ChapterCard from "../../../../components/ChapterCard/ChapterCard";

function StudentDashboard() {
  const [chapters, setChapters] = useState([
    {
      index: 1,
      status: "approved",
    },
    {
      index: 2,
      status: "approved",
    },
    {
      index: 3,
      status: "rejected",
    },
    {
      index: 4,
      status: "pending",
    },
    {
      index: 5,
      status: "incomplete",
    },
  ]);
  return (
    <DashboardTemplate>
      <div className="mx-4">
        <h3>Project Progress: 70%</h3>

        <div className="d-flex justify-content-between align-items-center flex-wrap">
          {chapters.map((chapter) => {
            return (
              <div key={chapter.index} className="mb-5">
                <ChapterCard status={chapter.status} index={chapter.index} />
              </div>
            );
          })}
        </div>
      </div>
    </DashboardTemplate>
  );
}

export default StudentDashboard;
