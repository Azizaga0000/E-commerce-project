import { useState, useEffect } from "react";
import Swal from "sweetalert2";

export default function Profile() {
  const username = localStorage.getItem("username");
  const [user, setUser] = useState(null);
  const [editing, setEditing] = useState(false);
  const [changingPass, setChangingPass] = useState(false);
  const [formData, setFormData] = useState({ name: "", surname: "", email: "", username: "" });
  const [passwords, setPasswords] = useState({ oldPassword: "", newPassword: "" });
  const [showPass, setShowPass] = useState(false);

  useEffect(() => {
    if (!username) return;
    fetch(`http://localhost:5000/api/user/${username}`)
      .then(res => res.json())
      .then(data => {
        setUser(data);
        setFormData({
          name: data.name,
          surname: data.surname,
          email: data.email,
          username: data.username,
        });
      })
      .catch(err => console.error("Error loading user:", err));
  }, [username]);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handlePasswordChange = (e) => setPasswords({ ...passwords, [e.target.name]: e.target.value });

  const handleUpdate = async (e) => {
    e.preventDefault();
    const res = await fetch(`http://localhost:5000/api/user/${username}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    const data = await res.json();
    Swal.fire({
      icon: "success",
      title: "Profile updated!",
      text: data.message,
      timer: 1800,
      showConfirmButton: false,
    });
    if (res.ok) {
      if (data.newUsername) localStorage.setItem("username", data.newUsername);
      setEditing(false);
      setUser(formData);
    }
  };

  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
    const res = await fetch(`http://localhost:5000/api/user/${username}/password`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(passwords),
    });
    const data = await res.json();
    Swal.fire({
      icon: "success",
      title: "Password changed",
      text: "Your password has been updated successfully.",
      timer: 1800,
      showConfirmButton: false,
    });

    if (res.ok) {
      setPasswords({ oldPassword: "", newPassword: "" });
      setChangingPass(false);
    }
  };

  const handleDelete = async () => {
    // if (!window.confirm("Are you sure you want to delete your account?")) return;
    // const res = await fetch(`http://localhost:5000/api/user/${username}`, { method: "DELETE" });
    // const data = await res.json();
    // alert(data.message);
    // localStorage.removeItem("username");
    // window.location.href = "/";

    Swal.fire({
      title: "Are you sure?",
      text: "This will permanently delete your account!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#6c757d",
      confirmButtonText: "Yes, delete it",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await fetch(`http://localhost:5000/api/user/${username}`, { method: "DELETE" });
        const data = await res.json();
        localStorage.removeItem("username");
        Swal.fire("Deleted!", "Your account has been removed.", "success");
        setTimeout(() => (window.location.href = "/"), 1200);
      }
    });

  };

  if (!user) return <p className="text-center mt-5">First Of All, Please Log In...</p>;

  return (
    <div className="container py-5">
      <div className="card shadow-sm p-4 mx-auto" style={{ maxWidth: 500 }}>
        <h4 className="text-danger fw-bold mb-3">User Profile</h4>

        {editing ? (
          <form onSubmit={handleUpdate}>
            <div className="mb-2">
              <label className="form-label small">Name</label>
              <input type="text" name="name" className="form-control" value={formData.name} onChange={handleChange} />
            </div>
            <div className="mb-2">
              <label className="form-label small">Surname</label>
              <input type="text" name="surname" className="form-control" value={formData.surname} onChange={handleChange} />
            </div>
            <div className="mb-2">
              <label className="form-label small">Email</label>
              <input type="email" name="email" className="form-control" value={formData.email} onChange={handleChange} />
            </div>
            <div className="mb-2">
              <label className="form-label small">Username</label>
              <input type="text" name="username" className="form-control" value={formData.username} onChange={handleChange} />
            </div>
            <button type="submit" className="btn btn-success w-100 mt-3">Save changes</button>
            <button type="button" className="btn btn-outline-secondary w-100 mt-2" onClick={() => setEditing(false)}>Cancel</button>
          </form>
        ) : changingPass ? (
          <form onSubmit={handlePasswordUpdate}>
            <div className="mb-2">
              <label className="form-label small">Old Password</label>
              <input
                type={showPass ? "text" : "password"}
                name="oldPassword"
                className="form-control"
                placeholder="Enter old password"
                value={passwords.oldPassword}
                onChange={handlePasswordChange}
                required
              />
            </div>
            <div className="mb-2">
              <label className="form-label small">New Password</label>
              <input
                type={showPass ? "text" : "password"}
                name="newPassword"
                className="form-control"
                placeholder="Enter new password"
                value={passwords.newPassword}
                onChange={handlePasswordChange}
                required
              />
            </div>

            <div className="form-check mt-1">
              <input
                type="checkbox"
                className="form-check-input"
                id="showPass"
                checked={showPass}
                onChange={() => setShowPass(!showPass)}
              />
              <label htmlFor="showPass" className="form-check-label small">Show Passwords</label>
            </div>

            <button type="submit" className="btn btn-success w-100 mt-3">Save New Password</button>
            <button type="button" className="btn btn-outline-secondary w-100 mt-2" onClick={() => setChangingPass(false)}>Cancel</button>
          </form>
        ) : (
          <>
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Surname:</strong> {user.surname}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Username:</strong> {user.username}</p>

            <button className="btn btn-warning w-100 mt-3 fw-semibold" onClick={() => setEditing(true)}>
              ✏️ Edit Profile
            </button>
            <button className="btn btn-info w-100 mt-2 fw-semibold text-white" onClick={() => setChangingPass(true)}>
              🔒 Change Password
            </button>
            <button className="btn btn-danger w-100 mt-2 fw-semibold" onClick={handleDelete}>
              🗑️ Delete Account
            </button>

            <button className="btn w-100 mt-2 fw-semibold border-0" disabled>
              ---------------------------
            </button>

            <button className="btn btn-danger w-100 mt-2 fw-semibold">
              <a href="/my-products" className="text-decoration-none text-white">My Products On Sale</a>
            </button>
          </>
        )}
      </div>
    </div>
  );
}
