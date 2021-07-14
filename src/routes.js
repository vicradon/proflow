import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import "./App.css";
import NotFound from "./views/pages/NotFound";
import ErrorBoundary from "./components/ErrorBoundary";
import StudentSignup from "./views/pages/Student/Signup/Signup";
import StudentLogin from "./views/pages/Student/Login/Login";
import StudentDashboard from "./views/pages/Student/Dashboard/Dashboard";
import AvatarUpload from "./views/pages/Student/AvatarUpload/AvatarUpload";
import ProjectDetails from "./views/pages/Student/ProjectDetails/ProjectDetails";
import SupervisorPairing from "./views/pages/Student/SupervisorPairing/SupervisorPairing";
import ProjectStatus from "./views/pages/Student/ProjectStatus/ProjectStatus";
import CoordinatorSignup from "./views/pages/Coordinator/Signup/Signup";
import CoordinatorLogin from "./views/pages/Coordinator/Login/Login";
import CoordinatorDashboard from "./views/pages/Coordinator/Dashboard/Dashboard";
import ProjectCategory from "./views/pages/Coordinator/ProjectCategory/ProjectCategory";
import SupervisorLogin from "./views/pages/Supervisor/Login/Login";
import LandingPage from "./views/pages/LandingPage";
import SupervisorDashboard from "./views/pages/Supervisor/Dashboard/Dashboard";
import ProjectUpload from "./views/pages/Student/ProjectUpload/ProjectUpload";
import { useContext, useEffect } from "react";
import { Context } from "./store";
import RecentProposals from "./views/pages/Supervisor/RecentProposals/RecentProposals";
import RecentProposal from "./views/pages/Supervisor/RecentProposals/RecentProposal";

const Routes = () => {
  const { dispatch } = useContext(Context);
  const isAuthenticated = localStorage.getItem("jwt");

  useEffect(() => {
    if (isAuthenticated) {
      dispatch({ type: "SET_AUTHENTICATED" });
    } else {
      dispatch({ type: "SET_UNAUTHENTICATED" });
    }
  }, []);

  return (
    <div className="App">
      <Router>
        <ErrorBoundary>
          <Switch>
            <Route path="/" exact component={LandingPage} />

            {/* Student Routes */}
            <Route path="/student/signup" exact component={StudentSignup} />
            <Route path="/student/login" component={StudentLogin} />
            <Route path="/student/dashboard" component={StudentDashboard} />
            <Route path="/student/profile/avatar" component={AvatarUpload} />
            <Route path="/student/project/setup" component={ProjectDetails} />
            <Route path="/student/project/upload" component={ProjectUpload} />
            <Route
              path="/student/project/chapters/:chapter_id"
              component={ProjectDetails}
            />
            <Route
              path="/student/project/pairing/:supervisor_id"
              component={SupervisorPairing}
            />
            <Route path="/student/project/status" component={ProjectStatus} />

            {/* Supervisor Routes */}
            <Route path="/supervisor/login" component={SupervisorLogin} />
            <Route
              path="/supervisor/dashboard"
              component={SupervisorDashboard}
            />
            <Route
              path="/supervisor/recent-proposals"
              exact
              component={RecentProposals}
            />
            <Route
              path="/supervisor/recent-proposals/:proposal_id"
              exact
              component={RecentProposal}
            />
            <Route
              path="/supervisor/students/:student_id"
              exact
              component={RecentProposal}
            />

            {/* Coordinator Routes */}
            <Route path="/coordinator/signup" component={CoordinatorSignup} />
            <Route path="/coordinator/login" component={CoordinatorLogin} />
            <Route
              path="/coordinator/project/add"
              component={ProjectCategory}
            />
            <Route path="/coordinator/login" component={CoordinatorLogin} />
            <Route
              path="/coordinator/dashboard"
              component={CoordinatorDashboard}
            />
            <Route
              path="/coordinator/dashboard/supervisors"
              component={CoordinatorDashboard}
            />

            <Route path="*" component={NotFound} />
          </Switch>
        </ErrorBoundary>
      </Router>
    </div>
  );
};

export default Routes;
