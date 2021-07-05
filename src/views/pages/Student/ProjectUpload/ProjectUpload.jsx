import { useState } from "react";
import Images from "../../../../components/Images.js";
import styles from "./styles.module.css";
import { Document, Page } from "react-pdf";
import { Form, Button, Table } from "react-bootstrap";
import SubmitButton from "../../../../components/SubmitButton";
import DashboardTemplate from "../../../templates/DashboardTemplate/DashboardTemplate.jsx";

function ProjectUpload() {
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

  const filteredZeros = (arr) => arr.filter((val) => val !== 0);

  const onDocumentLoadSuccess = ({ numPages }) => {
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
    setActiveChapterSelect(target.value);
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
  const uploadPdf = (event) => {
    event.preventDefault();
  };
  return (
    <DashboardTemplate>
      <div className="m-4">
        <Form onSubmit={uploadPdf}>
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
              {chapterRanges[activeChapterSelect].map((checkValue, index) => (
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
              ))}
            </Document>

            <div>
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
                    {Object.keys(chapterRanges).map((chapter, index) => {
                      const start = chapterRanges[chapter].findIndex(
                        (val) => val === 1
                      );
                      const end = chapterRanges[chapter]
                        .slice(start + 1)
                        .findIndex((val) => val === 1);

                      return (
                        <tr key={"chapter-summary-" + index}>
                          <td>{chapter}</td>
                          <td>{start === -1 ? 0 : start + 1}</td>
                          <td>{end === -1 ? 0 : end + start + 2}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              </div>
            </div>
          </div>
          <div className="d-flex flex-column">
            <div>{error && <p className="text-danger">{error}</p>}</div>

            <SubmitButton disabled={formSubmited} />
          </div>
        </Form>
      </div>
    </DashboardTemplate>
  );
}

export default ProjectUpload;
