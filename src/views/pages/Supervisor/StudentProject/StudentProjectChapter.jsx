import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Loader from "../../../../components/Loader";
import maxios from "../../../../utils/maxios";
import DashboardTemplate from "../../../templates/DashboardTemplate/DashboardTemplate";
import { Document, Page } from "react-pdf";
import axios from "axios";

function StudentProjectChapter() {
  const { student_id, chapter_id } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [chapter, setChapter] = useState({});
  const [pdfPath, setPdfPath] = useState("");

  useEffect(() => {
    fetchChapter();
  }, []);

  const fetchChapter = async () => {
    try {
      const { data } = await maxios.get(
        `/students/${student_id}/chapters/${chapter_id}`
      );
      const stuff = await axios(
        "http://localhost:8000/storage/project_pdfs/HRVwqNVfsVuTb7As5jtiZXmf5mXZCzoECiWyv5Ul.pdf"
      );
      console.log(stuff);
      console.log(data);
      setChapter(data.chapter);
      setPdfPath(data.pdf_path);
      setLoading(false);
    } catch (error) {
      // setError(error.response.data.message);
      setLoading(false);
    }
  };

  const onDocumentLoadSuccess = () => {
    // setLoading(false);
  };

  return (
    <DashboardTemplate>
      <Loader error={error} show={loading} />
      <div className="mx-4">
        {/* {!loading && (
          <Document file={pdfPath} onLoadSuccess={onDocumentLoadSuccess}>
            {chapter.end_page > chapter.start_page &&
              Array(chapter.end_page + 1 - chapter.start_page)
                .fill(0)
                .map((_, index) => {
                  return (
                    <Page
                      key={index}
                      width={200}
                      pageNumber={chapter.start_page + index}
                    />
                  );
                })}
          </Document>
        )} */}
      </div>
    </DashboardTemplate>
  );
}

export default StudentProjectChapter;
