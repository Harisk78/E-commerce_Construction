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
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchData();
  }, [view]);

  const fetchData = async () => {
    let url = '';
    if (view === 'category') url = 'https://e-commerce-construction.vercel.app/products';
    else if (view === 'related') url = 'https://e-commerce-construction.vercel.app/relatedproducts';
    else if (view === 'users') url = 'https://e-commerce-construction.vercel.app/users';
    else if (view === 'requests') url = 'https://e-commerce-construction.vercel.app/requests';

    const res = await fetch(url);
    const data = await res.json();
    if (view === 'category') setCategories(data);
    else if (view === 'related') setRelatedProducts(data);
    else if (view === 'users') setUsers(data);
    else if (view === 'requests') setRequests(data);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddOrUpdate = async () => {
    let url = '';
    let method = editId ? 'PUT' : 'POST';
    if (view === 'category') url = `https://e-commerce-construction.vercel.app/products${editId ? `/${editId}` : ''}`;
    else if (view === 'related') url = `https://e-commerce-construction.vercel.app/relatedproducts${editId ? `/${editId}` : ''}`;
    else if (view === 'users') url = `https://e-commerce-construction.vercel.app/users${editId ? `/${editId}` : ''}`;

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      alert(editId ? 'Item updated successfully' : 'Item added successfully');
      fetchData();
      setFormData({});
      setEditId(null);
    } else {
      alert('Failed to submit data');
    }
  };

  const handleEdit = (item) => {
    setFormData(item);
    setEditId(item.id);
  };

  const handleDelete = async (id) => {
    let url = '';
    if (view === 'category') url = `https://e-commerce-construction.vercel.app/products/${id}`;
    else if (view === 'related') url = `https://e-commerce-construction.vercel.app/relatedproducts/${id}`;
    else if (view === 'users') url = `https://e-commerce-construction.vercel.app/users/${id}`;

    const res = await fetch(url, { method: 'DELETE' });
    if (res.ok) {
      alert('Item deleted successfully');
      fetchData();
    } else {
      alert('Failed to delete item');
    }
  };

  const renderForm = () => {
    if (view === 'category') {
      return (
        <>
          <input name="name" value={formData.name || ''} onChange={handleInputChange} placeholder="Category Name" className="form-control my-2" />
          <input name="image" value={formData.image || ''} onChange={handleInputChange} placeholder="Image URL" className="form-control my-2" />
        </>
      );
    } else if (view === 'related') {
      return (
        <>
          <input name="name" value={formData.name || ''} onChange={handleInputChange} placeholder="Product Name" className="form-control my-2" />
          <input name="image" value={formData.image || ''} onChange={handleInputChange} placeholder="Image URL" className="form-control my-2" />
          <input name="parent_id" value={formData.parent_id || ''} onChange={handleInputChange} placeholder="Parent ID" className="form-control my-2" />
        </>
      );
    } else if (view === 'users') {
      return (
        <>
          <input name="username" value={formData.username || ''} onChange={handleInputChange} placeholder="Username" className="form-control my-2" />
          <input name="password" value={formData.password || ''} onChange={handleInputChange} placeholder="Password" className="form-control my-2" type="password" />
          <input name="phone" value={formData.phone || ''} onChange={handleInputChange} placeholder="Phone Number" className="form-control my-2" />
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
        <div className="d-flex justify-content-between mb-4">
          <button className="btn btn-outline-primary mx-1" onClick={() => setView('category')}>Category</button>
          <button className="btn btn-outline-primary mx-1" onClick={() => setView('related')}>Related Products</button>
          <button className="btn btn-outline-primary mx-1" onClick={() => setView('users')}>User Details</button>
          <button className="btn btn-outline-primary mx-1" onClick={() => setView('requests')}>User Requests</button>
        </div>

        {renderForm()}
        {(view !== 'requests') && <button className="btn btn-success mb-3" onClick={handleAddOrUpdate}>{editId ? 'Update' : 'Add'}</button>}

        <table className="table table-bordered">
          <thead>
            <tr>
              {view === 'category' && (<><th>ID</th><th>Name</th><th>Image</th><th>Actions</th></>) }
              {view === 'related' && (<><th>ID</th><th>Name</th><th>Image</th><th>Parent ID</th><th>Actions</th></>) }
              {view === 'users' && (<><th>ID</th><th>Username</th><th>Phone</th><th>Actions</th></>) }
              {view === 'requests' && (<><th>Request ID</th><th>Product</th><th>Username</th><th>Quantity</th></>) }
            </tr>
          </thead>
          <tbody>
            {view === 'category' && categories.map((cat) => (
              <tr key={cat.id}><td>{cat.id}</td><td>{cat.name}</td><td><img src={cat.imageUrl || cat.image} height="40" /></td>
              <td><button onClick={() => handleEdit(cat)} className="btn btn-sm btn-warning mx-1">Edit</button><button onClick={() => handleDelete(cat.id)} className="btn btn-sm btn-danger">Delete</button></td></tr>
            ))}
            {view === 'related' && relatedProducts.map((prod) => (
              <tr key={prod.id}><td>{prod.id}</td><td>{prod.name}</td><td><img src={prod.imageUrl || prod.image} height="40" /></td><td>{prod.parent_id}</td>
              <td><button onClick={() => handleEdit(prod)} className="btn btn-sm btn-warning mx-1">Edit</button><button onClick={() => handleDelete(prod.id)} className="btn btn-sm btn-danger">Delete</button></td></tr>
            ))}
            {view === 'users' && users.map((user) => (
              <tr key={user.id}><td>{user.id}</td><td>{user.username}</td><td>{user.phone}</td>
              <td><button onClick={() => handleEdit(user)} className="btn btn-sm btn-warning mx-1">Edit</button><button onClick={() => handleDelete(user.id)} className="btn btn-sm btn-danger">Delete</button></td></tr>
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
