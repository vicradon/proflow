import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Loader from "../../../../components/Loader";
import maxios from "../../../../utils/maxios";
import DashboardTemplate from "../../../templates/DashboardTemplate/DashboardTemplate";
import { Document, Page } from "react-pdf";
import { BiCommentDetail } from "react-icons/bi";
import { Button, OverlayTrigger, Popover, Form } from "react-bootstrap";
import SubmitButton from "../../../../components/SubmitButton";
import range from "../../../../utils/range";

function ProjectChapter() {
  const { chapter_id } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [chapter, setChapter] = useState({});
  const [formSubmitting, setFormSubmitting] = useState(false);

  const [comments, setComments] = useState([]);
  const [pdfPath, setPdfPath] = useState("");
  const cors_proxy =
    process.env.NODE_ENV === "development"
      ? "http://localhost:8080/"
      : "https://corsanywhere.herokuapp.com/";

  useEffect(() => {
    fetchChapterAndComments();
  }, []);

  const fetchChapterAndComments = async () => {
    try {
      const { data } = await maxios.get(`/chapters/${chapter_id}`);
      setChapter(data.chapter);
      setPdfPath(data.pdf_path);
      setComments(data.comments);

      setLoading(false);
    } catch (error) {
      setError(error.response.data.message);
      setLoading(false);
    }
  };

  const onDocumentLoadSuccess = () => {
    setLoading(false);
  };

  const resolveComment = async (comment_id) => {
    setFormSubmitting(true);
    try {
      const { data } = await maxios.patch(
        `/comments/${comment_id}?resolve_comment`
      );
      const updatedComments = comments.filter(
        (comment) => comment.id !== data.comment.id
      );
      setComments(updatedComments);
      setFormSubmitting(false);
    } catch (error) {
      setFormSubmitting(false);
    }
  };

  return (
    <DashboardTemplate>
      <Loader error={error} show={loading} />
      <div className="mx-4">
        <div className="d-flex flex-column flex-wrap align-items-center">
          {!chapter && <p>Chapter {chapter_id} does not exist</p>}
          {!loading && chapter && (
            <Document
              file={cors_proxy + pdfPath}
              onLoadSuccess={onDocumentLoadSuccess}
            >
              {chapter.end_page > chapter.start_page &&
                range(chapter.start_page, chapter.end_page).map(
                  (page_number, index) => {
                    const pageComment = comments.find(
                      (comment) => comment.page_number === page_number
                    );

                    return (
                      <div key={index} className="mb-3 d-flex">
                        <Page
                          key={index}
                          width={800}
                          pageNumber={page_number}
                        />
                        {pageComment && (
                          <OverlayTrigger
                            trigger="click"
                            placement="left"
                            rootClose={true}
                            overlay={
                              <Popover className="rounded-lg shadow-sm">
                                <Popover.Content>
                                  <div>
                                    <p>{pageComment.comment_text}</p>
                                    <SubmitButton
                                      disabled={formSubmitting}
                                      onClick={() =>
                                        resolveComment(pageComment.id)
                                      }
                                      size="sm"
                                      variant="success"
                                    >
                                      Mark as resolved
                                    </SubmitButton>
                                  </div>
                                </Popover.Content>
                              </Popover>
                            }
                          >
                            <Button variant="transparent" className="ml-2">
                              <BiCommentDetail size={24} />
                            </Button>
                          </OverlayTrigger>
                        )}
                      </div>
                    );
                  }
                )}
            </Document>
          )}
        </div>
      </div>
    </DashboardTemplate>
  );
}

export default ProjectChapter;
