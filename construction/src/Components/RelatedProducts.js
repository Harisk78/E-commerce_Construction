import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ProductGrid from './ProductGrid';

function RelatedProducts() {
  const { parentid } = useParams();
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [parentName, setParentName] = useState('');

  useEffect(() => {
    // Fetch related child products
    fetch(`http://localhost:5000/products/${parentid}/children`)
      .then(res => res.json())
      .then(data => setRelatedProducts(data))
      .catch(err => console.error(err));

    // Fetch parent product name
    fetch(`http://localhost:5000/products/${parentid}/name`)
      .then(res => res.json())
      .then(data => setParentName(data.name))
      .catch(err => console.error(err));
  }, [parentid]);

  return (
    <div>
      <h2 className="mb-4">Related Products for: <strong>{parentName}</strong></h2>
      <ProductGrid products={relatedProducts} />
      <p className='link-opacity-80-hover'><a href="/">{"<"}Back To Home Page</a></p>
    </div>
  );
}

export default RelatedProducts;
