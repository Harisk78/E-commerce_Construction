import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const RelatedProducts = () => {
  const { parentid } = useParams();
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [parentName, setParentName] = useState('');

  useEffect(() => {
    fetch(`http://localhost:5000/products/${parentid}/name`)
      .then(res => res.json())
      .then(data => setParentName(data.name))
      .catch(err => console.error('Error fetching parent name:', err));

    fetch(`http://localhost:5000/relatedproducts/${parentid}`)
      .then(res => res.json())
      .then(data => setRelatedProducts(data))
      .catch(err => console.error('Error fetching related products:', err));
  }, [parentid]);

  return (
    <div className="container mt-4">
      <h2 className="mb-4">{parentName}</h2>
      <div className="row row-cols-1 row-cols-md-3 g-4">
        {relatedProducts.length > 0 ? (
          relatedProducts.map(product => (
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
                  <div className="mt-auto d-flex justify-content-around align-items-center gap-4">
                    <button className="btn btn-outline-primary w-50"><ion-icon name="cart-outline"></ion-icon></button>
                    <button className="btn btn-outline-success w-50"><ion-icon name="bag-add-outline"></ion-icon></button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No related products found.</p>
        )}
      </div>
      <p className='link-opacity-80-hover'><a href="/">Back to Home</a></p>
    </div>
  );
};

export default RelatedProducts;
