import React, { useState, useEffect } from "react";
import Loader from "../../../../components/Loader";
import DashboardTemplate from "../../../templates/DashboardTemplate/DashboardTemplate";
import maxios from "../../../../utils/maxios";

function ProjectCategories() {
  const [projectCategories, setProjectCategories] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjectCategories();
  }, []);

  const fetchProjectCategories = async () => {
    try {
      const { data } = await maxios.get("/project-categories");

      setProjectCategories(data.project_categories);
      setLoading(false);
    } catch (error) {
      setError(error.response.data.message);
      setLoading(false);
    }
  };

  return (
    <DashboardTemplate>
      <div className="mx-4">
        <h3>Project Categories</h3>
        <Loader show={loading} />

        {!projectCategories.length && !loading && (
          <p className="text-center">No Project Categories</p>
        )}

        <ol>
          {projectCategories.map((projectCategory) => (
            <li key={projectCategory.id}>{projectCategory.name}</li>
          ))}
        </ol>
      </div>
    </DashboardTemplate>
  );
}

export default ProjectCategories;
