import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";

export default function ProductPage() {
  const { id } = useParams();
  const username = localStorage.getItem("username");
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/api/products/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data))
      .catch(() => Swal.fire("Error", "Failed to load product", "error"));
  }, [id]);

  const addToCart = async () => {
    if (!username) {
      Swal.fire("Login Required", "Please log in to add items to cart.", "warning");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, productId: product.id }),
      });
      const data = await res.json();
      Swal.fire("🛒", data.message, "success");
    } catch (err) {
      Swal.fire("Error", "Failed to add to cart", "error");
    }
  };

  if (!product)
    return <div className="text-center mt-5">Loading product...</div>;

  return (
    <div className="container py-5">
      <h3 className="fw-bold mb-4">Product page</h3>

      <div className="row align-items-center">
        <div className="col-md-6 text-center">
          <img
            src={`${product.image}`}
            alt={product.model}
            className="img-fluid rounded shadow-sm"
            style={{ maxHeight: "400px", objectFit: "contain" }}
          />
        </div>

        <div className="col-md-6">
          <h4 className="fw-semibold">{product.brand} || {product.model}</h4>
          <p className="text-muted">{product.description}</p>
          <h5 className="text-danger fw-bold">${Number(product.price).toFixed(2)}</h5>
          <p>⭐ {product.rating}/5</p>

          <button className="btn btn-danger fw-semibold mt-3" onClick={addToCart}>
            Add to cart
          </button>

          <div className="mt-4 p-3 border rounded">
            <p className="mb-1"><strong>🚚 Free Delivery</strong></p>
            <small>Enter your postal code for Delivery Availability</small>
            <hr />
            <p className="mb-1"><strong>↩️ Return Delivery</strong></p>
            <small>Free 10 Days Delivery Returns. Details</small>
          </div>
        </div>
      </div>
    </div>
  );
}
