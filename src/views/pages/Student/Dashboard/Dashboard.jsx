import React, { Fragment, useState } from "react";
import DashboardTemplate from "../../../templates/DashboardTemplate/DashboardTemplate";
import ChapterCard from "../../../../components/ChapterCard/ChapterCard";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { Button } from "react-bootstrap";

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
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h3>Project Progress: 70%</h3>
          <Link to="/student/project/upload">
            <Button>Upload project</Button>
          </Link>
        </div>

        <div className="d-flex justify-content-between align-items-center flex-wrap">
          {chapters.map((chapter) => {
            return (
              <div key={"chapter card " + chapter.id} className="mb-5">
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
/**
 * The active input should be based on chapter
 */
