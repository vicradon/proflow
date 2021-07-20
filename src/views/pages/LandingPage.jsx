import { useEffect, useState, useContext, Fragment } from "react";
import { Link, useHistory } from "react-router-dom";
import { Button } from "react-bootstrap";
import LoadingPage from "./Shared/LoadingPage";
import GeneralTemplate from "../templates/GeneralTemplate/GeneralTemplate";
import maxios from "../../utils/maxios";
import { Context } from "../../store";

function LandingPage() {
  const history = useHistory();
  const [loading, setLoading] = useState(true);
  const role = localStorage.getItem("role");
  const { state } = useContext(Context);
  const isAuthenticated = localStorage.getItem("jwt");

  useEffect(() => {
    if (isAuthenticated) {
      if (role) {
        if (role === "student") {
          // check if project has been approved
          handleProjectApproval();
        } else {
          history.push(`/${role}/dashboard`);
        }
      } else {
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  }, []);

  const handleProjectApproval = async () => {
    try {
      const { data: project_data } = await maxios.get(
        `/project-status?with_avatar_url`
      );

      if (!project_data.avatar_url) {
        history.push("/student/profile/avatar");
      } else {
        switch (project_data.status) {
          case "approved": {
            history.push("/student/dashboard");
            break;
          }
          case null: {
            history.push("/student/project/setup");
          }
          default: {
            history.push("/student/project/status");
            break;
          }
        }
      }
    } catch (error) {
      setLoading(false);
    }
  };

  {
    return loading ? (
      <LoadingPage />
    ) : (
      <GeneralTemplate>
        {!isAuthenticated && (
          <Fragment>
            <h3 className="text-center">Sign up as</h3>

            <div className="d-flex justify-content-center">
              <Link to="/student/signup">
                <Button className="mx-2">Student</Button>
              </Link>
              <Link to="/coordinator/signup">
                <Button className="mx-2">Coordinator</Button>
              </Link>
            </div>
          </Fragment>
        )}
        {state.user.isAuthenticated && (
          <div>
            <h3 className="text-center">Welcome to Proflow</h3>
          </div>
        )}
      </GeneralTemplate>
    );
  }
}

export default LandingPage;
