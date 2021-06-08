import React from "react";
import { Button, Spinner } from "react-bootstrap";

function SubmitButton({ children, disabled, ...remainingProps }) {
  return (
    <Button type="submit" disabled={disabled} {...remainingProps}>
      {disabled && (
        <Spinner className="mr-2" animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      )}
      <span>{children || "Submit"}</span>
    </Button>
  );
}

export default SubmitButton;
