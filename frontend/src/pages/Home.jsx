import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="container py-5">

      {/* Hero Section */}
      <div className="text-center mb-5">
        <h1 className="display-4 fw-bold text-primary">
          Student Leave Management System
        </h1>

        <p className="lead text-secondary">
          Apply for leave online and track your leave status easily.
        </p>

        <Link to="/apply" className="btn btn-primary btn-lg mt-3">
          Apply Leave
        </Link>
      </div>

      {/* Feature Cards */}
      <div className="row g-4">

        {/* Apply Leave */}
        <div className="col-md-4">
          <Link
            to="/apply"
            className="text-decoration-none text-dark"
          >
            <div className="card shadow h-100">
              <div className="card-body text-center p-4">
                <h1>📝</h1>

                <h4 className="mt-3">
                  Apply Leave
                </h4>

                <p className="text-muted">
                  Submit leave requests quickly using an online application form.
                </p>
              </div>
            </div>
          </Link>
        </div>

        {/* Track Status */}
        <div className="col-md-4">
          <Link
            to="/admin"
            className="text-decoration-none text-dark"
          >
            <div className="card shadow h-100">
              <div className="card-body text-center p-4">
                <h1>📊</h1>

                <h4 className="mt-3">
                  Track Status
                </h4>

                <p className="text-muted">
                  View whether your leave request is Pending, Approved or Rejected.
                </p>
              </div>
            </div>
          </Link>
        </div>

        {/* Admin Dashboard */}
        <div className="col-md-4">
          <Link
            to="/admin"
            className="text-decoration-none text-dark"
          >
            <div className="card shadow h-100">
              <div className="card-body text-center p-4">
                <h1>👨‍💼</h1>

                <h4 className="mt-3">
                  Admin Dashboard
                </h4>

                <p className="text-muted">
                  Manage leave requests by approving, rejecting, or deleting applications.
                </p>
              </div>
            </div>
          </Link>
        </div>

      </div>

    </div>
  );
}

export default Home;