import { useState } from "react";
import Swal from "sweetalert2";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    Swal.fire({
      title: "Sending message...",
      text: "Please wait a moment",
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading(),
    });

    try {
      const res = await fetch("http://localhost:5000/api/send-mail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        Swal.fire({
          icon: "success",
          title: "Message Sent! 💌",
          text: "We’ll get back to you within 24 hours.",
          confirmButtonColor: "#dc3545",
        });
        setForm({ name: "", email: "", phone: "", message: "" });
      } else {
        Swal.fire({
          icon: "error",
          title: "Sending Failed 😞",
          text: data.message || "Please try again later.",
          confirmButtonColor: "#d33",
        });
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Server Error ⚠️",
        text: "Could not send your message. Please check connection or backend.",
        confirmButtonColor: "#d33",
      });
    }
  };

  return (
    <div className="container py-5">
      <div className="row g-4">
        <div className="col-md-4">
          <div className="p-4 border rounded-3 shadow-sm bg-white">
            <div className="mb-4">
              <div className="d-flex align-items-center mb-2">
                <div
                  className="bg-danger text-white rounded-circle d-flex align-items-center justify-content-center me-3"
                  style={{ width: 40, height: 40 }}
                >
                  <i className="bi bi-telephone-fill"></i>
                </div>
                <h6 className="fw-bold mb-0">Call To Us</h6>
              </div>
              <p className="small text-muted mb-0">
                We are available 24/7, 7 days a week.<br />
                <strong>Phone:</strong> +8801611122222
              </p>
            </div>
            <hr />
            <div>
              <div className="d-flex align-items-center mb-2">
                <div
                  className="bg-danger text-white rounded-circle d-flex align-items-center justify-content-center me-3"
                  style={{ width: 40, height: 40 }}
                >
                  <i className="bi bi-envelope-fill"></i>
                </div>
                <h6 className="fw-bold mb-0">Write To Us</h6>
              </div>
              <p className="small text-muted mb-0">
                Fill out our form and we’ll contact you within 24 hours.
              </p>
              <p className="small mb-0">
                <strong>Emails:</strong><br />
                customer@exclusive.com<br />
                support@exclusive.com
              </p>
            </div>
          </div>
        </div>

        <div className="col-md-8">
          <div className="p-4 border rounded-3 shadow-sm bg-white">
            <form onSubmit={handleSubmit}>
              <div className="row g-3 mb-3">
                <div className="col-md-4">
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    placeholder="Your Name *"
                    value={form.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-md-4">
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    placeholder="Your Email *"
                    value={form.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-md-4">
                  <input
                    type="text"
                    name="phone"
                    className="form-control"
                    placeholder="Your Phone"
                    value={form.phone}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="mb-3">
                <textarea
                  name="message"
                  className="form-control"
                  rows="5"
                  placeholder="Your Message"
                  value={form.message}
                  onChange={handleChange}
                  required
                />
              </div>

              <button type="submit" className="btn btn-danger fw-semibold">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
