import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function AdminDashboard() {
  const navigate = useNavigate();

  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(true);

  // ==========================
  // Check Admin Login
  // ==========================
  useEffect(() => {
    const isAdmin = localStorage.getItem("isAdmin");

    if (isAdmin !== "true") {
      alert("Access Denied! Please Login as Admin.");
      navigate("/admin-login");
    } else {
      fetchLeaves();
    }
  }, [navigate]);

  // ==========================
  // Fetch All Leaves
  // ==========================
  const fetchLeaves = async () => {
    try {
      const res = await API.get("/leaves");

      setLeaves(res.data.leaves);
      setLoading(false);
    } catch (error) {
      console.log(error);
      alert("Failed to fetch leave requests.");
      setLoading(false);
    }
  };

  // ==========================
  // Approve Leave
  // ==========================
  const approveLeave = async (id) => {
    try {
      await API.patch(`/leaves/${id}/approve`);

      alert("Leave Approved Successfully");

      fetchLeaves();
    } catch (error) {
      console.log(error);
      alert("Unable to approve leave.");
    }
  };

  // ==========================
  // Reject Leave
  // ==========================
  const rejectLeave = async (id) => {
    try {
      await API.patch(`/leaves/${id}/reject`);

      alert("Leave Rejected Successfully");

      fetchLeaves();
    } catch (error) {
      console.log(error);
      alert("Unable to reject leave.");
    }
  };

  // ==========================
  // Delete Leave
  // ==========================
  const deleteLeave = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this leave?"
    );

    if (!confirmDelete) return;

    try {
      await API.delete(`/leaves/${id}`);

      alert("Leave Deleted Successfully");

      fetchLeaves();
    } catch (error) {
      console.log(error);
      alert("Unable to delete leave.");
    }
  };

  // ==========================
  // Logout
  // ==========================
  const logout = () => {
    localStorage.removeItem("isAdmin");
    navigate("/");
  };

  // ==========================
  // Statistics
  // ==========================
  const totalLeaves = leaves.length;
  const pendingLeaves = leaves.filter(
    (leave) => leave.status === "Pending"
  ).length;
  const approvedLeaves = leaves.filter(
    (leave) => leave.status === "Approved"
  ).length;
  const rejectedLeaves = leaves.filter(
    (leave) => leave.status === "Rejected"
  ).length;

  return (
    <div className="container my-5">
      <h2 className="text-primary fw-bold mb-4">Admin Dashboard</h2>

      {/* Statistics */}
      <div className="row mb-4">
        <div className="col-md-3 mb-3">
          <div className="card bg-primary text-white shadow">
            <div className="card-body text-center">
              <h5>Total Leaves</h5>
              <h2>{totalLeaves}</h2>
            </div>
          </div>
        </div>

        <div className="col-md-3 mb-3">
          <div className="card bg-warning text-dark shadow">
            <div className="card-body text-center">
              <h5>Pending</h5>
              <h2>{pendingLeaves}</h2>
            </div>
          </div>
        </div>

        <div className="col-md-3 mb-3">
          <div className="card bg-success text-white shadow">
            <div className="card-body text-center">
              <h5>Approved</h5>
              <h2>{approvedLeaves}</h2>
            </div>
          </div>
        </div>

        <div className="col-md-3 mb-3">
          <div className="card bg-danger text-white shadow">
            <div className="card-body text-center">
              <h5>Rejected</h5>
              <h2>{rejectedLeaves}</h2>
            </div>
          </div>
        </div>
      </div>

      {/* Leave Table */}
      <div className="card shadow">
        <div className="card-header bg-dark text-white">
          <h4 className="mb-0">All Leave Requests</h4>
        </div>

        <div className="card-body table-responsive">
          {loading ? (
            <h5>Loading...</h5>
          ) : (
            <table className="table table-bordered table-hover align-middle">
              <thead className="table-primary">
                <tr>
                  <th>Student</th>
                  <th>Roll No</th>
                  <th>Department</th>
                  <th>Semester</th>
                  <th>Leave Type</th>
                  <th>Reason</th>
                  <th>From</th>
                  <th>To</th>
                  <th>Status</th>
                  <th width="240">Actions</th>
                </tr>
              </thead>

              <tbody>
                {leaves.length === 0 ? (
                  <tr>
                    <td colSpan="10" className="text-center">
                      No Leave Requests Found
                    </td>
                  </tr>
                ) : (
                  leaves.map((leave) => (
                    <tr key={leave._id}>
                      <td>{leave.studentName}</td>
                      <td>{leave.rollNo}</td>
                      <td>{leave.department}</td>
                      <td>{leave.semester}</td>
                      <td>{leave.leaveType}</td>
                      <td>{leave.reason}</td>
                      <td>{leave.fromDate?.substring(0, 10)}</td>
                      <td>{leave.toDate?.substring(0, 10)}</td>

                      <td>
                        <span
                          className={`badge ${
                            leave.status === "Approved"
                              ? "bg-success"
                              : leave.status === "Rejected"
                              ? "bg-danger"
                              : "bg-warning text-dark"
                          }`}
                        >
                          {leave.status}
                        </span>
                      </td>

                      <td>
                        <button
                          className="btn btn-success btn-sm me-2"
                          onClick={() => approveLeave(leave._id)}
                        >
                          Approve
                        </button>

                        <button
                          className="btn btn-warning btn-sm me-2"
                          onClick={() => rejectLeave(leave._id)}
                        >
                          Reject
                        </button>

                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => deleteLeave(leave._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>

      <button className="btn btn-danger mt-4" onClick={logout}>
        Logout
      </button>
    </div>
  );
}

export default AdminDashboard;