import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import NotFound from "./views/pages/NotFound";
import ErrorBoundary from "./components/ErrorBoundary";
import StudentSignup from "./views/pages/Student/Signup/Signup";
import StudentLogin from "./views/pages/Student/Login/Login";
import AvatarUpload from "./views/pages/Student/AvatarUpload/AvatarUpload";
import ProjectDetails from "./views/pages/Student/ProjectDetails/ProjectDetails";
import SupervisorPairing from "./views/pages/Student/SupervisorPairing/SupervisorPairing";
import ProjectApproved from "./views/pages/Student/ProjectApproved/ProjectApproved";

const Routes = () => {
  return (
    <div className="App">
      <Router>
        <ErrorBoundary>
          <Switch>
            <Route path="/" exact component={StudentSignup} />
            <Route path="/login" component={StudentLogin} />
            <Route path="/profile/avatar" component={AvatarUpload} />
            <Route path="/project/setup" component={ProjectDetails} />
            <Route path="/project/pairing" component={SupervisorPairing} />
            <Route path="/project/status" component={ProjectApproved} />
            <Route path="*" component={NotFound} />
          </Switch>
        </ErrorBoundary>
      </Router>
    </div>
  );
};

export default Routes;
