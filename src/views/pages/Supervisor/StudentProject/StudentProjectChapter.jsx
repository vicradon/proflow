import { useState, useEffect, Fragment } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import Loader from "../../../../components/Loader";
import maxios from "../../../../utils/maxios";
import DashboardTemplate from "../../../templates/DashboardTemplate/DashboardTemplate";
import { Document, Page } from "react-pdf";
import { BiCommentAdd, BiCommentEdit } from "react-icons/bi";
import { Button, OverlayTrigger, Popover, Form } from "react-bootstrap";
import SubmitButton from "../../../../components/SubmitButton";
import range from "../../../../utils/range";

function StudentProjectChapter() {
  const { student_id, chapter_id } = useParams();
  const [loading, setLoading] = useState(true);
  const [showApproveButton, setApproveButton] = useState(true);
  const [error, setError] = useState("");
  const [chapter, setChapter] = useState({});
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [activeComment, setActiveComment] = useState({
    page_number: "",
    comment_text: "",
  });
  // comment object { page_number: Number, comment_text: String }
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
      const { data } = await maxios.get(
        `/chapters/${chapter_id}?student_id=${student_id}`
      );
      setChapter(data.chapter);
      setPdfPath(data.pdf_path);
      setComments(data.comments);

      if (data.chapter.status === "approved") setApproveButton(false);

      setLoading(false);
    } catch (error) {
      // setError(error.response.data.message);
      setLoading(false);
    }
  };

  const onDocumentLoadSuccess = () => {
    setLoading(false);
  };

  const createComment = async (event) => {
    event.preventDefault();
    setFormSubmitting(true);
    try {
      const { data } = await maxios.post("/comments", {
        ...activeComment,
        student_id,
        chapter_id,
      });

      setFormSubmitting(false);
      setComments([...comments, data.comment]);
    } catch (error) {
      setFormSubmitting(false);
    }
  };
  const updateComment = async (event, comment_id) => {
    event.preventDefault();
    setFormSubmitting(true);
    try {
      const { data } = await maxios.patch(`/comments/${comment_id}`, {
        ...activeComment,
        student_id,
        chapter_id,
      });

      const targetCommentIndex = comments.findIndex(
        (comment) => comment.id === comment_id
      );
      const oldComments = [...comments];
      oldComments[targetCommentIndex] = data.comment;
      setComments(oldComments);
      setFormSubmitting(false);
    } catch (error) {
      setFormSubmitting(false);
    }
  };

  const handleCommentInputChange = ({ target }) => {
    setActiveComment({ ...activeComment, comment_text: target.value });
  };
  const handleCommentButtonClick = (pageComment, pageNumber) => {
    setActiveComment({
      page_number: pageNumber,
      comment_text: pageComment ? pageComment.comment_text : "",
    });
  };

  const [projectApproving, setProjectApproving] = useState(false);
  const approveChapter = async () => {
    try {
      setProjectApproving(true);
      const { data } = await maxios.patch(`/chapters/${chapter.id}`, {
        status: "approve",
      });
      toast.success("Chapter Approved Successfully!");
      setApproveButton(false);

      setProjectApproving(false);
    } catch (error) {
      setProjectApproving(false);
      setError(error.response.data.message);
    }
  };

  return (
    <DashboardTemplate>
      <Loader error={error} show={loading} />
      <div className="mx-4">
        <div className="d-flex flex-column flex-wrap align-items-center">
          {!chapter && <p>Chapter {chapter_id} does not exist</p>}
          {!loading && chapter && (
            <Fragment>
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
                          {showApproveButton && (
                            <OverlayTrigger
                              trigger="click"
                              placement="left"
                              rootClose={true}
                              overlay={
                                <Popover className="rounded-lg shadow-sm">
                                  <Popover.Content>
                                    <Form
                                      onSubmit={(event) => {
                                        pageComment
                                          ? updateComment(event, pageComment.id)
                                          : createComment(event);
                                      }}
                                    >
                                      <Form.Row className="mb-3">
                                        <Form.Label>Comment</Form.Label>
                                        <Form.Control
                                          name="comment"
                                          as="textarea"
                                          rows={3}
                                          placeholder="e.g. This page needs images"
                                          onChange={handleCommentInputChange}
                                          value={activeComment.comment_text}
                                        />
                                      </Form.Row>

                                      <SubmitButton
                                        className="d-block float-right mb-2"
                                        size="sm"
                                        type="submit"
                                        disabled={formSubmitting}
                                      >
                                        {pageComment ? "Update" : "add"}
                                      </SubmitButton>
                                    </Form>
                                  </Popover.Content>
                                </Popover>
                              }
                            >
                              <Button
                                onClick={() =>
                                  handleCommentButtonClick(
                                    pageComment,
                                    page_number
                                  )
                                }
                                variant="transparent"
                                className="ml-2"
                              >
                                {pageComment ? (
                                  <BiCommentEdit size={24} />
                                ) : (
                                  <BiCommentAdd size={24} />
                                )}
                              </Button>
                            </OverlayTrigger>
                          )}
                        </div>
                      );
                    }
                  )}
              </Document>
              {showApproveButton && (
                <div className="d-flex justify-content-center mb-4">
                  <SubmitButton
                    disabled={projectApproving}
                    onClick={approveChapter}
                  >
                    Approve
                  </SubmitButton>
                </div>
              )}
            </Fragment>
          )}
        </div>
      </div>
    </DashboardTemplate>
  );
}

export default StudentProjectChapter;
