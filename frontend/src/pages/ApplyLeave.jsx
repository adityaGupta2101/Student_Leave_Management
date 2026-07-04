import { useState } from "react";
import API from "../services/api";


function ApplyLeave() {
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

  // Handle input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Temporary submit function
  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await API.post("/leaves", formData);

    alert(response.data.message);

    console.log(response.data);

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

  } catch (error) {
    console.error(error);

    alert("Failed to submit leave.");
  }
};

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">

          <div className="card shadow">

            <div className="card-header bg-primary text-white">
              <h3 className="mb-0">Student Leave Application</h3>
            </div>

            <div className="card-body">

              <form onSubmit={handleSubmit}>

                {/* Student Name & Roll Number */}
                <div className="row">

                  <div className="col-md-6 mb-3">
                    <label className="form-label">Student Name</label>

                    <input
                      type="text"
                      className="form-control"
                      name="studentName"
                      placeholder="Enter your name"
                      value={formData.studentName}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col-md-6 mb-3">
                    <label className="form-label">Roll Number</label>

                    <input
                      type="text"
                      className="form-control"
                      name="rollNo"
                      placeholder="Enter Roll Number"
                      value={formData.rollNo}
                      onChange={handleChange}
                    />
                  </div>

                </div>

                {/* Department & Semester */}
                <div className="row">

                  <div className="col-md-6 mb-3">
                    <label className="form-label">Department</label>

                    <input
                      type="text"
                      className="form-control"
                      name="department"
                      placeholder="Enter Department"
                      value={formData.department}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col-md-6 mb-3">
                    <label className="form-label">Semester</label>

                    <input
                      type="number"
                      className="form-control"
                      name="semester"
                      placeholder="Semester"
                      value={formData.semester}
                      onChange={handleChange}
                    />
                  </div>

                </div>

                {/* Leave Type */}
                <div className="mb-3">
                  <label className="form-label">Leave Type</label>

                  <select
                    className="form-select"
                    name="leaveType"
                    value={formData.leaveType}
                    onChange={handleChange}
                  >
                    <option value="">Select Leave Type</option>
                    <option value="Medical">Medical</option>
                    <option value="Personal">Personal</option>
                    <option value="Emergency">Emergency</option>
                    <option value="Casual">Casual</option>
                  </select>

                </div>

                {/* Reason */}
                <div className="mb-3">
                  <label className="form-label">Reason</label>

                  <textarea
                    rows="4"
                    className="form-control"
                    name="reason"
                    placeholder="Enter Reason"
                    value={formData.reason}
                    onChange={handleChange}
                  ></textarea>

                </div>

                {/* Dates */}
                <div className="row">

                  <div className="col-md-6 mb-3">
                    <label className="form-label">From Date</label>

                    <input
                      type="date"
                      className="form-control"
                      name="fromDate"
                      value={formData.fromDate}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col-md-6 mb-3">
                    <label className="form-label">To Date</label>

                    <input
                      type="date"
                      className="form-control"
                      name="toDate"
                      value={formData.toDate}
                      onChange={handleChange}
                    />
                  </div>

                </div>

                <button
                  type="submit"
                  className="btn btn-primary w-100"
                >
                  Submit Leave Request
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