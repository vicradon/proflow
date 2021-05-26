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
import AvatarUpload from "./views/pages/Student/AvatarUpload/AvatarUpload";
import ProjectDetails from "./views/pages/Student/ProjectDetails/ProjectDetails";
import SupervisorPairing from "./views/pages/Student/SupervisorPairing/SupervisorPairing";
import ProjectApproved from "./views/pages/Student/ProjectApproved/ProjectApproved";
import CoordinatorSignup from "./views/pages/Coordinator/Signup/Signup";
import CoordinatorLogin from "./views/pages/Coordinator/login/login";
import SupervisorLogin from "./views/pages/Supervisor/Login/Login";
import CoordinatorDashboard from "./views/pages/Coordinator/Dashboard/Dashboard";

const Routes = () => {
  return (
    <div className="App">
      <Router>
        <ErrorBoundary>
          <Switch>
            <Route path="/" exact component={StudentSignup} />
            <Route path="/student/signup" exact component={StudentSignup} />
            <Route path="/student/login" component={StudentLogin} />
            <Route path="/coordinator/signup" component={CoordinatorSignup} />
            <Route path="/coordinator/login" component={CoordinatorLogin} />
            <Route path="/coordinator/login" component={CoordinatorLogin} />
            <Route path="/supervisor/login" component={SupervisorLogin} />
            <Route path="/profile/avatar" component={AvatarUpload} />
            <Route path="/project/setup" component={ProjectDetails} />
            <Route path="/project/pairing" component={SupervisorPairing} />
            <Route path="/project/status" component={ProjectApproved} />

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
