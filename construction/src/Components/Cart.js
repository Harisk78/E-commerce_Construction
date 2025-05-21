import React, { useState, useEffect } from 'react';

const Cart = ({ searchQuery }) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const storedItems = localStorage.getItem('cart');
    if (storedItems) {
      setItems(JSON.parse(storedItems));
    }
  }, []);

  const handleRemove = (indexToRemove) => {
    const updatedItems = [...items];
    updatedItems.splice(indexToRemove, 1);
    setItems(updatedItems);
    localStorage.setItem('cart', JSON.stringify(updatedItems));
  };

  const filteredItems = items.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Your cart</h2>
      <div className="row row-cols-1 row-cols-md-3 g-4">
        {filteredItems.length > 0 ? (
          filteredItems.map((item, index) => (
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
                  <button className='btn btn-outline-success mb-2'>
                    <ion-icon name="bag-add-outline"></ion-icon>
                  </button>
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
