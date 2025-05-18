import React, { useEffect, useState } from 'react';
import ProductGrid from './Components/ProductGrid';
import './Components/ProductGridStyle.css';

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/products')
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="container py-4">
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
              <li><a className="dropdown-item button" href="#">Home</a></li>
              <li><a className="dropdown-item button" href="#">Category 1</a></li>
              <li><a className="dropdown-item button" href="#">Category 2</a></li>
              <li><a className="dropdown-item button" href="#">Category 3</a></li>
              <li><a className="dropdown-item button" href="#">Category 4</a></li>
              <li><a className="dropdown-item button" href="#">Category 5</a></li>
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
        />

      </div>
      <ProductGrid products={products} />
      <footer className="bg-dark text-white text-center py-3 mt-5">
        <p className="mb-0">Copyright © 2025 | XYZ.com</p>
      </footer>
    </div>
  );
}

export default App;
