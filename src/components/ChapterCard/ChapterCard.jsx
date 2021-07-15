import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import capitalize from "../../utils/capitalize";
import styles from "./ChapterCard.module.css";

function ChapterCard({ status, index, chapter_id, student_id }) {
  const cardColor = (() => {
    switch (status) {
      case "approved": {
        return "#08cb04";
      }
      case "rejected": {
        return "#cb0404";
      }
      case "pending": {
        return "#dfc900";
      }
      case "incomplete": {
        return "#353a45";
      }
    }
  })();

  const role = localStorage.getItem("role");
  return (
    <div className={styles.root}>
      <div
        style={{ borderBottom: `3px solid ${cardColor}` }}
        className="rounded d-flex justify-content-between align-items-center bg-white p-3 mb-3"
      >
        <div className="">
          <p className="text-gray small">Chapter</p>
          <p className="text-18px">{status && capitalize(status)}</p>
        </div>
        <div
          style={{ background: cardColor }}
          className={`${styles.roundedText} bg-${cardColor}`}
        >
          {index}
        </div>
      </div>
      <Link
        to={
          role === "student"
            ? `/student/chapters/${chapter_id}`
            : `/supervisor/students/${student_id}/chapters/${chapter_id}`
        }
      >
        <Button variant="info" className="w-100">
          View
        </Button>
      </Link>
    </div>
  );
}

export default ChapterCard;
