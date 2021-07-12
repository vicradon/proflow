import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import moment from "moment";
import maxios from "../../../../utils/maxios";
import DashboardTemplate from "../../../templates/DashboardTemplate/DashboardTemplate";
import styles from "./RecentProposals.module.css";
import Images from "../../../../components/Images";
import Loader from "../../../../components/Loader";

function RecentProposal() {
  const { proposal_id } = useParams();
  const [proposal, setProposal] = useState({});
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetchProposal();
  }, []);

  const fetchProposal = async () => {
    try {
      const { data } = await maxios.get("/recent-proposals/" + proposal_id);

      setLoading(false);
      setProposal(data);
    } catch (error) {}
  };

  const avatarUrl = proposal.student.user.avatar_url ?? Images.DefaultAvatar;

  return (
    <DashboardTemplate>
      <Loader show={loading} />
      <div className={"rounded bg-white shadow p-4 mx-4"}>
        <div className="d-flex" key={proposal.id}>
          <img
            className="my-3 rounded-circle"
            width="100px"
            height="100px"
            alt={proposal.student.user.name}
            src={avatarUrl}
          />

          <div>
            <h5>{proposal.student.user.name}</h5>
            <p>{moment(proposal.created_at).format("DD MMMM YYYY hh:mm A")}</p>
          </div>
        </div>

        <div>
          <p>Project Name</p>
          <h5>{proposal.name}</h5>

          <p>Project Description</p>
          <h5>{proposal.description}</h5>

          <p>Project Category</p>
          <div>{proposal.project_category.name}</div>
        </div>
      </div>
    </DashboardTemplate>
  );
}

export default RecentProposal;
