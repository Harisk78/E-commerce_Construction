import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import ProductGrid from './Components/ProductGrid.jsx';
import RelatedProducts from './Components/RelatedProducts.jsx';
import Cart from './Components/Cart.jsx';
import Login from './Components/Login.jsx';
import Register from './Components/Register.jsx';
import Admin from './Components/Admin.jsx'
import './Components/ProductGridStyle.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Img1 from './Images/img1.jpg';
import Img2 from './Images/img2.jpg';
import Img3 from './Images/img3.jpg';

const ProtectedRoute = ({ isLoggedIn, children }) => {
  const navigate = useNavigate();
  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login');
    }
  }, [isLoggedIn, navigate]);
  return isLoggedIn ? children : null;
};

function AppLayout({ products, searchQuery, setSearchQuery, handleLogout }) {
  return (
    <div className="container py-4">
      <div className="header bg-light shadow">
        <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
          <h1 className="mb-0">Products</h1>
          <div className="d-flex align-items-center gap-2 ms-auto">
            <div className="dropdown">
              <button className="btn btn-secondary dropdown-toggle button" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                What are you looking for
              </button>
              <ul className="dropdown-menu dropdown-menu-end">
                <li><Link className="dropdown-item button" to="/">Home</Link></li>
                {products && products.length > 0 ? (
                  products.map((product) => (
                    <li key={product.id}>
                      <Link className="dropdown-item button" to={`/related/${product.id}`}>
                        {product.name}
                      </Link>
                    </li>
                  ))
                ) : (
                  <li><span className="dropdown-item text-muted">Loading...</span></li>
                )}
              </ul>

            </div>
            <Link to="/cart" className="text-decoration-none">
              <button className="btn btn-outline-primary d-flex align-items-center gap-1 button">
                <ion-icon name="cart-outline"></ion-icon> Cart
              </button>
            </Link>
            <button className="btn btn-outline-danger d-flex align-items-center gap-1 button" onClick={handleLogout}>
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

        <Routes>
          <Route path="/" element={
            <ProductGrid products={products.filter(product => product.name.toLowerCase().includes(searchQuery.toLowerCase()))} />
          } />
          <Route path="/related/:productid" element={<RelatedProducts searchQuery={searchQuery} />} />
          <Route path="/cart" element={<Cart searchQuery={searchQuery} />} />
        </Routes>

        <footer className="bg-dark text-white text-center py-3 mt-5">
          <p className="mb-0">Copyright © 2025 | XYZ.com</p>
        </footer>
      </div>
    </div>
  );
}

function App() {
  const [products, setProducts] = useState([]);
  const [parentProducts, setParentProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(() => localStorage.getItem('isLoggedIn') === 'true');
  const [isAdmin, setIsAdmin] = useState(() => localStorage.getItem('isAdmin') === 'true');
  const navigate = useNavigate();

  useEffect(() => {
    fetch('https://e-commerce-construction-backend.vercel.app/products')
      .then(res => res.json())
      .then(data => Array.isArray(data) ? setProducts(data) : setProducts([]))
      .catch(() => setProducts([]));
  }, []);

  useEffect(() => {
  fetch('https://e-commerce-construction-backend.vercel.app/products/parent')
    .then(res => res.json())
    .then(data => {
      if (Array.isArray(data)) setParentProducts(data);
    })
    .catch((err) => {
      console.error("Failed to fetch parent products:", err);
      setParentProducts([]);
    });
  }, []);

  const handleLogin = (username, password) => {
    if (username === 'admin' && password === 'admin123') {
      setIsAdmin(true);
      localStorage.setItem('isAdmin', 'true');
      setIsLoggedIn(true);
      localStorage.setItem('isLoggedIn', 'true');
      navigate('/admin');
    } else {
      setIsAdmin(false);
      localStorage.setItem('isAdmin', 'false');
      setIsLoggedIn(true);
      localStorage.setItem('isLoggedIn', 'true');
      navigate('/');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setIsAdmin(false);
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('isAdmin');
    navigate('/login');
  };

  return (
    <Routes>
      <Route path="/login" element={<Login setIsAuthenticated={handleLogin} />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/admin"
        element={
          <ProtectedRoute isLoggedIn={isLoggedIn && isAdmin}>
            <Admin />
          </ProtectedRoute>
        }
      />
      <Route
        path="/*"
        element={
          <ProtectedRoute isLoggedIn={isLoggedIn}>
            <AppLayout
              products={products}
              parentProducts={parentProducts}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              handleLogout={handleLogout}
            />
          </ProtectedRoute>
        }
      />
      {/* <Route path='home' element={<ProductGrid products={products}/>}/> */}
    </Routes>
  );
}

export default function WrappedApp() {
  return (
    <Router>
      <App />
    </Router>
  );
}
