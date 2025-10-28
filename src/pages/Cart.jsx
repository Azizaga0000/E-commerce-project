import { useEffect, useState } from "react";
import Swal from "sweetalert2";

export default function Cart() {
    const username = localStorage.getItem("username");
    const [items, setItems] = useState([]);

    const loadCart = async () => {
        if (!username) return;
        try {
            const res = await fetch(`http://localhost:5000/api/cart/${username}`);
            const data = await res.json();
            setItems(data);
        } catch (err) {
            console.error("❌ Load cart error:", err);
            Swal.fire("Error", "Failed to load your cart", "error");
        }
    };

    useEffect(() => {
        loadCart();
    }, []);

    const removeItem = async (id) => {
        const confirm = await Swal.fire({
            title: "Remove item?",
            text: "Are you sure you want to remove this item from your cart?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#dc3545",
            cancelButtonColor: "#6c757d",
            confirmButtonText: "Yes, remove it",
        });

        if (!confirm.isConfirmed) return;

        try {
            const res = await fetch(`http://localhost:5000/api/cart/${id}`, { method: "DELETE" });
            const data = await res.json();
            Swal.fire("Removed", data.message, "info");
            loadCart();
        } catch (err) {
            Swal.fire("Error", "Failed to remove item", "error");
        }
    };

    const total = items.reduce((sum, i) => sum + Number(i.price) * i.quantity, 0);

    if (!username)
        return (
            <div className="text-center mt-5">
                Please log in to view your cart.
            </div>
        );

    if (!items.length)
        return (
            <div className="text-center mt-5">
                Your cart is empty 🛒
            </div>
        );

    return (
        <div className="container py-5">
            <h3 className="fw-bold mb-4">🛒 Your Shopping Cart</h3>

            <div className="table-responsive">
                <table className="table align-middle">
                    <thead>
                        <tr>
                            <th>Product</th>
                            <th>Price</th>
                            <th>Qty</th>
                            <th>Total</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map((item) => (
                            <tr key={item.id}>
                                <td>
                                    <div className="d-flex align-items-center">
                                        <img
                                            src={`${item.image}`}
                                            alt={item.model}
                                            style={{ width: 60, height: 60, objectFit: "contain" }}
                                            className="me-3"
                                        />
                                        <div>
                                            <strong>{item.brand}</strong>
                                            <div className="text-muted small">{item.model}</div>
                                        </div>
                                    </div>
                                </td>
                                <td>${Number(item.price).toFixed(2)}</td>
                                <td>{item.quantity}</td>
                                <td>${(Number(item.price) * item.quantity).toFixed(2)}</td>
                                <td>
                                    <button
                                        className="btn btn-sm btn-outline-danger"
                                        onClick={() => removeItem(item.id)}
                                    >
                                        ❌
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="text-end mt-3">
                <h5>
                    Total: <span className="text-danger">${total.toFixed(2)}</span>
                </h5>
                <button
                    className="btn btn-success mt-2 fw-semibold"
                    onClick={() => {
                        localStorage.setItem("checkoutCart", JSON.stringify(items)); // 💾 сохраняем корзину
                        window.location.href = "/checkout"; // 🔁 переходим на страницу Checkout
                    }}
                >
                    Proceed to Checkout
                </button>

            </div>
        </div>
    );
}
