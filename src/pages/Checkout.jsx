import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import Card from "@/assets/images/cards.png";

export default function Checkout() {
    const [cart, setCart] = useState([]);
    const [customer, setCustomer] = useState({
        firstName: "",
        lastName: "",
        state: "",
        city: "",
        address: "",
        zip: "",
        tel: "",
        email: "",
        // cardNumber: "",
        // mm: "",
        // yy: "",
        // cvc: "",
        agree: false,
    });

    useEffect(() => {
        const saved = localStorage.getItem("checkoutCart");
        if (saved) setCart(JSON.parse(saved));
    }, []);


    const total = cart.reduce((sum, i) => sum + Number(i.price) * (i.quantity || 1), 0);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setCustomer({ ...customer, [name]: type === "checkbox" ? checked : value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!customer.agree)
            return Swal.fire("Please agree to the terms", "", "info");

        const order = {
            items: cart,
            subtotal: total,
            shipping: "FREE",
            total,
        };

        try {
            const res = await fetch("http://localhost:5000/api/checkout", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ order, customer }),
            });
            const data = await res.json();
            if (res.ok) {
                Swal.fire("✅ Success", data.message, "success");
                localStorage.removeItem("checkoutCart"); 
            } else {
                Swal.fire("Error", data.message, "error");
            }
        } catch (err) {
            Swal.fire("Error", "Server error", "error");
        }
    };

    return (
        <div className="container py-5">
            <form onSubmit={handleSubmit}>
                <div className="row g-5">
                    <div className="col-lg-6">
                        <input name="firstName" className="form-control mb-3" placeholder="First name" value={customer.firstName} onChange={handleChange} required />
                        <input name="lastName" className="form-control mb-3" placeholder="Last name" value={customer.lastName} onChange={handleChange} required />
                        <select name="state" className="form-select mb-3" value={customer.state} onChange={handleChange} required>
                            <option value="">Choose...</option>
                            <option value="Azerbaijan">Azerbaijan</option>
                            <option value="Turkey">Turkey</option>
                        </select>
                        <input name="city" className="form-control mb-3" placeholder="City" value={customer.city} onChange={handleChange} required />
                        <input name="address" className="form-control mb-3" placeholder="Address" value={customer.address} onChange={handleChange} required />
                        <input name="zip" className="form-control mb-3" placeholder="Zip" value={customer.zip} onChange={handleChange} required />
                        <input name="tel" className="form-control mb-3" placeholder="Tel" value={customer.tel} onChange={handleChange} required />
                        <input name="email" type="email" className="form-control mb-3" placeholder="Email" value={customer.email} onChange={handleChange} required />
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" name="agree" checked={customer.agree} onChange={handleChange} />
                            <label className="form-check-label small">Agree to terms and conditions</label>
                        </div>
                    </div>

                    <div className="col-lg-6">
                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <img src={Card} alt="cards" height={30} />
                        </div>
                        <input className="form-control mb-3" placeholder="Card number" required />
                        <div className="row mb-3">
                            <div className="col"><input className="form-control" placeholder="Expiration (MM)" required /></div>
                            <div className="col"><input className="form-control" placeholder="Expiration (YY)" required /></div>
                            <div className="col"><input className="form-control" placeholder="CVC" required /></div>
                        </div>

                        <div className="border-top pt-3">
                            <div className="d-flex justify-content-between"><span>Subtotal</span><span>{Number(total || 0).toFixed(2)}$</span></div>
                            <div className="d-flex justify-content-between"><span>Shipping</span><span>FREE</span></div>
                            <div className="d-flex justify-content-between fw-bold mt-2"><span>Total</span><span>{Number(total || 0).toFixed(2)}$</span></div>
                        </div>

                        <button type="submit" className="btn btn-danger mt-4 w-100 fw-semibold">Place order</button>
                    </div>
                </div>
            </form>
        </div>
    );
}
