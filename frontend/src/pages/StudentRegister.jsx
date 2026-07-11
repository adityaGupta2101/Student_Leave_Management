import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";

function StudentRegister() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    rollNo: "",
    department: "",
    semester: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await API.post("/students/register", formData);

      alert(response.data.message);

      navigate("/login");

    } catch (error) {
      alert(error.response?.data?.message || "Registration Failed");
    }
  };

  return (
    <div className="container py-5">

      <div className="row justify-content-center">

        <div className="col-md-6">

          <div className="card shadow">

            <div className="card-header bg-primary text-white">
              <h3 className="text-center">Student Registration</h3>
            </div>

            <div className="card-body">

              <form onSubmit={handleSubmit}>

                <div className="mb-3">
                  <label>Name</label>

                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label>Email</label>

                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
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

                <div className="mb-3">
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

                <div className="mb-3">
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

                <div className="mb-4">
                  <label>Password</label>

                  <input
                    type="password"
                    className="form-control"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </div>

                <button
                  className="btn btn-primary w-100"
                  type="submit"
                >
                  Register
                </button>

              </form>

              <div className="text-center mt-3">

                Already have an account?

                <Link
                  to="/login"
                  className="text-decoration-none ms-2"
                >
                  Login
                </Link>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default StudentRegister;