import { Fragment } from "react";
import ReactLoaderSpinner from "react-loader-spinner";

function Loader({ show }) {
  return (
    <Fragment>
      {show && (
        <div className="d-flex justify-content-center align-items-center my-5">
          <ReactLoaderSpinner
            type="Circles"
            color="#00BFFF"
            height={100}
            width={100}
          />
        </div>
      )}
    </Fragment>
  );
}

export default Loader;
