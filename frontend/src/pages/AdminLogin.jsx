import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function AdminLogin() {
  const [adminId, setAdminId] = useState("");
  const navigate = useNavigate();

  // Apna secret admin ID yahan change kar sakte ho 
  const ADMIN_ID = "ADMIN123";

  const handleLogin = (e) => {
    e.preventDefault();

    if (adminId === ADMIN_ID) {
      localStorage.setItem("isAdmin", "true");
      alert("Admin Login Successful");
      navigate("/admin");
    } else {
      alert("Invalid Admin ID");
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center mt-5">
      <div
        className="card shadow p-4"
        style={{ width: "400px", borderRadius: "12px" }}
      >
        <h2 className="text-center mb-4">Admin Login</h2>

        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              placeholder="Enter Admin ID"
              value={adminId}
              onChange={(e) => setAdminId(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default AdminLogin;