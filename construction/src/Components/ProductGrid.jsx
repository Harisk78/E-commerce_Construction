import React from 'react';
import './ProductGridStyle.css';
import { Link } from 'react-router-dom';

const ProductGrid = ({ products }) => {
  return (
    <div className="container py-4">
      {products.length === 0 ? (
        <div className="text-center mt-5">
          <h4>No Results Found</h4>
        </div>
      ) : (
        <div className="row g-4">
          {products.map((product, index) => (
            <div className="col-12 col-sm-6 col-md-4" key={index}>
              <div className="card h-100 shadow-sm">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="card-img-top"
                  style={{ height: '250px', objectFit: 'cover' }}
                />
                <div className="card-body d-flex flex-column justify-content-between">
                  <h5 className="card-title text-center">{product.name}</h5>
                  <div className="d-flex justify-content-around align-items-center mt-3">
                    {/* <input
                      type="number"
                      min="0"
                      defaultValue={0}
                      className="form-control w-25 quantity"
                    /> */}
                    <Link to={`/related/${product.id}`}>
                      <button className="btn btn-outline-secondary button">
                        <ion-icon name="trending-up-outline"></ion-icon>
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductGrid;
