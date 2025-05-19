import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ProductGrid from './Components/ProductGrid';
import './Components/ProductGridStyle.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import RelatedProducts from './Components/RelatedProducts.js'
import Img1 from './Images/img1.jpg';
import Img2 from './Images/img2.jpg';
import Img3 from './Images/img3.jpg';

function App() {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [parentProducts, setParentProducts] = useState([]);

  // Fetch all products
  useEffect(() => {
    fetch('http://localhost:5000/products')
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error(err));
  }, []);

  // Fetch parent products for dropdown
  useEffect(() => {
    fetch('http://localhost:5000/products/parents')
      .then(res => res.json())
      .then(data => setParentProducts(data))
      .catch(err => console.error('Failed to fetch parent products:', err));
  }, []);

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Router>
      <div className="container py-4">
        <div className="header bg-light shadow">
          <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
            <h1 className="mb-0">Products</h1>
            <div className="d-flex align-items-center gap-2 ms-auto">
              {/* Dropdown Navigation */}
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
                  <li>
                    <Link className="dropdown-item button" to="/">Home</Link>
                  </li>
                  {parentProducts.map((product) => (
                    <li key={product.id}>
                      <Link className="dropdown-item button" to={`/related/${product.id}`}>
                        {product.name}
                      </Link>
                    </li>
                  ))}
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

          {/* Search bar */}
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
          {/* Image Slider */}
          <div id="carouselExampleIndicators" className="carousel slide mb-4 slider" data-bs-ride="carousel">
            <div className="carousel-indicators">
              <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
              <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
              <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
            </div>
            <div className="carousel-inner rounded shadow">
              <div className="carousel-item active" data-bs-interval="3000">
                <img src={Img1} className="d-block w-100" alt="Promo 1" />
              </div>
              <div className="carousel-item" data-bs-interval="3000">
                <img src={Img2} className="d-block w-100" alt="Promo 2" />
              </div>
              <div className="carousel-item" data-bs-interval="3000">
                <img src={Img3} className="d-block w-100" alt="Promo 3" />
              </div>
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
              <span className="carousel-control-next-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>

          {/* Routes */}
          <Routes>
            <Route path="/" element={<ProductGrid products={filteredProducts} />} />
            <Route path="/related/:parentid" element={<RelatedProducts />} />
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
