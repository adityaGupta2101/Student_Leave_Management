import { Link, useNavigate } from "react-router-dom";

function StudentDashboard() {

  const navigate = useNavigate();

  const student = JSON.parse(localStorage.getItem("student"));

  const logout = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("student");

    navigate("/login");
  };

  return (

    <div className="container py-5">

      <div className="card shadow">

        <div className="card-body text-center">

          <h2 className="text-primary">
            Welcome, {student?.name} 👋
          </h2>

          <hr />

          <div className="d-grid gap-3 mt-4">

            <Link
              to="/apply"
              className="btn btn-primary"
            >
              Apply Leave
            </Link>

            <Link
              to="/status"
              className="btn btn-info text-white"
            >
              My Leave Status
            </Link>

            <button
              onClick={logout}
              className="btn btn-danger"
            >
              Logout
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}

export default StudentDashboard;