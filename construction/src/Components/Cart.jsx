import React, { useState, useEffect } from 'react';

const Cart = ({ searchQuery }) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
  const userId = localStorage.getItem('user_id');
  if (!userId) return;

  fetch(`https://e-commerce-construction-backend.vercel.app/cart/${userId}`)
    .then(res => res.json())
    .then(data => {
      setItems(data);
    })
    .catch(err => {
      console.error('Error fetching cart items:', err);
    });
}, []);


  const handleRemove = (productId) => {
  const userId = localStorage.getItem('user_id');
  if (!userId) return;

  fetch(`https://e-commerce-construction-backend.vercel.app/cart/${userId}/${productId}`, {
    method: 'DELETE'
  })
    .then(res => res.json())
    .then(() => {
      const updatedItems = items.filter(item => item.productId !== productId);
      setItems(updatedItems);
    })
    .catch(err => console.error('Error removing item:', err));
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
                    onClick={() => handleRemove(item.productId)}
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
