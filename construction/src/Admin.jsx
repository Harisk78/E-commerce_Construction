import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Admin = () => {
  const navigate = useNavigate();
  const [view, setView] = useState('category');
  const [categories, setCategories] = useState([]);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [requests, setRequests] = useState([]);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    fetchData();
  }, [view]);

  const fetchData = async () => {
    if (view === 'category') {
      const res = await fetch('https://e-commerce-construction.vercel.app/products/parents');
      const data = await res.json();
      setCategories(data);
    } else if (view === 'related') {
      const res = await fetch('https://e-commerce-construction.vercel.app/products');
      const data = await res.json();
      setRelatedProducts(data);
    } else if (view === 'users') {
      const res = await fetch('https://e-commerce-construction.vercel.app/users');
      const data = await res.json();
      setUsers(data);
    } else if (view === 'requests') {
      const res = await fetch('https://e-commerce-construction.vercel.app/requests');
      const data = await res.json();
      setRequests(data);
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAdd = async () => {
    let url = '';
    if (view === 'category') url = 'https://e-commerce-construction.vercel.app/products';
    else if (view === 'related') url = 'https://e-commerce-construction.vercel.app/relatedproducts';
    else if (view === 'users') url = 'https://e-commerce-construction.vercel.app/users';

    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      alert('Item added successfully');
      fetchData();
      setFormData({});
    } else {
      alert('Failed to add item');
    }
  };

  const renderForm = () => {
    if (view === 'category') {
      return (
        <>
          <input name="name" onChange={handleInputChange} placeholder="Category Name" className="form-control my-2" />
          <input name="image" onChange={handleInputChange} placeholder="Image URL" className="form-control my-2" />
        </>
      );
    } else if (view === 'related') {
      return (
        <>
          <input name="name" onChange={handleInputChange} placeholder="Product Name" className="form-control my-2" />
          <input name="image" onChange={handleInputChange} placeholder="Image URL" className="form-control my-2" />
          <input name="parent_id" onChange={handleInputChange} placeholder="Parent ID" className="form-control my-2" />
        </>
      );
    } else if (view === 'users') {
      return (
        <>
          <input name="username" onChange={handleInputChange} placeholder="Username" className="form-control my-2" />
          <input name="password" onChange={handleInputChange} placeholder="Password" className="form-control my-2" type="password" />
          <input name="phone" onChange={handleInputChange} placeholder="Phone Number" className="form-control my-2" />
        </>
      );
    }
    return null;
  };

  return (
    <div>
      <nav className="navbar navbar-dark bg-dark fixed-top d-flex justify-content-between px-3">
        <h4 className="text-white">Admin</h4>
        <button className="btn btn-danger" onClick={() => navigate('/login')}>Logout</button>
      </nav>
      <div className="container" style={{ marginTop: '80px' }}>
        <div className="btn-group mb-4">
          <button className="btn btn-outline-primary" onClick={() => setView('category')}>Category</button>
          <button className="btn btn-outline-primary" onClick={() => setView('related')}>Related Products</button>
          <button className="btn btn-outline-primary" onClick={() => setView('users')}>User Details</button>
          <button className="btn btn-outline-primary" onClick={() => setView('requests')}>User Requests</button>
        </div>

        {renderForm()}
        {(view !== 'requests') && <button className="btn btn-success mb-3" onClick={handleAdd}>Add</button>}

        <table className="table table-bordered">
          <thead>
            <tr>
              {view === 'category' && (<><th>ID</th><th>Name</th><th>Image</th></>)}
              {view === 'related' && (<><th>ID</th><th>Name</th><th>Image</th><th>Parent ID</th></>)}
              {view === 'users' && (<><th>ID</th><th>Username</th><th>Phone</th></>)}
              {view === 'requests' && (<><th>Request ID</th><th>Product</th><th>Username</th><th>Quantity</th></>)}
            </tr>
          </thead>
          <tbody>
            {view === 'category' && categories.map((cat) => (
              <tr key={cat.id}><td>{cat.id}</td><td>{cat.name}</td><td><img src={cat.imageUrl} height="40" /></td></tr>
            ))}
            {view === 'related' && relatedProducts.map((prod) => (
              <tr key={prod.id}><td>{prod.id}</td><td>{prod.name}</td><td><img src={prod.imageUrl} height="40" /></td><td>{prod.parent_id}</td></tr>
            ))}
            {view === 'users' && users.map((user) => (
              <tr key={user.id}><td>{user.id}</td><td>{user.username}</td><td>{user.phone}</td></tr>
            ))}
            {view === 'requests' && requests.map((req) => (
              <tr key={req.id}><td>{req.id}</td><td>{req.product}</td><td>{req.username}</td><td>{req.quantity}</td></tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Admin;
