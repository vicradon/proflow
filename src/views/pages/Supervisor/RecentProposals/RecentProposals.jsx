import { useState, useEffect } from "react";
import maxios from "../../../../utils/maxios";
import DashboardTemplate from "../../../templates/DashboardTemplate/DashboardTemplate";
import moment from "moment";
import styles from "./RecentProposals.module.css";
import Images from "../../../../components/Images";
import { Link } from "react-router-dom";
import Loader from "../../../../components/Loader";

function RecentProposals() {
  const [proposals, setProposals] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetchProposals();
  }, []);

  const fetchProposals = async () => {
    try {
      const { data: recent_proposals } = await maxios.get("/recent-proposals");
      setLoading(false);
      setProposals(recent_proposals.data);
    } catch (error) {
      setLoading(false);
      setError("An error occured, probably a failed network request");
    }
  };
  return (
    <DashboardTemplate>
      <Loader show={loading} error={error} />
      {!proposals.length && !loading && (
        <p className="text-center">No recent proposals</p>
      )}
      <div className={styles.proposals_grid + " mx-4"}>
        {proposals.map((proposal) => {
          const avatarUrl =
            proposal.student.user.avatar_url ?? Images.DefaultAvatar;
          return (
            <Link
              className="text-body"
              to={"/supervisor/recent-proposals/" + proposal.id}
              key={proposal.id}
            >
              <div className="rounded bg-white shadow p-4 d-flex justify-content-between">
                <img
                  className="my-3 rounded-circle"
                  width="100px"
                  height="100px"
                  alt={proposal.student.user.name}
                  src={avatarUrl}
                />

                <div>
                  <h5>{proposal.student.user.name}</h5>
                  <p>
                    {moment(proposal.created_at).format("DD MMMM YYYY hh:mm A")}
                  </p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </DashboardTemplate>
  );
}

export default RecentProposals;
