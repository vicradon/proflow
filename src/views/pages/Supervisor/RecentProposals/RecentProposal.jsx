import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import moment from "moment";
import maxios from "../../../../utils/maxios";
import DashboardTemplate from "../../../templates/DashboardTemplate/DashboardTemplate";
import styles from "./RecentProposals.module.css";
import Images from "../../../../components/Images";
import Loader from "../../../../components/Loader";
import toast from "react-hot-toast";
import SubmitButton from "../../../../components/SubmitButton";

function RecentProposal() {
  const { proposal_id } = useParams();
  const [error, setError] = useState("");
  const [actionSubmitting, setActionSubmitting] = useState({
    approve: false,
    reject: false,
  });

  const [proposal, setProposal] = useState({
    student: { user: {} },
    project_category: {},
  });
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetchProposal();
  }, []);

  const fetchProposal = async () => {
    try {
      const { data } = await maxios.get("/recent-proposals/" + proposal_id);
      setLoading(false);
      setProposal(data.proposal);
    } catch (error) {
      setLoading(false);
      setError(error.response.data.message);
    }
  };

  const avatarUrl = proposal.student.user.avatar_url ?? Images.DefaultAvatar;

  const updateProposal = async (action) => {
    try {
      if (action === "approve") {
        setActionSubmitting({ approve: true, reject: false });
        await maxios.patch(`/recent-proposals/${proposal_id}?action=approve`);
        toast.success("Project Approved Successfully!");
      } else if (action === "reject") {
        setActionSubmitting({ approve: false, reject: true });
        await maxios.patch(`/recent-proposals/${proposal_id}?action=reject`);
        toast.success("This project has been rejected");
      }
      setActionSubmitting({ approve: false, reject: false });
    } catch (error) {
      setActionSubmitting({ approve: false, reject: false });
      setError(error.response.data.message);
    }
  };

  return (
    <DashboardTemplate>
      <Loader error={error} show={loading} />

      <div className={"rounded bg-white shadow p-4 mx-4"}>
        <div className="d-flex align-items-center" key={proposal.id}>
          <img
            className="my-3 rounded-circle"
            width="100px"
            height="100px"
            alt={proposal.student.user.name}
            src={avatarUrl}
          />

          <div className="ml-3">
            <h5>{proposal.student.user.name}</h5>
            <p>{moment(proposal.created_at).format("DD MMMM YYYY hh:mm A")}</p>
          </div>
        </div>

        <div className="mb-4">
          <div className="mb-3">
            <p className="mb-0 text-primary">Project Name</p>
            <h5>{proposal.name}</h5>
          </div>

          <div className="mb-3">
            <p className="mb-0 text-primary">Project Description</p>
            <h5>{proposal.description}</h5>
          </div>

          <div className="mb-3">
            <p className="mb-0 text-primary">Project Category</p>
            <div
              style={{ width: "40px" }}
              className="bg-info rounded px-1 text-white text-center"
            >
              {proposal.project_category.name}
            </div>
          </div>
        </div>

        <div className="mb-4">
          <p className="mb-0 text-primary">Action</p>

          <SubmitButton
            onClick={() => updateProposal("approve")}
            className="btn-sm mr-3"
            disabled={actionSubmitting.approve}
          >
            Approve &#10003;
          </SubmitButton>
          <SubmitButton
            onClick={() => updateProposal("reject")}
            variant="danger"
            className="btn-sm"
            disabled={actionSubmitting.reject}
          >
            Reject &#10005;
          </SubmitButton>
        </div>
      </div>
    </DashboardTemplate>
  );
}

export default RecentProposal;
