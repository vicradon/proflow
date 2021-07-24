import React from "react";

function SummaryCard({ children, title, className, data }) {
  return (
    <div
      className={`d-flex justify-content-between align-items-center rounded bg-white shadow py-3 px-4 ${className}`}
    >
      {children}
      <div className="ml-4">
        <h6>{title}</h6>
        <h3>{data}</h3>
      </div>
    </div>
  );
}

export default SummaryCard;
