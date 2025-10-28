import express from "express";
import cors from "cors";
import { db } from "./db.js";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/api/register", async (req, res) => {
  const { name, surname, email, username, password } = req.body;
  if (!name || !surname || !email || !username || !password)
    return res.status(400).json({ message: "All fields are required" });

  try {
    const [existing] = await db
      .promise()
      .query("SELECT id FROM users WHERE email = ? OR username = ?", [email, username]);

    if (existing.length > 0)
      return res.status(400).json({ message: "Email or username already exists" });

    const hashed = await bcrypt.hash(password, 10);
    await db
      .promise()
      .query(
        "INSERT INTO users (name, surname, email, username, password) VALUES (?, ?, ?, ?, ?)",
        [name, surname, email, username, hashed]
      );

    res.status(201).json({ message: "Account created successfully" });
  } catch (err) {
    console.error("❌ Register error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ message: "All fields are required" });

  try {
    const [rows] = await db.promise().query("SELECT * FROM users WHERE email = ?", [email]);
    if (rows.length === 0) return res.status(400).json({ message: "User not found" });

    const user = rows[0];
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ message: "Invalid credentials" });

    res.json({
      message: "Login successful",
      username: user.username,
    });
  } catch (err) {
    console.error("❌ Login error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

app.get("/api/user/:username", async (req, res) => {
  const { username } = req.params;
  try {
    const [rows] = await db
      .promise()
      .query("SELECT name, surname, email, username FROM users WHERE username = ?", [username]);

    if (rows.length === 0) return res.status(404).json({ message: "User not found" });

    res.json(rows[0]);
  } catch (err) {
    console.error("❌ Get user error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

app.put("/api/user/:username", async (req, res) => {
  const oldUsername = req.params.username;
  const { name, surname, email, username } = req.body;

  if (!name || !surname || !email || !username)
    return res.status(400).json({ message: "All fields required" });

  try {
    const [existingUser] = await db
      .promise()
      .query("SELECT id FROM users WHERE username = ?", [oldUsername]);

    if (existingUser.length === 0)
      return res.status(404).json({ message: "User not found" });

    if (username !== oldUsername) {
      const [taken] = await db.promise().query("SELECT id FROM users WHERE username = ?", [username]);
      if (taken.length > 0)
        return res.status(400).json({ message: "Username already taken" });
    }

    await db
      .promise()
      .query(
        "UPDATE users SET name=?, surname=?, email=?, username=? WHERE username=?",
        [name, surname, email, username, oldUsername]
      );

    res.json({ message: "Profile updated successfully", newUsername: username });
  } catch (err) {
    console.error("❌ Update profile error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

app.put("/api/user/:username/password", async (req, res) => {
  const { username } = req.params;
  const { oldPassword, newPassword } = req.body;

  if (!oldPassword || !newPassword)
    return res.status(400).json({ message: "All fields required" });

  try {
    const [rows] = await db.promise().query("SELECT * FROM users WHERE username = ?", [username]);
    if (rows.length === 0) return res.status(404).json({ message: "User not found" });

    const user = rows[0];
    const match = await bcrypt.compare(oldPassword, user.password);
    if (!match) return res.status(401).json({ message: "Old password is incorrect" });

    const hashed = await bcrypt.hash(newPassword, 10);
    await db.promise().query("UPDATE users SET password=? WHERE username=?", [hashed, username]);

    res.json({ message: "Password updated successfully" });
  } catch (err) {
    console.error("❌ Password update error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

app.delete("/api/user/:username", async (req, res) => {
  const { username } = req.params;
  try {
    const [existing] = await db.promise().query("SELECT id FROM users WHERE username = ?", [username]);
    if (existing.length === 0) return res.status(404).json({ message: "User not found" });

    await db.promise().query("DELETE FROM users WHERE username = ?", [username]);
    res.json({ message: "Account deleted successfully" });
  } catch (err) {
    console.error("❌ Delete error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

app.post("/api/send-mail", async (req, res) => {
  const { name, email, phone, message } = req.body;
  if (!name || !email || !message)
    return res.status(400).json({ message: "All fields required" });

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "mailserviceecommerce@gmail.com",
        pass: "vdzf lhrq leja vvgl",
      },
    });

    await transporter.sendMail({
      from: `"${name}" <${email}>`,
      to: "mailserviceecommerce@gmail.com",
      subject: `Message from ${name}`,
      html: `
        <h3>New Contact Message</h3>
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Phone:</b> ${phone || "—"}</p>
        <p><b>Message:</b><br/>${message}</p>
      `,
    });

    res.json({ message: "Email sent successfully" });
  } catch (err) {
    console.error("❌ Email error:", err);
    res.status(500).json({ message: "Email sending failed" });
  }
});

//MailService123

app.get("/api/products", async (req, res) => {
  const { search, category, sort, rating } = req.query;

  let sql = "SELECT * FROM products WHERE 1=1";
  const params = [];

  if (search) {
    sql += " AND (brand LIKE ? OR model LIKE ?)";
    params.push(`%${search}%`, `%${search}%`);
  }

  if (category && category !== "All") {
    sql += " AND category = ?";
    params.push(category);
  }

  if (rating) {
    sql += " AND rating >= ?";
    params.push(rating);
  }

  if (sort === "price_asc") sql += " ORDER BY price ASC";
  else if (sort === "price_desc") sql += " ORDER BY price DESC";
  else if (sort === "rating") sql += " ORDER BY rating DESC";

  try {
    const [rows] = await db.promise().query(sql, params);
    res.json(rows);
  } catch (err) {
    console.error("❌ Error loading products:", err);
    res.status(500).json({ message: "Server error" });
  }
});

app.get("/api/cart/:username", async (req, res) => {
  const { username } = req.params;
  try {
    const [rows] = await db.promise().query(`
      SELECT c.id, p.brand, p.model, p.price, p.image, c.quantity 
      FROM cart c
      JOIN products p ON c.product_id = p.id
      WHERE c.username = ?
    `, [username]);
    res.json(rows);
  } catch (err) {
    console.error("❌ Cart load error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

app.get("/api/products/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await db.promise().query("SELECT * FROM products WHERE id = ?", [id]);
    if (rows.length === 0) return res.status(404).json({ message: "Product not found" });
    res.json(rows[0]);
  } catch (err) {
    console.error("❌ Product load error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

app.post("/api/cart", async (req, res) => {
  const { username, productId } = req.body;
  if (!username || !productId)
    return res.status(400).json({ message: "Missing username or product" });

  try {
    const [exists] = await db.promise().query(
      "SELECT * FROM cart WHERE username = ? AND product_id = ?",
      [username, productId]
    );

    if (exists.length > 0) {
      await db.promise().query(
        "UPDATE cart SET quantity = quantity + 1 WHERE username = ? AND product_id = ?",
        [username, productId]
      );
      return res.json({ message: "Quantity increased" });
    }

    await db.promise().query(
      "INSERT INTO cart (username, product_id) VALUES (?, ?)",
      [username, productId]
    );

    res.json({ message: "Product added to cart" });
  } catch (err) {
    console.error("❌ Add to cart error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

app.delete("/api/cart/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await db.promise().query("DELETE FROM cart WHERE id = ?", [id]);
    res.json({ message: "Item removed" });
  } catch (err) {
    console.error("❌ Cart delete error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

app.post("/api/checkout", async (req, res) => {
  const { order, customer } = req.body;
  if (!order || !customer) return res.status(400).json({ message: "Missing order or customer data" });

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "mailserviceecommerce@gmail.com",
        pass: "vdzf lhrq leja vvgl",
      },
    });

    const adminMail = `
      <h2>🛍 New Order Received</h2>
      <h4>Customer Info:</h4>
      <p>
        <b>Name:</b> ${customer.firstName} ${customer.lastName}<br/>
        <b>Email:</b> ${customer.email}<br/>
        <b>Tel:</b> ${customer.tel}<br/>
        <b>Address:</b> ${customer.address}, ${customer.city}, ${customer.state} ${customer.zip}
        <b>Card Number:</b> ${customer.cardNumber}<br/>
        <b>Expiration:</b> ${customer.mm}/${customer.yy}<br/>
        <b>CVC:</b> ${customer.cvc}
      </p>
      <h4>Order Summary:</h4>
      <ul>
        ${order.items.map(i => `<li>${i.brand} ${i.model} — ${i.quantity} x $${i.price}</li>`).join("")}
      </ul>
      <p><b>Subtotal:</b> $${order.subtotal.toFixed(2)}<br/>
         <b>Shipping:</b> ${order.shipping}<br/>
         <b>Total:</b> $${order.total.toFixed(2)}</p>
    `;

    const customerMail = `
      <h3>✅ Order Confirmation</h3>
      <p>Dear ${customer.firstName}, thank you for your order!</p>
      <p>We’ve received your order and will process it soon.</p>
      <h4>Order Summary:</h4>
      <ul>
        ${order.items.map(i => `<li>${i.brand} ${i.model} — ${i.quantity} x $${i.price}</li>`).join("")}
      </ul>
      <p><b>Total:</b> $${order.total.toFixed(2)}</p>
      <p>We’ll email you once it ships.</p>
    `;

    await transporter.sendMail({
      from: `"E-Shop" <mailserviceecommerce@gmail.com>`,
      to: "mailserviceecommerce@gmail.com",
      subject: `🛒 New Order from ${customer.firstName} ${customer.lastName}`,
      html: adminMail,
    });

    await transporter.sendMail({
      from: `"E-Shop" <mailserviceecommerce@gmail.com>`,
      to: customer.email,
      subject: "✅ Your order has been received",
      html: customerMail,
    });

    res.json({ message: "Order successfully placed!" });
  } catch (err) {
    console.error("❌ Checkout error:", err);
    res.status(500).json({ message: "Failed to send order emails" });
  }
});

app.get("/api/admin/products", async (req, res) => {
  try {
    const [rows] = await db.promise().query("SELECT * FROM products");
    res.json(rows);
  } catch (err) {
    console.error("❌ Admin load products:", err);
    res.status(500).json({ message: "Server error" });
  }
});

app.post("/api/admin/products", async (req, res) => {
  const { id, brand, model, category, description, image, price, rating } = req.body;
  if (!id || !brand || !model || !category || !description || !image || !price)
    return res.status(400).json({ message: "All fields required" });

  try {
    await db.promise().query(
      "INSERT INTO products (id, brand, model, category, description, image, price, rating) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
      [id, brand, model, category, description, image, price, rating || 0]
    );
    res.json({ message: "✅ Product added successfully" });
  } catch (err) {
    console.error("❌ Add product:", err);
    res.status(500).json({ message: "Server error" });
  }
});

app.delete("/api/admin/products/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await db.promise().query("DELETE FROM products WHERE id = ?", [id]);
    res.json({ message: "🗑 Product deleted" });
  } catch (err) {
    console.error("❌ Delete product:", err);
    res.status(500).json({ message: "Server error" });
  }
});

app.put("/api/admin/products/:id", async (req, res) => {
  const { id } = req.params;
  const { brand, model, category, description, image, price, rating } = req.body;
  try {
    await db.promise().query(
      "UPDATE products SET id=?, brand=?, model=?, category=?, description=?, image=?, price=?, rating=? /*WHERE id=?*/",
      [id, brand, model, category, description, image, price, rating, id]
    );
    res.json({ message: "✅ Product updated" });
  } catch (err) {
    console.error("❌ Update product:", err);
    res.status(500).json({ message: "Server error" });
  }
});


app.get("/", (req, res) => res.send("✅ Server OK"));
app.listen(5000, () => console.log("🚀 Server running on port 5000"));
