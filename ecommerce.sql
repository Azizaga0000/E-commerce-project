CREATE DATABASE IF NOT EXISTS ecommerce;

USE ecommerce;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100),
  surname VARCHAR(100),
  email VARCHAR(150) UNIQUE,
  username VARCHAR(100),
  password VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  brand VARCHAR(100),
  model VARCHAR(100),
  category VARCHAR(100) NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  rating FLOAT DEFAULT 0,
  image VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE cart (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  product_id INT NOT NULL,
  quantity INT DEFAULT 1,
  added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
  UNIQUE KEY uq_cart (user_id, product_id)
);

INSERT INTO products (brand, model, category, description, price, rating, image) VALUES
('Hanes', 'Hanes Cotton T-Shirt', 'Clothing', 'Comfortable cotton T-shirt.', 19.99, 4.7, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_-IQfXrAPnZHMXjldTR-j7iVw5W1U0nEQCg&s'),
('Nike', 'Nike Running Shoes', 'Footwear', 'Lightweight running shoes.', 89.99, 4.8, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQoVNOWlQ9B_PHf-nCpoCv9FaOzRcOU6Oq4Bw&s'),
('Samsonite', 'Samsonite Backpack', 'Accessories', 'Durable backpack for travel.', 79.99, 4.6, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmnqZRYJw4woscg_RB6PHvGXz7NYhAyshOrA&s'),
('Apple', 'iPad Pro 11"', 'Tablets', 'Powerful tablet for professionals.', 899.99, 4.9, 'https://kontakt.az/media/catalog/product/cache/a404967cc40694dc557cd869288440a4/N/e/New-Project-31_1_1.jpg');

