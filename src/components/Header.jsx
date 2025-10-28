import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
export default function Header() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);
  const [username, setUsername] = useState("");

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const updateUser = () => {
      const user = localStorage.getItem("username");
      setUsername(user || "");
    };
    updateUser();

    window.addEventListener("storage", updateUser);
    return () => window.removeEventListener("storage", updateUser);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) navigate(`/search?q=${encodeURIComponent(search.trim())}`);
  };

  const handleLogout = () => {
    localStorage.removeItem("username");
    setUsername("");
    navigate("/");
  };

  return (
    <>
      <nav
        className={`navbar navbar-expand-lg bg-white shadow-sm sticky-top border-bottom ${isScrolled ? "py-1" : "py-2"
          }`}
        style={{ zIndex: 1030, transition: "all 0.35s ease" }}
      >
        <div className="container">
          <NavLink
            to="/"
            className="navbar-brand fw-bold fs-4 text-danger d-flex align-items-center"
          >
            <i className="bi bi-bag-heart-fill me-2"></i>E-commerce
          </NavLink>

          <button
            className="navbar-toggler border-0 shadow-none bg-black text-white"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
           >
            →
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav mx-auto mb-2 mb-lg-0 align-items-lg-center gap-lg-4">
              {["Home", "Contact", "About", "Register", "Cart"].map((item, idx) => (
                <li className="nav-item" key={idx}>
                  <NavLink
                    to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                    className={({ isActive }) =>
                      `nav-link fw-semibold ${isActive ? "text-danger" : "text-dark"
                      }`
                    }
                  >
                    {item}
                  </NavLink>
                </li>
              ))}
              <li>
                <button
                  onClick={() => navigate("/shop")}
                  className="btn btn-danger rounded-pill px-4 py-1 fw-semibold shadow-sm"
                >
                  Shop
                </button>
              </li>
            </ul>

            <form
              className="d-flex align-items-center gap-2 mt-3 mt-lg-0"
              style={{ minWidth: 260 }}
              onSubmit={handleSearch}
            >
              {/* <div className="input-group input-group-sm">
                <span className="input-group-text bg-white border-end-0">
                  <i className="bi bi-search text-secondary"></i>
                </span>
                <input
                  type="text"
                  className="form-control border-start-0 shadow-none"
                  placeholder="Search products..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div> */}

              {username ? (
                <div className="d-flex align-items-center gap-2">
                  <span
                    className="fw-semibold text-danger"
                    style={{ cursor: "pointer" }}
                    onClick={() => navigate("/profile")}
                  >
                    {username}
                  </span>
                  <button
                    type="button"
                    className="btn btn-outline-secondary btn-sm"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  className="btn btn-outline-danger btn-sm px-3 fw-semibold rounded-pill"
                  onClick={() => navigate("/login")}
                >
                  Log In
                </button>
              )}
            </form>
          </div>
        </div>
      </nav>
    </>
  );
}
