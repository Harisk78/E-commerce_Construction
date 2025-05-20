import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './ProductGridStyle.css';

function RelatedProducts() {
  const { parentid } = useParams();
  const [related, setRelated] = useState([]);
  const [parentName, setParentName] = useState('');

  // Fetch related products
  useEffect(() => {
    fetch(`http://localhost:5000/products/${parentid}/children`)
      .then(res => res.json())
      .then(data => setRelated(data))
      .catch(err => console.error('Error fetching related products:', err));
  }, [parentid]);

  // Fetch parent product name
  useEffect(() => {
    fetch(`http://localhost:5000/products/${parentid}/name`)
      .then(res => res.json())
      .then(data => setParentName(data.name))
      .catch(err => console.error('Error fetching parent name:', err));
  }, [parentid]);

  return (
    <div>
      <h2>{parentName ? `${parentName}` : 'Loading...'}</h2>
      <div className="row">
        {related.length === 0 ? (
          <p>No related products found.</p>
        ) : (
          related.map(product => (
            <div key={product.id} className="col-md-3 mb-4">
              <div className="card shadow h-100">
                <img src={product.imageUrl} className="card-img-top" alt={product.name} />
                <div className="card-body">
                  <h5 className="card-title text-center">{product.name}</h5>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      <p className='link-opacity-80-hover'><a href="/">Back to Home</a></p>
    </div>
  );
}

export default RelatedProducts;
