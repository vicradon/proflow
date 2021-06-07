import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import GeneralTemplate from "../templates/GeneralTemplate/GeneralTemplate";

function SigninOption() {
  return (
    <GeneralTemplate>
      <h3 className="text-center">Sign in as</h3>

      <div className="d-flex justify-content-center">
        <Link to="/student/signup">
          <Button className="mx-2">Student</Button>
        </Link>
        <Link to="/coordinator/signup">
          <Button className="mx-2">Coordinator</Button>
        </Link>
      </div>
    </GeneralTemplate>
  );
}

export default SigninOption;
