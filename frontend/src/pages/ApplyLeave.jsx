import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

function ApplyLeave() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    studentName: "",
    rollNo: "",
    department: "",
    semester: "",
    leaveType: "",
    reason: "",
    fromDate: "",
    toDate: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login first.");
      navigate("/login");
      return;
    }

    try {
      const response = await API.post("/leaves", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert(response.data.message);

      setFormData({
        studentName: "",
        rollNo: "",
        department: "",
        semester: "",
        leaveType: "",
        reason: "",
        fromDate: "",
        toDate: "",
      });

      navigate("/status");

    } catch (error) {
      alert(error.response?.data?.message || "Failed to submit leave.");
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">

        <div className="col-lg-8">

          <div className="card shadow">

            <div className="card-header bg-primary text-white">
              <h3>Student Leave Application</h3>
            </div>

            <div className="card-body">

              <form onSubmit={handleSubmit}>

                <div className="row">

                  <div className="col-md-6 mb-3">
                    <label>Student Name</label>

                    <input
                      type="text"
                      className="form-control"
                      name="studentName"
                      value={formData.studentName}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="col-md-6 mb-3">
                    <label>Roll Number</label>

                    <input
                      type="text"
                      className="form-control"
                      name="rollNo"
                      value={formData.rollNo}
                      onChange={handleChange}
                      required
                    />
                  </div>

                </div>

                <div className="row">

                  <div className="col-md-6 mb-3">
                    <label>Department</label>

                    <input
                      type="text"
                      className="form-control"
                      name="department"
                      value={formData.department}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="col-md-6 mb-3">
                    <label>Semester</label>

                    <input
                      type="number"
                      className="form-control"
                      name="semester"
                      value={formData.semester}
                      onChange={handleChange}
                      required
                    />
                  </div>

                </div>

                <div className="mb-3">

                  <label>Leave Type</label>

                  <select
                    className="form-select"
                    name="leaveType"
                    value={formData.leaveType}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Leave Type</option>
                    <option value="Medical">Medical</option>
                    <option value="Personal">Personal</option>
                    <option value="Emergency">Emergency</option>
                    <option value="Casual">Casual</option>
                  </select>

                </div>

                <div className="mb-3">

                  <label>Reason</label>

                  <textarea
                    rows="4"
                    className="form-control"
                    name="reason"
                    value={formData.reason}
                    onChange={handleChange}
                    required
                  />

                </div>

                <div className="row">

                  <div className="col-md-6 mb-3">

                    <label>From Date</label>

                    <input
                      type="date"
                      className="form-control"
                      name="fromDate"
                      value={formData.fromDate}
                      onChange={handleChange}
                      required
                    />

                  </div>

                  <div className="col-md-6 mb-3">

                    <label>To Date</label>

                    <input
                      type="date"
                      className="form-control"
                      name="toDate"
                      value={formData.toDate}
                      onChange={handleChange}
                      required
                    />

                  </div>

                </div>

                <button
                  className="btn btn-primary w-100"
                  type="submit"
                >
                  Submit Leave
                </button>

              </form>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
}

export default ApplyLeave;