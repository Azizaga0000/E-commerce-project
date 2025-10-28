import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Swal from "sweetalert2";

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (res.ok) {
        localStorage.setItem("username", data.username);

        Swal.fire({
          icon: "success",
          title: "Welcome back!",
          text: "You logged in successfully 🎉",
          showConfirmButton: false,
          timer: 1500,
        });

        setTimeout(() => {
          navigate("/");
          window.location.reload();
        }, 1500);
      } else {
        Swal.fire({
          icon: "error",
          title: "Login failed",
          text: data.message || "Invalid email or password",
          confirmButtonColor: "#d33",
        });
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Server Error",
        text: "⚠️ Could not connect to the backend. Please try again.",
        confirmButtonColor: "#d33",
      });

    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center vh-100 bg-light">
      <div className="card p-4 shadow-sm" style={{ width: "100%", maxWidth: 400, borderRadius: 12 }}>
        <h4 className="text-center mb-3 fw-bold">Log In</h4>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label small">Email</label>
            <input type="email" name="email" className="form-control" placeholder="Enter your email"
              value={formData.email} onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <label className="form-label small">Password</label>
            <input type="password" name="password" className="form-control" placeholder="Enter your password"
              value={formData.password} onChange={handleChange} required />
          </div>
          <button type="submit" className="btn btn-danger w-100 fw-semibold" style={{ borderRadius: 8 }}>
            Log In
          </button>
        </form>
        <div className="text-center mt-3 small">
          Don’t have an account? <Link to="/register" className="text-danger fw-semibold">Create one</Link>
        </div>
      </div>
    </div>
  );
}
