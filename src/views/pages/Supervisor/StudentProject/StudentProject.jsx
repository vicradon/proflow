import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Loader from "../../../../components/Loader";
import maxios from "../../../../utils/maxios";
import DashboardTemplate from "../../../templates/DashboardTemplate/DashboardTemplate";
import ChapterCard from "../../../../components/ChapterCard/ChapterCard";
import errorHandler from "../../../../utils/errorHandler";

function StudentProject() {
  const { student_id } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [chapters, setChapters] = useState([]);

  useEffect(() => {
    fetchChapters();
  }, []);

  const fetchChapters = async () => {
    try {
      const { data } = await maxios.get(`/chapters/?student_id=${student_id}`);
      setChapters(data.chapters);
      setLoading(false);
    } catch (error) {
      errorHandler(error).then((message) => setError(message));
      setLoading(false);
    }
  };
  return (
    <DashboardTemplate>
      <Loader error={error} show={loading} />
      <div className="mx-4">
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
          {!loading && !chapters.length && <p>No Chapter has been uploaded</p>}
        </div>
      </div>
    </DashboardTemplate>
  );
}

export default StudentProject;
