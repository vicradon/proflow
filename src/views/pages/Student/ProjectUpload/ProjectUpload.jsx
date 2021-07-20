import { useState, useEffect } from "react";
import Images from "../../../../components/Images.js";
import styles from "./styles.module.css";
import { Document, Page } from "react-pdf";
import { Form, Button, Table } from "react-bootstrap";
import SubmitButton from "../../../../components/SubmitButton";
import DashboardTemplate from "../../../templates/DashboardTemplate/DashboardTemplate.jsx";
import maxios from "../../../../utils/maxios.js";
import { useHistory } from "react-router-dom";
import Loader from "../../../../components/Loader.jsx";
import range from "../../../../utils/range.js";

function ProjectUpload() {
  const history = useHistory();
  const [loading, setLoading] = useState(true);
  const [hasUnresolvedComments, setUnresolvedComments] = useState(true);
  const [sideOptionsVisible, setSideOptionsVisible] = useState(false);
  const [formSubmited, setFormSubmited] = useState(false);
  const [error, setError] = useState("");
  const [projectPdf, setProjectPdf] = useState();
  const [pageRange, setPageRange] = useState({ start: 0, end: 1 });
  const [pageCount, setPageCount] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [selectCount, setSelectCount] = useState(1);
  const [chapterRanges, setChapterRanges] = useState({
    1: Array(pageCount).fill(0),
    2: Array(pageCount).fill(0),
    3: Array(pageCount).fill(0),
    4: Array(pageCount).fill(0),
    5: Array(pageCount).fill(0),
  });
  const [activeChapterSelect, setActiveChapterSelect] = useState(1);

  const [chapterStack, setChapterStack] = useState([]);
  useEffect(() => {
    setChapterStack([...chapterStack, activeChapterSelect]);
    if (chapterStack.length) {
      const previousChapter = chapterStack[chapterStack.length - 1];

      const startIndex = chapterRanges[previousChapter].findIndex(
        (val) => val === 1
      );
      const endIndex = chapterRanges[previousChapter]
        .slice(startIndex + 1)
        .findIndex((val) => val === 1);
    }
  }, [activeChapterSelect]);

  useEffect(() => {
    fetchCommentCount();
  }, []);

  const fetchCommentCount = async () => {
    try {
      const { data } = await maxios.get("/comments-count");
      if (data.comment_count > 0) {
        setUnresolvedComments(true);
      } else {
        setUnresolvedComments(false);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const filteredZeros = (arr) => arr.filter((val) => val !== 0);
  const onDocumentLoadSuccess = ({ numPages }) => {
    setSideOptionsVisible(true);
    setPageCount(numPages);
    setChapterRanges({
      1: Array(numPages).fill(0),
      2: Array(numPages).fill(0),
      3: Array(numPages).fill(0),
      4: Array(numPages).fill(0),
      5: Array(numPages).fill(0),
    });
  };
  const handleFileChange = ({ target }) => {
    setProjectPdf(target.files[0]);
  };
  const handleChapterSelect = ({ target }) => {
    setActiveChapterSelect(Number(target.value));
  };
  const handlePageSelect = ({ target }) => {
    let arr = chapterRanges[activeChapterSelect];

    // if two elements exist, reset the selection
    if (filteredZeros(arr).length === 2) {
      arr[arr.indexOf(1)] = 0;
      arr[arr.indexOf(1)] = 0;
    }

    arr[target.value - 1] = 1;
    setChapterRanges({ ...chapterRanges, [activeChapterSelect]: arr });
  };

  const getPageRanges = () => {
    const startEnds = {};
    Object.keys(chapterRanges).forEach((chapter) => {
      const start = chapterRanges[chapter].findIndex((v) => v === 1);
      const end = chapterRanges[chapter]
        .slice(start + 1)
        .findIndex((v) => v === 1);

      if (start !== -1 && end !== -1) {
        startEnds[chapter] = [start + 1, end + start + 2];
      }
    });

    return startEnds;
  };

  const handleSubmit = async (event) => {
    try {
      setError("");
      setFormSubmited(true);
      event.preventDefault();

      const formData = new FormData();
      const pageRanges = getPageRanges();

      formData.append("available_chapters", Object.keys(pageRanges).length);
      formData.append("page_ranges", JSON.stringify(pageRanges));
      formData.append("project_pdf", projectPdf);

      const { data } = await maxios.post("/projects/upload", formData);

      setFormSubmited(false);
      history.push("/student/dashboard");
    } catch (error) {
      const errors =
        error.response && error.response.data.errors
          ? Object.values(error.response.data.errors).join("\n")
          : "An error occured, our engineers are working hard to fix it";

      setError(errors);
      setFormSubmited(false);
    }
  };

  return (
    <DashboardTemplate>
      <div className="m-4">
        <Loader show={loading} />

        {!loading && hasUnresolvedComments && (
          <p className="text-center">
            Your project still has unresolved comments. Please go through each
            chapter before attempting to upload again
          </p>
        )}
        {!loading && !hasUnresolvedComments && (
          <Form onSubmit={handleSubmit}>
            <Form.File
              className="mb-2"
              name="avatar"
              custom
              accept="application/pdf"
              label="Project PDF Upload"
              onChange={handleFileChange}
              required
            />

            <div className={styles.pdf_select_area}>
              <Document
                className={styles.pdf_grid}
                file={projectPdf}
                onLoadSuccess={onDocumentLoadSuccess}
              >
                {chapterRanges[activeChapterSelect].map((checkValue, index) => {
                  return (
                    <div key={"Page " + index + 1}>
                      <Form.Check
                        onChange={handlePageSelect}
                        value={index + 1}
                        label={`Page ${index + 1} ${
                          checkValue === 1
                            ? index ===
                              chapterRanges[activeChapterSelect].findIndex(
                                (val) => val === 1
                              )
                              ? "(start)"
                              : "(end)"
                            : ""
                        }`}
                        type="checkbox"
                        checked={checkValue === 1}
                      />
                      <Page width={200} pageNumber={index + 1} />
                    </div>
                  );
                })}
              </Document>

              {sideOptionsVisible && (
                <div>
                  <div className={styles.side_options}>
                    <div className="mb-4">
                      <h4>Chapter Select</h4>
                      <Form.Check
                        type="radio"
                        name="chapter-select"
                        value={1}
                        label="Chapter 1"
                        onChange={handleChapterSelect}
                        defaultChecked
                      />
                      <Form.Check
                        type="radio"
                        name="chapter-select"
                        value={2}
                        label="Chapter 2"
                        onChange={handleChapterSelect}
                      />
                      <Form.Check
                        type="radio"
                        name="chapter-select"
                        value={3}
                        label="Chapter 3"
                        onChange={handleChapterSelect}
                      />
                      <Form.Check
                        type="radio"
                        name="chapter-select"
                        value={4}
                        label="Chapter 4"
                        onChange={handleChapterSelect}
                      />
                      <Form.Check
                        type="radio"
                        name="chapter-select"
                        value={5}
                        label="Chapter 5"
                        onChange={handleChapterSelect}
                      />
                    </div>
                    <div>
                      <h4>Summary</h4>

                      <Table className={"bg-white"} hover responsive>
                        <thead>
                          <tr>
                            <th className="text-primary">Chapter</th>
                            <th className="text-primary">Start</th>
                            <th className="text-primary">End</th>
                          </tr>
                        </thead>
                        <tbody>
                          {Object.entries(getPageRanges()).map(
                            (entry, index) => {
                              return (
                                <tr key={"chapter-summary-" + index}>
                                  <td>{entry[0]}</td>
                                  <td>{entry[1][0]}</td>
                                  <td>{entry[1][1]}</td>
                                </tr>
                              );
                            }
                          )}
                        </tbody>
                      </Table>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="d-flex flex-column">
              <div>{error && <p className="text-danger">{error}</p>}</div>

              <SubmitButton disabled={formSubmited} />
            </div>
          </Form>
        )}
      </div>
    </DashboardTemplate>
  );
}

export default ProjectUpload;
