import React, { useEffect, useState } from 'react';
import {useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// const cartItems = [];

export const getCartItems = () => {
  const stored = localStorage.getItem('cart');
  return stored ? JSON.parse(stored) : [];
};

const RelatedProducts = ({ searchQuery }) => {
  const { productid } = useParams();
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [parentName, setParentName] = useState('');
  const [quantities, setQuantities] = useState({});

  useEffect(() => {
    fetch(`https://e-commerce-construction-backend.vercel.app/products/${productid}/name`)
      .then(res => res.json())
      .then(data => setParentName(data.name))
      .catch(err => console.error('Error fetching parent name:', err));

    fetch(`https://e-commerce-construction-backend.vercel.app/relatedproducts/${productid}`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
      setRelatedProducts(data);
      const initialQuantities = {};
      data.forEach(p => (initialQuantities[p.id] = 1));
      setQuantities(initialQuantities);
    } else {
      console.error('Expected array, got:', data);
      setRelatedProducts([]); // Set to empty array to avoid runtime error
    }
      })
      .catch(err => console.error('Error fetching related products:', err));
  }, [productid]);

  const handleQuantityChange = (id, value) => {
    setQuantities(prev => ({ ...prev, [id]: parseInt(value) || 1 }));
  };

  const handleAddToCart = async (product) => {
  const userId = localStorage.getItem('user_id');
  const quantity = quantities[product.id] || 1;

  if (!userId) {
    toast.info("Please Login First");
    return;
  }

  try {
    const response = await fetch('https://e-commerce-construction-backend.vercel.app/add-to-cart', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId,
        productId: product.id,
        productName: product.name,
        quantity,
        image: product.imageUrl // already in base64 from DB
      })
    });

    if (response.ok) {
      toast.success(`${product.name} added to cart`);
    } else {
      toast.error('Failed to add to cart');
    }
  } catch (error) {
    console.error('Error adding to cart:', error);
    toast.error('Something went wrong');
  }
};


  const filteredRelated = relatedProducts.filter(p =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

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
      <h2 className="mb-4">{parentName}</h2>
      <div className="row row-cols-1 row-cols-md-3 g-4">
        {filteredRelated.length > 0 ? (
          filteredRelated.map(product => (
              <div className="col" key={product.id}>
              <div className="card h-100 shadow-sm">
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="card-img-top"
                    style={{ height: '200px', objectFit: 'cover' }}
                  />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{product.name}</h5>
                  <input
                    type="number"
                    min="1"
                    className="form-control mb-2"
                    value={quantities[product.id] || 1}
                    onChange={e => handleQuantityChange(product.id, e.target.value)}
                  />
                  <div className="mt-auto d-flex justify-content-around align-items-center gap-2">
                    <button
                      className="btn btn-outline-primary w-50"
                      onClick={() => handleAddToCart(product)}
                    >
                      <ion-icon name="cart-outline"></ion-icon>
                    </button>
                    <button
                      className="btn btn-outline-success"
                      onClick={() => handleSendRequest(product, quantities[product.id])}>
                      <ion-icon name="bag-add-outline"></ion-icon>
                    </button>

                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No related products found.</p>
        )}
      </div>
      <p className="link-opacity-80-hover">
        <a href="/">Back to Home</a>
      </p>
    </div>
  );
};

export default RelatedProducts;
