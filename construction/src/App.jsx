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
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


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
  const [isNavOpen, setIsNavOpen] = useState(false);

  const toggleNav = () => {
    setIsNavOpen(prev => !prev);
  };

  return (
    <>
      {/* Fixed Header */}
    <nav className="navbar navbar-expand-lg navbar-light bg-light shadow fixed-top">
      <div className="container-fluid d-flex flex-column">
        {/* Top Bar: Title + Hamburger */}
        <div className="d-flex justify-content-between align-items-center w-100">
          <div>
            <h1 className="mb-0 text-center text-success slide-title">Materon</h1>
            <span className='text-primaryn slide-title'>Built on Trust. Powered by Supply</span>
          </div>
          <button
            className="navbar-toggler d-lg-none"
            type="button"
            onClick={toggleNav}
          >
            {!isNavOpen ? (
              <span className="navbar-toggler-icon"></span>
            ) : (
              <span style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>✕</span>
            )}
          </button>
        </div>

        {/* Dropdown */}
        <div className="mt-2 w-100 d-lg-none px-3">
          <div className="dropdown">
            <button className="btn btn-secondary dropdown-toggle w-100 button" type="button" data-bs-toggle="dropdown">
              What are you looking for
            </button>
            <ul className="dropdown-menu w-100">
              <li><Link className="dropdown-item button" to="/">Home</Link></li>
              {products?.length > 0 ? (
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
        </div>

        {/* Mobile Hamburger Expanded Items (Cart + Logout) */}
        {isNavOpen && (
          <div className="w-100 d-lg-none px-3 mt-3">
            <Link to="/cart" className="text-decoration-none mb-2 d-block">
              <button className="btn btn-outline-primary w-100 d-flex align-items-center justify-content-center gap-1 button">
                <ion-icon name="cart-outline"></ion-icon> Cart
              </button>
            </Link>
            <button className="btn btn-outline-danger w-100 d-flex align-items-center justify-content-center gap-1 button" onClick={handleLogout}>
              <ion-icon name="log-out-outline"></ion-icon> Logout
            </button>
          </div>
        )}

        {/* Desktop Menu Buttons */}
        <div className="d-none d-lg-flex justify-content-end align-items-center gap-2 w-100 mt-2">
          <div className="dropdown">
            <button className="btn btn-secondary dropdown-toggle button" type="button" data-bs-toggle="dropdown">
              What are you looking for
            </button>
            <ul className="dropdown-menu dropdown-menu-end">
              <li><Link className="dropdown-item button" to="/">Home</Link></li>
              {products?.length > 0 ? (
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
          <Link to="/cart" className="text-decoration-none" style={{ transition: 'all 0.3s ease' }}>
            <button className="btn btn-outline-primary d-flex align-items-center gap-1 button">
              <ion-icon name="cart-outline"></ion-icon> Cart
            </button>
          </Link>
          <button className="btn btn-outline-danger d-flex align-items-center gap-1 button" onClick={handleLogout}>
            <ion-icon name="log-out-outline"></ion-icon> Logout
          </button>
        </div>
      </div>
    </nav>


      {/*Search Bar */}
      <div
        className="bg-light shadow-sm py-2 px-4 position-fixed w-100"
        style={{
          top: isNavOpen ? '220px' : '130px',
          zIndex: 1,
          transition: 'top 0.3s ease'
        }}
      >
        <div className="container">
          <input
            type="text"
            className="form-control"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>


      {/* Main Content Below Fixed Header + Search */}
      <div style={{ paddingTop: '200px',userSelect:'none' }} className="px-3">
        {/* Custom Two-Slide Carousel */}
<div id="customCarousel" className="carousel slide mb-4 slider" data-bs-ride="carousel" data-bs-touch="true">
  <div className="carousel-indicators">
    <button type="button" data-bs-target="#customCarousel" data-bs-slide-to="0" className="active" aria-current="true"></button>
    <button type="button" data-bs-target="#customCarousel" data-bs-slide-to="1"></button>
  </div>

  <div className="carousel-inner rounded shadow">
    {/* Slide 1 */}
    <div className="carousel-item active" data-bs-interval="4000">
      <div
        className="d-flex align-items-center justify-content-between px-5 py-4"
        style={{
          minHeight: "400px",
          background: "linear-gradient(135deg, #6dd5ed, #2193b0)",
          position: "relative"
        }}
      >
        {/* Left Content */}
        <div className="text-light col-md-6">
          <p className="fs-3 fw-bold">Discover Amazing Products</p>
          <div className="mt-3">
            <button className="btn btn-light me-2">Shop Now</button>
            <button className="btn btn-outline-light">Learn More</button>
          </div>
        </div>

        {/* Right Image */}
        <div className="col-md-5 position-relative">
          <img
            src={Img1}
            className="img-fluid rounded"
            alt="Slide 1"
            style={{ maxHeight: "300px", width: "100%" }}
          />
          {/* Transparent swipe zones */}
          <div
            className="position-absolute top-0 bottom-0 start-0"
            style={{ width: "15%", cursor: "pointer" }}
            data-bs-target="#customCarousel"
            data-bs-slide="prev"
          ></div>
          <div
            className="position-absolute top-0 bottom-0 end-0"
            style={{ width: "15%", cursor: "pointer" }}
            data-bs-target="#customCarousel"
            data-bs-slide="next"
          ></div>
        </div>
      </div>
    </div>

    {/* Slide 2 */}
    <div className="carousel-item" data-bs-interval="4000">
      <div
        className="d-flex align-items-center justify-content-between px-5 py-4"
        style={{
          minHeight: "400px",
          background: "linear-gradient(135deg, #ff9966, #ff5e62)",
          position: "relative"
        }}
      >
        {/* Left Content */}
        <div className="text-light col-md-6">
          <p className="fs-3 fw-bold">Fresh Deals Every Day</p>
          <div className="mt-3">
            <button className="btn btn-light me-2">View Deals</button>
            <button className="btn btn-outline-light">Subscribe</button>
          </div>
        </div>

        {/* Right Image */}
        <div className="col-md-5 position-relative">
          <img
            src={Img2}
            className="img-fluid rounded"
            alt="Slide 2"
            style={{ maxHeight: "300px", width: "100%" }}
          />
          {/* Transparent swipe zones */}
          <div
            className="position-absolute top-0 bottom-0 start-0"
            style={{ width: "15%", cursor: "pointer" }}
            data-bs-target="#customCarousel"
            data-bs-slide="prev"
          ></div>
          <div
            className="position-absolute top-0 bottom-0 end-0"
            style={{ width: "15%", cursor: "pointer" }}
            data-bs-target="#customCarousel"
            data-bs-slide="next"
          ></div>
        </div>
      </div>
    </div>
  </div>
</div>


        {/* Routes */}
        <Routes>
          <Route path="/" element={
            <ProductGrid products={products.filter(product => product.name.toLowerCase().includes(searchQuery.toLowerCase()))} />
          } />
          <Route path="/related/:productid" element={<RelatedProducts searchQuery={searchQuery} />} />
          <Route path="/cart" element={<Cart searchQuery={searchQuery} />} />
        </Routes>

        {/* Footer */}
        <footer className="bg-dark text-white text-center py-3 mt-5">
          <p className="mb-0">Copyright © 2025 | Materon.in</p>
        </footer>
      </div>
    </>
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
    <>
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
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}

export default function WrappedApp() {
  return (
    <Router>
      <App />
    </Router>
  );
}
