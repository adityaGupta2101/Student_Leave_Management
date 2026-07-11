import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function Status() {
  const navigate = useNavigate();

  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMyLeaves();
  }, []);

  const fetchMyLeaves = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login first.");
      navigate("/login");
      return;
    }

    try {
      const response = await API.get("/leaves/my-leaves", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setLeaves(response.data.leaves);
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Failed to load leave status.");
    } finally {
      setLoading(false);
    }
  };

  const getBadge = (status) => {
    switch (status) {
      case "Approved":
        return "success";

      case "Rejected":
        return "danger";

      default:
        return "warning";
    }
  };

  return (
    <div className="container py-5">

      <h2 className="text-center text-primary mb-4">
        My Leave Status
      </h2>

      {loading ? (
        <div className="text-center">
          <h4>Loading...</h4>
        </div>
      ) : leaves.length === 0 ? (
        <div className="alert alert-info text-center">
          No Leave Requests Found.
        </div>
      ) : (
        <div className="card shadow">

          <div className="card-body">

            <table className="table table-bordered table-hover">

              <thead className="table-dark">
                <tr>
                  <th>#</th>
                  <th>Leave Type</th>
                  <th>Reason</th>
                  <th>From</th>
                  <th>To</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>

                {leaves.map((leave, index) => (
                  <tr key={leave._id}>

                    <td>{index + 1}</td>

                    <td>{leave.leaveType}</td>

                    <td>{leave.reason}</td>

                    <td>
                      {new Date(leave.fromDate).toLocaleDateString()}
                    </td>

                    <td>
                      {new Date(leave.toDate).toLocaleDateString()}
                    </td>

                    <td>
                      <span
                        className={`badge bg-${getBadge(
                          leave.status
                        )}`}
                      >
                        {leave.status}
                      </span>
                    </td>

                  </tr>
                ))}

              </tbody>

            </table>

          </div>

        </div>
      )}
    </div>
  );
}

export default Status;