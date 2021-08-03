import React from "react";
import Loader from "react-loader-spinner";
import styles from "./Shared.module.css";
import Images from "../../../components/Images";

function LoadingPage() {
  return (
    <div
      className={
        styles.root + " w-100 d-flex justify-content-center align-items-center"
      }
    >
      <div className="d-flex flex-column justify-content-center align-items-center">
        {/* <img className="mb-4" src={Images.TextLogo} alt="logo" /> */}
        <h2>Undergraduate Project Supervision</h2>
        <Loader type="Circles" color="#00BFFF" height={100} width={100} />
      </div>
    </div>
  );
}

export default LoadingPage;
