import React, { useState, useEffect } from 'react';

const Cart = ({ searchQuery }) => {
  const [items, setItems] = useState([]);
  const [quantities, setQuantities] = useState({});
  

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


  const filteredItems = Array.isArray(items)
  ? items.filter(item =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
  : [];


  const handleSendRequest = async (product, quantity) => {
  const user_id = localStorage.getItem('user_id');
  const username = localStorage.getItem('username');
  const phone = localStorage.getItem('phone');
  // console.log(user_id);
  if (!user_id) {
    alert('Please login first');
    
    return;
  }

  try {
    // Step 1: Get user details from backend using user_id
    // const userRes = await fetch(`https://e-commerce-construction-backend.vercel.app/users/${user_id}`);
    // const user = await userRes.json();
    // if (!user || !user.username || !user.phone) {
    //   alert('User details not found');
    //   return;
    // }

    // Step 2: Send user request to backend    
    const response = await fetch('https://e-commerce-construction-backend.vercel.app/requests', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        user_id,
        username,
        phone,
        product: product.name,
        quantity
      })
    });

    if (response.ok) {
      alert('Request sent successfully');
    } else {
      alert('Failed to send request');
    }
  } catch (error) {
    console.error('Error sending request:', error);
    alert('Something went wrong');
  }
};

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
                  <label>Quantity:</label>
                  <input
                    type="number"
                    min="1"
                    value={quantities[item.productId] || item.quantity || 1}
                    onChange={(e) =>
                      setQuantities({ ...quantities, [item.productId]: parseInt(e.target.value) })
                    }
                    className="form-control mb-2"
                  />
                  <button 
                    className='btn btn-outline-success mb-2' 
                    onClick={() => handleSendRequest(item, quantities[item.productId] || item.quantity || 1)}>
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
