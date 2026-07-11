import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";

function StudentLogin() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
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
      const response = await API.post("/students/login", formData);

      // Save JWT Token
      localStorage.setItem("token", response.data.token);

      // Save Student Details
      localStorage.setItem(
        "student",
        JSON.stringify(response.data.student)
      );

      alert("Login Successful!");

      navigate("/student-dashboard");

    } catch (error) {
      alert(error.response?.data?.message || "Login Failed");
    }
  };

  return (
    <div className="container py-5">

      <div className="row justify-content-center">

        <div className="col-md-5">

          <div className="card shadow">

            <div className="card-header bg-success text-white">
              <h3 className="text-center">Student Login</h3>
            </div>

            <div className="card-body">

              <form onSubmit={handleSubmit}>

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
                  type="submit"
                  className="btn btn-success w-100"
                >
                  Login
                </button>

              </form>

              <div className="text-center mt-3">

                Don't have an account?

                <Link
                  to="/register"
                  className="text-decoration-none ms-2"
                >
                  Register
                </Link>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default StudentLogin;