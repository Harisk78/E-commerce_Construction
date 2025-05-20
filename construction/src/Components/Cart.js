import React, { useState, useEffect } from 'react';
import { getCartItems } from './RelatedProducts';

let cartItemsRef = getCartItems();

const Cart = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    setItems([...cartItemsRef]);
  }, []);

  const handleRemove = (indexToRemove) => {
    cartItemsRef.splice(indexToRemove, 1); // Remove from shared cart reference
    setItems([...cartItemsRef]);           // Refresh local state
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Your cart</h2>
      <div className="row row-cols-1 row-cols-md-3 g-4">
        {items.length > 0 ? (
          items.map((item, index) => (
            <div className="col" key={index}>
              <div className="card h-100 shadow-sm">
                {item.imageUrl && (
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="card-img-top"
                    style={{ height: '200px', objectFit: 'cover' }}
                  />
                )}
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{item.name}</h5>
                  <p>Quantity: {item.quantity}</p>
                  <button
                    className="btn btn-outline-danger mt-auto"
                    onClick={() => handleRemove(index)}
                  >
                    Remove from cart
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>Your cart is empty.</p>
        )}
      </div>
      <p className='link-opacity-80-hover'><a href="/">Back to Home</a></p>
    </div>
  );
};

export default Cart;
