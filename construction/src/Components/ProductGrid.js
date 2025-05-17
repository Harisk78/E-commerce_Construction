import React from 'react';
import './style.css';

const ProductGrid = ({ products }) => {
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
            <input type="number" defaultValue={0} />
            <button><ion-icon name="cart-outline"></ion-icon></button>
            <button><ion-icon name="trending-up-outline"></ion-icon></button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductGrid;