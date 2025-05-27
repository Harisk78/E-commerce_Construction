import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const cartItems = [];

export const getCartItems = () => {
  const stored = localStorage.getItem('cart');
  return stored ? JSON.parse(stored) : [];
};

const RelatedProducts = ({ searchQuery }) => {
  const { parentid } = useParams();
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [parentName, setParentName] = useState('');
  const [quantities, setQuantities] = useState({});

  useEffect(() => {
    fetch(`https://e-commerce-construction-backend.vercel.app/products/${parentid}/name`)
      .then(res => res.json())
      .then(data => setParentName(data.name))
      .catch(err => console.error('Error fetching parent name:', err));

    fetch(`https://e-commerce-construction-backend.vercel.app/relatedproducts/${parentid}`)
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
  }, [parentid]);

  const handleQuantityChange = (id, value) => {
    setQuantities(prev => ({ ...prev, [id]: parseInt(value) || 1 }));
  };

  const handleAddToCart = product => {
  const quantity = quantities[product.id] || 1;
  const currentCart = getCartItems();
  const updatedCart = [...currentCart, { ...product, quantity }];
  localStorage.setItem('cart', JSON.stringify(updatedCart));
  alert(`${product.name} added to cart`);
};

  const filteredRelated = relatedProducts.filter(p =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleSendRequest = async (product) => {
  const quantity = quantities[product.id] || 1;
  const username = localStorage.getItem('username');
  const phone = localStorage.getItem('phone');

  if (!username || !phone) {
    alert('User not logged in. Please login or register.');
    return;
  }

  try {
    const response = await fetch('https://e-commerce-construction-backend.vercel.app/requests', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        product: product.name,
        quantity,
        username,
        phone
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to send request');
    }

    alert('Your request has been sent to the admin.');
  } catch (error) {
    console.error('Error:', error);
    alert('Failed to send your request.');
  }
};


  return (
    <div className="container mt-4">
      <h2 className="mb-4">{parentName}</h2>
      <div className="row row-cols-1 row-cols-md-3 g-4">
        {filteredRelated.map(products=>console.log(products.name))}
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
                      className="btn btn-outline-success w-50"
                      onClick={() => handleSendRequest(product)}
                    >
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
