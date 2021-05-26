import { Component } from "react";
import GeneralTemplate from "../views/templates/GeneralTemplate/GeneralTemplate";
import internalServerErrorImage from "../assets/images/internal-server-error.jpg";
import { Button } from "react-bootstrap";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {}

  render() {
    if (this.state.hasError) {
      return (
        <GeneralTemplate>
          <div className="d-flex flex-column justify-content-center align-items-center">
            <img src={internalServerErrorImage} alt="internal server error" />

            <Button className="my-4" onClick={() => window.location.reload()}>
              Reload
            </Button>
          </div>
        </GeneralTemplate>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
