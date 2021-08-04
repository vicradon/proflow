import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Loader from "../../../../components/Loader";
import maxios from "../../../../utils/maxios";
import DashboardTemplate from "../../../templates/DashboardTemplate/DashboardTemplate";
import { BiCommentDetail } from "react-icons/bi";
import { Button, OverlayTrigger, Popover, Form } from "react-bootstrap";
import SubmitButton from "../../../../components/SubmitButton";
import range from "../../../../utils/range";
import errorHandler from "../../../../utils/errorHandler";
import Pdf from "@mikecousins/react-pdf";

function ProjectChapter() {
  const { chapter_id } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [chapter, setChapter] = useState({});
  const [formSubmitting, setFormSubmitting] = useState(false);

  const [comments, setComments] = useState([]);
  const [pdfPath, setPdfPath] = useState("");
  const [pdfLoading, setPdfLoading] = useState(true);

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
      setPdfLoading(true);
    } catch (error) {
      errorHandler(error).then((message) => setError(message));
      setLoading(false);
      setPdfLoading(true);
    }
  };

  const onDocumentLoadSuccess = () => {
    setPdfLoading(false);
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
      {!loading && <Loader show={pdfLoading} />}
      <div className="mx-4">
        <div className="d-flex flex-column flex-wrap align-items-center">
          {!chapter && <p>Chapter {chapter_id} does not exist</p>}
          {!loading && chapter && (
            <div>
              {chapter.end_page > chapter.start_page &&
                range(chapter.start_page, chapter.end_page).map(
                  (page_number, index) => {
                    const pageComment = comments.find(
                      (comment) => comment.page_number === page_number
                    );

                    return (
                      <div key={index} className="mb-3 d-flex">
                        <Pdf
                          file={pdfPath}
                          // onDocumentLoadSuccess={onDocumentLoadSuccess}
                          page={page_number}
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
            </div>
          )}
        </div>
      </div>
    </DashboardTemplate>
  );
}

export default ProjectChapter;
