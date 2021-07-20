import React, { useEffect, useState } from "react";
import DashboardTemplate from "../../../templates/DashboardTemplate/DashboardTemplate";
import ChapterCard from "../../../../components/ChapterCard/ChapterCard";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { Button } from "react-bootstrap";
import maxios from "../../../../utils/maxios";
import Loader from "../../../../components/Loader";

function StudentDashboard() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [chapters, setChapters] = useState([]);

  useEffect(() => {
    fetchChapters();
  }, []);

  const fetchChapters = async () => {
    try {
      const { data } = await maxios.get(`/chapters`);
      setChapters(data.chapters);
      setLoading(false);
    } catch (error) {
      setError(error.response.data.message);
      setLoading(false);
    }
  };
  return (
    <DashboardTemplate>
      <div className="mx-4">
        <Loader error={error} show={loading} />

        <div className="d-flex align-items-center flex-wrap">
          {chapters.map((chapter) => {
            return (
              <div key={"chapter card " + chapter.id} className="mb-5 mr-4">
                <ChapterCard
                  status={chapter.status}
                  index={chapter.serial_number}
                  chapter_id={chapter.id}
                  student_id={chapter.student_id}
                  comments_count={chapter.comments_count}
                />
              </div>
            );
          })}
          {!loading && !chapters.length && (
            <div>
              <p>No Chapter has been uploaded</p>
              <Link to="/student/project/upload">
                <Button>Upload project</Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </DashboardTemplate>
  );
}

export default StudentDashboard;
/**
 * The active input should be based on chapter
 */
