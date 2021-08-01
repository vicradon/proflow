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
import CreateProjectCategory from "./views/pages/Coordinator/ProjectCategories/CreateProjectCategory";
import ProjectCategories from "./views/pages/Coordinator/ProjectCategories/ProjectCategories";
import SupervisorLogin from "./views/pages/Supervisor/Login/Login";
import LandingPage from "./views/pages/LandingPage";
import SupervisorDashboard from "./views/pages/Supervisor/Dashboard/Dashboard";
import ProjectUpload from "./views/pages/Student/ProjectUpload/ProjectUpload";
import { useContext, useEffect } from "react";
import { Context } from "./store";
import RecentProposals from "./views/pages/Supervisor/RecentProposals/RecentProposals";
import RecentProposal from "./views/pages/Supervisor/RecentProposals/RecentProposal";
import StudentProject from "./views/pages/Supervisor/StudentProject/StudentProject";
import StudentProjectChapter from "./views/pages/Supervisor/StudentProject/StudentProjectChapter";
import SupervisorStudents from "./views/pages/Coordinator/SupervisorStudents/SupervisorStudents";
import ProjectChapter from "./views/pages/Student/ProjectChapter/ProjectChapter";
import PasswordUpdate from "./views/pages/Supervisor/Profile/PasswordUpdate";
import CoordinatorStudents from "./views/pages/Coordinator/Students/Students";

const RoleRoute = ({ component: Component, path, ...others }) => {
  const role = localStorage.getItem("role");
  const roleFromPath = path.split("/")[1];
  return (
    <Route
      path={path}
      render={() => (role === roleFromPath ? <Component /> : <NotFound />)}
      {...others}
    />
  );
};

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
            <Route path="/student/login" component={StudentLogin} />{" "}
            {/* Student login */}
            <RoleRoute
              path="/student/dashboard"
              component={StudentDashboard}
            />{" "}
            {/* Student's dashboard with their chapters */}
            <RoleRoute
              path="/student/profile/avatar"
              component={AvatarUpload}
            />{" "}
            {/* Student profile upload */}
            <RoleRoute
              path="/student/password-update"
              component={PasswordUpdate}
            />
            <RoleRoute
              path="/student/project/setup"
              component={ProjectDetails}
            />{" "}
            {/* Student project setup */}
            <RoleRoute
              path="/student/project/upload"
              component={ProjectUpload}
            />{" "}
            {/* Student's project PDF upload */}
            <RoleRoute
              path="/student/project/chapters/:chapter_id"
              component={ProjectDetails}
            />{" "}
            {/* Student's chapter view with all pages */}
            <RoleRoute
              path="/student/project/status"
              component={ProjectStatus}
            />{" "}
            {/* Student's project status. Whether the project has been accepted or not */}
            <RoleRoute
              path="/student/chapters/:chapter_id"
              component={ProjectChapter}
            />{" "}
            {/* Student's single chapter view */}
            {/* Supervisor Routes */}
            <Route
              path="/supervisor/login"
              exact
              component={SupervisorLogin}
            />{" "}
            {/* Supervisor's login */}
            <RoleRoute
              path="/supervisor/password-update"
              component={PasswordUpdate}
            />{" "}
            {/* Supervisor's password update view */}
            <RoleRoute
              path="/supervisor/avatar-upload"
              component={AvatarUpload}
            />{" "}
            {/* Supervisor's avatar upload */}
            <RoleRoute
              path="/supervisor/dashboard"
              component={SupervisorDashboard}
            />{" "}
            {/* Supervisor's dashboard with students assigned to him */}
            <RoleRoute
              path="/supervisor/recent-proposals"
              exact
              component={RecentProposals}
            />{" "}
            {/* Supervisor's view of all recent proposals */}
            <RoleRoute
              path="/supervisor/recent-proposals/:proposal_id"
              exact
              component={RecentProposal}
            />{" "}
            {/* Supervisor's view of a single student's proposals */}
            <RoleRoute
              path="/supervisor/students/:student_id"
              exact
              component={StudentProject}
            />{" "}
            {/* Supervisor viewing a student's chapters */}
            <RoleRoute
              path="/supervisor/students/:student_id/chapters/:chapter_id"
              exact
              component={StudentProjectChapter}
            />{" "}
            {/* Supervisor view of a student's chapter */}
            {/* Coordinator Routes */}
            <Route
              path="/coordinator/signup"
              component={CoordinatorSignup}
            />{" "}
            {/* Coordinator Signup */}
            <Route
              path="/coordinator/login"
              component={CoordinatorLogin}
            />{" "}
            {/* Coordinator login */}
            <RoleRoute
              path="/coordinator/students"
              component={CoordinatorStudents}
              exact
            />
            <RoleRoute
              path="/coordinator/project-categories"
              component={ProjectCategories}
              exact
            />{" "}
            {/* Viewing available project categories */}
            <RoleRoute
              path="/coordinator/project-categories/add"
              component={CreateProjectCategory}
              exact
            />{" "}
            {/* Creating a new project category */}
            <RoleRoute
              exact
              path="/coordinator/dashboard"
              component={CoordinatorDashboard}
            />{" "}
            {/* Coordinator's Dashboard view */}
            <RoleRoute
              path="/coordinator/supervisors/:supervisor_id/students"
              component={SupervisorStudents}
            />{" "}
            {/* Coordinator Viewing Supervisor Students  */}
            <Route path="*" component={NotFound} />
          </Switch>
        </ErrorBoundary>
      </Router>
    </div>
  );
};

export default Routes;
