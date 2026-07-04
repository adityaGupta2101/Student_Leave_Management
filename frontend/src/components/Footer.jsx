import { NavLink } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-dark text-light mt-5">
      <div className="container py-5">

        <div className="row">

          {/* Project Info */}
          <div className="col-lg-4 mb-4">
            <h4 className="fw-bold mb-3">
              🎓 Student Leave Management
            </h4>

            <p className="text-secondary">
              A MERN Stack application that simplifies student leave
              requests with a clean, responsive, and efficient
              management system.
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-lg-4 mb-4">
            <h5 className="fw-bold mb-3">
              Quick Links
            </h5>

            <ul className="list-unstyled">

              <li className="mb-2">
                <NavLink
                  to="/"
                  className="text-decoration-none text-light"
                >
                  Home
                </NavLink>
              </li>

              <li className="mb-2">
                <NavLink
                  to="/apply"
                  className="text-decoration-none text-light"
                >
                  Apply Leave
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/admin"
                  className="text-decoration-none text-light"
                >
                  Admin Dashboard
                </NavLink>
              </li>

            </ul>
          </div>

          {/* Tech Stack */}
          <div className="col-lg-4 mb-4">
            <h5 className="fw-bold mb-3">
              Tech Stack
            </h5>

            <div className="d-flex flex-wrap gap-2">

              <span className="badge bg-primary">React</span>

              <span className="badge bg-success">Bootstrap</span>

              <span className="badge bg-warning text-dark">Node.js</span>

              <span className="badge bg-info text-dark">Express.js</span>

              <span className="badge bg-secondary">MongoDB</span>

            </div>

            <hr className="border-secondary" />

            <p className="mb-1">
              <strong>Developed By</strong>
            </p>

            <p className="text-secondary">
              Aditya Gupta
            </p>
          </div>

        </div>

        <hr className="border-secondary" />

        <div className="text-center text-secondary">

          © 2026 Student Leave Management System <br />

          All Rights Reserved.

        </div>

      </div>
    </footer>
  );
}

export default Footer;