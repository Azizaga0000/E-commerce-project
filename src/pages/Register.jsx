import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Swal from "sweetalert2";

export default function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    email: "",
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        Swal.fire({
          icon: "success",
          title: "Account created 🎉",
          text: "You can now log in!",
          confirmButtonColor: "#dc3545",
        }).then(() => navigate("/login"));
      } else {
        Swal.fire({
          icon: "error",
          title: "Registration failed",
          text: data.message || "Something went wrong.",
          confirmButtonColor: "#d33",
        });
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Server Error",
        text: "⚠️ Backend not responding. Please check Node.js server.",
      });

    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center vh-100 bg-light">
      <div
        className="card p-4 shadow-sm"
        style={{ width: "100%", maxWidth: "400px", borderRadius: "12px" }}
      >
        <h4 className="text-center mb-3 fw-bold">Create an account</h4>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label small">Name</label>
            <input
              type="text"
              name="name"
              className="form-control"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label small">Surname</label>
            <input
              type="text"
              name="surname"
              className="form-control"
              placeholder="Enter your surname"
              value={formData.surname}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label small">Email</label>
            <input
              type="email"
              name="email"
              className="form-control"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label small">Username</label>
            <input
              type="text"
              name="username"
              className="form-control"
              placeholder="Enter username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label small">Password</label>
            <input
              type="password"
              name="password"
              className="form-control"
              placeholder="Enter password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <button
            type="submit"
            className="btn btn-danger w-100 fw-semibold"
            style={{ borderRadius: "8px" }}
          >
            Create account
          </button>
        </form>

        <div className="text-center mt-3 small">
          Already have account?{" "}
          <Link to="/login" className="text-danger fw-semibold">
            Log in
          </Link>
        </div>
      </div>
    </div>
  );
}
