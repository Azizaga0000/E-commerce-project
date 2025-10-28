import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import * as bootstrap from "bootstrap";


export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    id: "",
    brand: "",
    model: "",
    category: "",
    image: "",
    price: "",
    rating: "",
  });
  const [editing, setEditing] = useState(null);

  const loadProducts = async () => {
    const res = await fetch("http://localhost:5000/api/admin/products");
    const data = await res.json();
    setProducts(data);
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const openModal = (product = null) => {
    if (product) {
      setEditing(product.id);
      setForm({
        id: product.id,
        brand: product.brand,
        model: product.model,
        category: product.category,
        description: product.description,
        image: product.image,
        price: product.price,
        rating: product.rating,
      });
    } else {
      setEditing(null);
      setForm({
        id: "",
        brand: "",
        model: "",
        category: "",
        description: "",
        image: "",
        price: "",
        rating: "",
      });
    }

    const modal = new bootstrap.Modal(document.getElementById("productModal"));
    modal.show();
  };

  const saveProduct = async (e) => {
    e.preventDefault();
    const method = editing ? "PUT" : "POST";
    const url = editing
      ? `http://localhost:5000/api/admin/products/${editing}`
      : "http://localhost:5000/api/admin/products";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    Swal.fire("✅", data.message, "success");

    setForm({ brand: "", model: "", category: "", image: "", price: "", rating: "" });
    setEditing(null);
    loadProducts();

    const modal = bootstrap.Modal.getInstance(document.getElementById("productModal"));
    modal.hide();
  };

  const deleteProduct = async (id) => {
    const confirm = await Swal.fire({
      title: "Delete?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#6c757d",
      confirmButtonText: "Yes, delete",
    });
    if (!confirm.isConfirmed) return;

    await fetch(`http://localhost:5000/api/admin/products/${id}`, { method: "DELETE" });
    Swal.fire("🗑", "Product deleted", "success");
    loadProducts();
  };

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4 className="fw-bold">
          <i className="bi bi-box-seam me-2"></i> Products Admin
        </h4>
        <button className="btn btn-primary" onClick={() => openModal()}>
          New product
        </button>
      </div>

      <table className="table table-bordered align-middle text-center">
        <thead className="table-light">
          <tr>
            <th>Id</th>
            <th>Brand</th>
            <th>Model</th>
            <th>Category</th>
            <th>Description</th>
            <th>Image</th>
            <th>Price</th>
            <th>Rating</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>{p.brand}</td>
              <td>{p.model}</td>
              <td>{p.category}</td>
              <td>{p.description}</td>
              <td>
                <img
                  src={p.image}
                  alt={p.model}
                  style={{ width: 100, height: 80, objectFit: "cover" }}
                />
              </td>
              <td>{p.price} $</td>
              <td>{p.rating}/5</td>
              <td>
                <button
                  className="btn btn-sm btn-primary me-2"
                  onClick={() => openModal(p)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => deleteProduct(p.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div
        className="modal fade"
        id="productModal"
        tabIndex="-1"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">
                {editing ? "Edit product" : "New product"}
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>

            <div className="modal-body">
              <form id="productForm" onSubmit={saveProduct}>
                <div className="row g-3">
                  {["id", "brand", "model", "category", "description", "image", "price", "rating"].map(
                    (field) => (
                      <div className="col-md-6" key={field}>
                        <input
                          name={field}
                          value={form[field]}
                          onChange={handleChange}
                          placeholder={
                            field[0].toUpperCase() + field.slice(1)
                          }
                          className="form-control"
                          required={field !== "rating"}
                        />
                      </div>
                    )
                  )}
                </div>
              </form>
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Cancel
              </button>
              <button
                form="productForm"
                type="submit"
                className="btn btn-success"
              >
                💾 Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
