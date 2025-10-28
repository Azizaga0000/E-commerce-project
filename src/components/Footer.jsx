import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Footer() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email.trim()) {
      alert("⚠️ Please enter your email address.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      alert("❌ Invalid email format. Please try again.");
      return;
    }
    alert(`✅ Subscribed successfully with: ${email}`);
    setEmail("");
  };

  return (
    <footer
      className="text-white pt-5 pb-3 mt-auto"
      style={{
        background: "linear-gradient(180deg, #d32f2f 0%, #b71c1c 100%)",
      }}
    >
      <div className="container text-start">
        <div className="row g-4">
          <div className="col-12 col-md-3">
            <h5 className="fw-bold">Exclusive</h5>
            <p className="mb-1">Subscribe</p>
            <p className="small text-white-50 mb-3">
              Get 10% off your first order
            </p>
            <form
              onSubmit={handleSubscribe}
              className="input-group input-group-sm rounded-pill overflow-hidden"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-control border-0"
                placeholder="Enter your email"
              />
              <button
                className="btn btn-light text-danger fw-bold"
                type="submit"
              >
                →
              </button>
            </form>
          </div>

          <div className="col-6 col-md-3">
            <h6 className="fw-bold">Support</h6>
            <p className="mb-1 small">111 Bijoy Sarani, Dhaka, DH 1515</p>
            <p className="mb-1 small">
              <a
                href="mailto:exclusive@gmail.com"
                className="text-white text-decoration-none"
              >
                exclusive@gmail.com
              </a>
            </p>
            <p className="small">
              <a
                href="tel:+88015888889999"
                className="text-white text-decoration-none"
              >
                +88015-88888-9999
              </a>
            </p>
          </div>

          <div className="col-6 col-md-2">
            <h6 className="fw-bold">Account</h6>
            <ul className="list-unstyled small">
              {[
                { name: "My Account", link: "/profile" },
                { name: "Login / Register", link: "/login" },
                { name: "Cart", link: "/cart" },
                { name: "Shop", link: "/shop" },
              ].map((item) => (
                <li
                  key={item.name}
                  className="hover-underline"
                  style={{ cursor: "pointer" }}
                  onClick={() => navigate(item.link)}
                >
                  {item.name}
                </li>
              ))}
            </ul>
          </div>

          <div className="col-6 col-md-2">
            <h6 className="fw-bold">Quick Links</h6>
            <ul className="list-unstyled small">
              {[
                { name: "Contact", link: "/contact" },
              ].map((item) => (
                <li
                  key={item.name}
                  className="hover-underline"
                  style={{ cursor: "pointer" }}
                  onClick={() => navigate(item.link)}
                >
                  {item.name}
                </li>
              ))}
            </ul>
          </div>

          <div className="col-12 col-md-2">
            <h6 className="fw-bold">Download App</h6>
            <p className="small text-white-50 mb-2">
              Save $3 with App New User Only
            </p>
            <div>
              <a
                href="https://play.google.com/store"
                target="_blank"
                rel="noreferrer"
              >
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/5/5f/Google_Play_Store_badge_EN.svg"
                  alt="Google Play"
                  className="img-fluid mb-2"
                />
              </a>
              <a
                href="https://www.apple.com/app-store/"
                target="_blank"
                rel="noreferrer"
              >
                <img
                  src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
                  alt="App Store"
                  className="img-fluid"
                />
              </a>
            </div>
            <div className="mt-3 d-flex gap-3 fs-5">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="text-white opacity-75 hover-opacity"
              >
                <i className="bi bi-facebook"></i>
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="text-white opacity-75 hover-opacity"
              >
                <i className="bi bi-twitter"></i>
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="text-white opacity-75 hover-opacity"
              >
                <i className="bi bi-instagram"></i>
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="text-white opacity-75 hover-opacity"
              >
                <i className="bi bi-linkedin"></i>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center mt-4 small text-white-50 border-top border-light pt-3">
        © 2025 Rimel. All rights reserved.
      </div>
    </footer>
  );
}
