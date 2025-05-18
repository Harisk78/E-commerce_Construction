import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ProductGrid from './Components/ProductGrid';
import './Components/ProductGridStyle.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';


function App() {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetch('http://localhost:5000/products')
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error(err));
  }, []);

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Router>
      <div className="container py-4">
        <div className="header">
          <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
            <h1 className="mb-0">Products</h1>
            <div className="d-flex align-items-center gap-2 ms-auto">
              <div className="dropdown">
                <button
                  className="btn btn-secondary dropdown-toggle button"
                  type="button"
                  id="dropdownMenuButton"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Navigate
                </button>
                <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuButton">
                  <li><Link className="dropdown-item button" to="/">Home</Link></li>
                  <li><Link className="dropdown-item button" to="/category1">Category 1</Link></li>
                  <li><Link className="dropdown-item button" to="/category2">Category 2</Link></li>
                  <li><Link className="dropdown-item button" to="/category3">Category 3</Link></li>
                  <li><Link className="dropdown-item button" to="/category4">Category 4</Link></li>
                  <li><Link className="dropdown-item button" to="/category5">Category 5</Link></li>
                </ul>
              </div>

              <button className="btn btn-outline-primary d-flex align-items-center gap-1 button">
                <ion-icon name="cart-outline"></ion-icon> Cart
              </button>
              <button className="btn btn-outline-danger d-flex align-items-center gap-1 button">
                <ion-icon name="log-out-outline"></ion-icon> Logout
              </button>
            </div>
          </div>

          <div className="container my-4">
            <input
              type="text"
              className="form-control"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="mt-header">
          <Routes>
            <Route path="/" element={<ProductGrid products={filteredProducts} />} />
            <Route path="/category1" element={<h2>Category 1 Page</h2>} />
            <Route path="/category2" element={<h2>Category 2 Page</h2>} />
            <Route path="/category3" element={<h2>Category 3 Page</h2>} />
            <Route path="/category4" element={<h2>Category 4 Page</h2>} />
            <Route path="/category5" element={<h2>Category 5 Page</h2>} />
          </Routes>

          <footer className="bg-dark text-white text-center py-3 mt-5">
            <p className="mb-0">Copyright © 2025 | XYZ.com</p>
          </footer>
        </div>
      </div>
    </Router>
  );
}

export default App;
