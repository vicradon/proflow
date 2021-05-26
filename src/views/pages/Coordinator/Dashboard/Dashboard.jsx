import React from "react";
import DashboardTemplate from "../../../templates/DashboardTemplate/DashboardTemplate";

function CoordinatorDashboard() {
  return (
    <DashboardTemplate>
      <div className="rounded d-flex justify-content-between flex-wrap align-items-center">
        <div>
          <h5>Supervisors</h5>
          <p>Showing all supervisors</p>
        </div>
        <input type="text" placeholder="Search for supervisors" />
      </div>
    </DashboardTemplate>
  );
}

export default CoordinatorDashboard;
