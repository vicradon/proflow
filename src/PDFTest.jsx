import React, { useState, useRef } from "react";
import Pdf, { usePdf } from "@mikecousins/react-pdf";
import range from "./utils/range";

const PDFTest = () => {
  const [page, setPage] = useState(1);
  const canvasRef = useRef(null);

  const { pdfDocument, pdfPage } = usePdf({
    file: "https://res.cloudinary.com/osinachi/image/upload/v1628034958/undergraduate-project-supervision/dsne1ckedllq248h9a47.pdf",
    page,
    canvasRef,
  });

  return (
    <div>
      {!pdfDocument && <span>Loading...</span>}
      <canvas ref={canvasRef} />
      {Boolean(pdfDocument && pdfDocument.numPages) && (
        <nav>
          <ul className="pager">
            <li className="previous">
              <button disabled={page === 1} onClick={() => setPage(page - 1)}>
                Previous
              </button>
            </li>
            <li className="next">
              <button
                disabled={page === pdfDocument.numPages}
                onClick={() => setPage(page + 1)}
              >
                Next
              </button>
            </li>
          </ul>
        </nav>
      )}

      {range("2", "5").map((num, index) => (
        <Pdf
          key={index}
          file="https://res.cloudinary.com/osinachi/image/upload/v1628034958/undergraduate-project-supervision/dsne1ckedllq248h9a47.pdf"
          page={num}
        />
      ))}
    </div>
  );
};

export default PDFTest;
