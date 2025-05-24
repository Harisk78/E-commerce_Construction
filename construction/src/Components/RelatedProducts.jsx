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
    fetch(`https://e-commerce-construction.vercel.app/products/${parentid}/name`)
      .then(res => res.json())
      .then(data => setParentName(data.name))
      .catch(err => console.error('Error fetching parent name:', err));

    fetch(`https://e-commerce-construction.vercel.app/relatedproducts/${parentid}`)
      .then(res => res.json())
      .then(data => {
        setRelatedProducts(data);
        const initialQuantities = {};
        data.forEach(p => (initialQuantities[p.id] = 1));
        setQuantities(initialQuantities);
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
  );

  return (
    <div className="container mt-4">
      <h2 className="mb-4">{parentName}</h2>
      <div className="row row-cols-1 row-cols-md-3 g-4">
        {filteredRelated.length > 0 ? (
          filteredRelated.map(product => (
            <div className="col" key={product.id}>
              <div className="card h-100 shadow-sm">
                {product.imageUrl && (
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="card-img-top"
                    style={{ height: '200px', objectFit: 'cover' }}
                  />
                )}
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
                    <button className="btn btn-outline-success w-50">
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
