import React, { useEffect, useState } from 'react';
import './style.css';

const ProductGrid = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/products')
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error('Failed to fetch products:', err));
  }, []);

  return (
    <div className="whole">
      {products.map((product, index) => (
        <div className="b" key={index}>
          <div className="pic">
            <img src={product.imageUrl} alt={product.name} />
          </div>
          <div className="title">
            <p>{product.name}</p>
          </div>
          <div className="buttons">
            <input type="number" min="0" defaultValue={0} />
            <button onClick={()=>{alert("Added to Cart")}}><ion-icon name="cart-outline"></ion-icon></button>
            <button><ion-icon name="trending-up-outline"></ion-icon></button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductGrid;