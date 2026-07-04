import { useEffect, useState } from "react";
import API from "../services/api";

function AdminDashboard() {
  const [leaves, setLeaves] = useState([]);

  useEffect(() => {
    fetchLeaves();
  }, []);

  // Fetch all leave requests
  const fetchLeaves = async () => {
    try {
      const response = await API.get("/leaves");
      setLeaves(response.data.leaves);
    } catch (error) {
      console.error("Error fetching leaves:", error);
    }
  };

  // Approve Leave
  const approveLeave = async (id) => {
    try {
      await API.patch(`/leaves/${id}/approve`);

      alert("Leave Approved Successfully");

      fetchLeaves();
    } catch (error) {
      console.error(error);
      alert("Failed to approve leave");
    }
  };

  // Reject Leave
  const rejectLeave = async (id) => {
    try {
      await API.patch(`/leaves/${id}/reject`);

      alert("Leave Rejected Successfully");

      fetchLeaves();
    } catch (error) {
      console.error(error);
      alert("Failed to reject leave");
    }
  };

  // Delete Leave
  const deleteLeave = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this leave request?"
    );

    if (!confirmDelete) return;

    try {
      await API.delete(`/leaves/${id}`);

      alert("Leave Deleted Successfully");

      fetchLeaves();
    } catch (error) {
      console.error(error);
      alert("Failed to delete leave");
    }
  };

  // Dashboard Statistics
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
    <div className="container py-5">

      {/* Heading */}
      <h1 className="mb-4">Admin Dashboard</h1>

      {/* Statistics Cards */}
      <div className="row mb-4">

        <div className="col-md-3 mb-3">
          <div className="card bg-primary text-white shadow">
            <div className="card-body">
              <h5>Total Leaves</h5>
              <h2>{totalLeaves}</h2>
            </div>
          </div>
        </div>

        <div className="col-md-3 mb-3">
          <div className="card bg-warning text-dark shadow">
            <div className="card-body">
              <h5>Pending</h5>
              <h2>{pendingLeaves}</h2>
            </div>
          </div>
        </div>

        <div className="col-md-3 mb-3">
          <div className="card bg-success text-white shadow">
            <div className="card-body">
              <h5>Approved</h5>
              <h2>{approvedLeaves}</h2>
            </div>
          </div>
        </div>

        <div className="col-md-3 mb-3">
          <div className="card bg-danger text-white shadow">
            <div className="card-body">
              <h5>Rejected</h5>
              <h2>{rejectedLeaves}</h2>
            </div>
          </div>
        </div>

      </div>

      {/* Leave Table */}
      <div className="table-responsive shadow">

        <table className="table table-bordered table-hover align-middle mb-0">

          <thead className="table-dark">
            <tr>
              <th>S.No</th>
              <th>Student</th>
              <th>Roll No</th>
              <th>Department</th>
              <th>Leave Type</th>
              <th>From Date</th>
              <th>To Date</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>

            {leaves.length === 0 ? (
              <tr>
                <td colSpan="9" className="text-center py-4">
                  No Leave Requests Found
                </td>
              </tr>
            ) : (
              leaves.map((leave, index) => (
                <tr key={leave._id}>

                  <td>{index + 1}</td>

                  <td>{leave.studentName}</td>

                  <td>{leave.rollNo}</td>

                  <td>{leave.department}</td>

                  <td>{leave.leaveType}</td>

                  <td>{leave.fromDate?.substring(0, 10)}</td>

                  <td>{leave.toDate?.substring(0, 10)}</td>

                  <td>
                    {leave.status === "Pending" && (
                      <span className="badge bg-warning text-dark">
                        Pending
                      </span>
                    )}

                    {leave.status === "Approved" && (
                      <span className="badge bg-success">
                        Approved
                      </span>
                    )}

                    {leave.status === "Rejected" && (
                      <span className="badge bg-danger">
                        Rejected
                      </span>
                    )}
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

      </div>

    </div>
  );
}

export default AdminDashboard;