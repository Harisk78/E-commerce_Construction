import React, { useEffect, useState } from 'react';
import ProductGrid from './Components/ProductGrid';
import './Components/style.css';

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/products')
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <div className="header">
        <div></div>
        <h1>Products</h1>
        <div className="navbar">
          <button>Cart <ion-icon name="cart-outline"></ion-icon></button>
          <button>Logout <ion-icon name="log-out-outline"></ion-icon></button>
        </div>
      </div>
      
      <ProductGrid products={products} />
      <script
        type="module"
        src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.esm.js"
      ></script>
      <script
        noModule
        src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.js"
      ></script>
    </div>
  );
}

export default App;