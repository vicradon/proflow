import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Loader from "../../../../components/Loader";
import maxios from "../../../../utils/maxios";
import DashboardTemplate from "../../../templates/DashboardTemplate/DashboardTemplate";
import ChapterCard from "../../../../components/ChapterCard/ChapterCard";

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
      const { data } = await maxios.get(`/students/${student_id}/chapters`);
      setChapters(data.chapters);
      setLoading(false);
    } catch (error) {
      setError(error.response.data.message);
      setLoading(false);
    }
  };
  return (
    <DashboardTemplate>
      <Loader error={error} show={loading} />
      <div className="mx-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          {/* <h3>Project Progress: </h3> */}
        </div>

        <div className="d-flex justify-content-between align-items-center flex-wrap">
          {chapters.map((chapter) => {
            console.log(chapter);
            return (
              <div key={"chapter card " + chapter.index} className="mb-5">
                <ChapterCard
                  status={chapter.status}
                  index={chapter.serial_number}
                  chapter_id={chapter.id}
                  student_id={chapter.student_id}
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
