import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

export default function Shop() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("");
  const [rating, setRating] = useState(0);
  const username = localStorage.getItem("username");
  const navigate = useNavigate(); 

  const loadProducts = async () => {
    const q = new URLSearchParams();
    if (search) q.set("search", search);
    if (category && category !== "All") q.set("category", category);
    if (sort) q.set("sort", sort);
    if (rating > 0) q.set("rating", rating);
    const res = await fetch(`http://localhost:5000/api/products?${q.toString()}`);
    const data = await res.json();
    setProducts(data);
  };

  useEffect(() => { loadProducts(); }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    loadProducts();
  };

  const addToCart = async (id) => {
    if (!username) {
      Swal.fire("Not logged in", "Please log in to add products", "info");
      return;
    }

    const res = await fetch("http://localhost:5000/api/cart", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, productId: id }),
    });

    const data = await res.json();
    if (res.ok) Swal.fire("Added", data.message, "success");
    else Swal.fire("Error", data.message || "Failed", "error");
  };

  const categories = ["All", "Clothing", "Accessories", "Electronics", "Other"];

  return (
    <div className="container py-5">
      <div className="row">
        <div className="col-md-3 mb-4">
          <h4 className="fw-bold mb-3">Shop</h4>

          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Search products..."
              className="form-control mb-3"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <div className="mb-3">
              <h6 className="fw-semibold mb-2">Category</h6>
              <ul className="list-unstyled">
                {categories.map((c) => (
                  <li key={c}>
                    <button
                      type="button"
                      className={`btn btn-link p-0 ${category === c ? "fw-bold text-danger" : "text-dark"}`}
                      onClick={() => setCategory(c)}
                    >
                      {c}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mb-3">
              <h6 className="fw-semibold mb-2">Rate</h6>
              {[5, 4, 3, 2, 1].map((r) => (
                <div key={r} style={{ cursor: "pointer" }} onClick={() => setRating(r)}>
                  {"⭐".repeat(r)} {rating === r && <span className="text-danger fw-bold">•</span>}
                </div>
              ))}
            </div>

            <div className="mb-3">
              <h6 className="fw-semibold mb-2">Sort by</h6>
              <select
                className="form-select"
                value={sort}
                onChange={(e) => setSort(e.target.value)}
              >
                <option value="">Default</option>
                <option value="price_asc">Price ↑</option>
                <option value="price_desc">Price ↓</option>
                <option value="rating">Rating</option>
              </select>
            </div>

            <button className="btn btn-danger w-100">Apply filters</button>
          </form>
        </div>

        <div className="col-md-9">
          <div className="row g-4">
            {products.map((p) => (
              <div className="col-6 col-lg-4" key={p.id}>
                <div
                  className="card border-0 shadow-sm h-100"
                  style={{ cursor: "pointer" }}
                  onClick={() => navigate(`/product/${p.id}`)}
                >
                  <img
                    src={`${p.image}`}
                    alt={p.title}
                    className="card-img-top"
                    style={{ objectFit: "contain", height: 180 }}
                  />
                  <div className="card-body d-flex flex-column">
                    <h6 className="fw-semibold">{p.brand} || {p.model}</h6>
                    <p className="small text-muted mb-1">{p.category}</p>
                    <div className="text-warning mb-2">
                      {"⭐".repeat(Math.round(p.rating))}{" "}
                      <span className="text-muted small">({p.rating.toFixed(1)})</span>
                    </div>
                    <h6 className="fw-bold text-danger mb-3">{p.price}$</h6>

                    <button
                      className="btn btn-dark mt-auto"
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCart(p.id);
                      }}
                    >
                      add to cart
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {!products.length && (
              <div className="text-center mt-5">
                <p className="text-muted">No products found</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
