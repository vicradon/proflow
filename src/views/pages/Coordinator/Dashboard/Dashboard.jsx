import React from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import DashboardTemplate from "../../../templates/DashboardTemplate/DashboardTemplate";
import Images from "../../../../components/Images.js";
import styles from "./styles.module.css";

function CoordinatorDashboard() {
  return (
    <DashboardTemplate>
      <div className="mx-4">
        <div className="rounded d-flex justify-content-between flex-wrap align-items-center">
          <div className="m-5 d-flex justify-content-center bg-white px-5 py-2 w-100 mx-auto align-items-center">
            <div>
              <h5 className="text-primary">Supervisors</h5>
              <p>Showing all supervisors</p>
            </div>
            <input
              type="text"
              class="form-control ml-3"
              placeholder="Search for Supervisors"
            />

            <label class="ml-4" for="exampleFormControlSelect1">
              Filter:
            </label>
            <select
              class="form-control ml-4"
              placeholder="All Categories"
              id="exampleFormControlSelect1"
            >
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
            </select>
          </div>
        </div>
        <div className={styles.cards}>
          <div
            className={
              "d-flex flex-column p-5 justify-content-center text-center align-content-center m-2 bg-white " +
              styles.checkrel
            }
          >
            <div className={styles.groupcard}>Telecom</div>
            <img
              src={Images.CordAvatar}
              className="rounded-circle mx-auto w-50"
            ></img>
            <h3>Dr. Chika Ebele</h3>
            <p>Students: 17</p>
            <Link to="#">View Details</Link>
          </div>
          <div
            className={
              "d-flex flex-column p-5 justify-content-center text-center align-content-center m-2 bg-white " +
              styles.checkrel
            }
          >
            <div className={styles.groupcard}>Telecom</div>{" "}
            <img
              src={Images.CordAvatar}
              className="rounded-circle mx-auto w-50"
            ></img>
            <h3>Dr. Chika Ebele</h3>
            <p>Students: 17</p>
            <Link to="#">View Details</Link>
          </div>
          <div
            className={
              "d-flex flex-column p-5 justify-content-center text-center align-content-center m-2 bg-white " +
              styles.checkrel
            }
          >
            <div className={styles.groupcard}>Telecom</div>{" "}
            <img
              src={Images.CordAvatar}
              className="rounded-circle mx-auto w-50"
            ></img>
            <h3>Dr. Chika Ebele</h3>
            <p>Students: 17</p>
            <Link to="#">View Details</Link>
          </div>
          <div
            className={
              "d-flex flex-column p-5 justify-content-center text-center align-content-center m-2 bg-white " +
              styles.checkrel
            }
          >
            <div className={styles.groupcard}>Research</div>
            <img
              src={Images.CordAvatar}
              className="rounded-circle mx-auto w-50"
            ></img>
            <h3>Dr. Chika Ebele</h3>
            <p>Students: 17</p>
            <Link to="#">View Details</Link>
          </div>
        </div>
      </div>
    </DashboardTemplate>
  );
}

export default CoordinatorDashboard;
