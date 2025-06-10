import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminForm from './AdminForm.jsx';
import AdminTable from './AdminTable.jsx';

const Admin = () => {
  const navigate = useNavigate();
  const [view, setView] = useState('category');
  const [dataList, setDataList] = useState([]);
  const [formData, setFormData] = useState({});
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchData();
  }, [view]);

  const fetchData = async () => {
    let url = '';
    if (view === 'category') url = 'https://e-commerce-construction-backend.vercel.app/products';
    else if (view === 'related') url = 'https://e-commerce-construction-backend.vercel.app/relatedproducts';
    else if (view === 'users') url = 'https://e-commerce-construction-backend.vercel.app/users';
    else if (view === 'requests') url = 'https://e-commerce-construction-backend.vercel.app/requests';

    try {
      const res = await fetch(url);
      const data = await res.json();
      setDataList(data);
    } catch (err) {
      console.error('Fetch error', err);
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = async (e) => {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData(prev => ({
        ...prev,
        image: reader.result.split(',')[1] // Get base64 string
      }));
    };
    reader.readAsDataURL(file);
  }
};


  const handleAddOrUpdate = async () => {
    let url = '';
    let method = editId ? 'PUT' : 'POST';
    if (view === 'category') url = `https://e-commerce-construction-backend.vercel.app/products${editId ? `/${editId}` : ''}`;
    else if (view === 'related') url = `https://e-commerce-construction-backend.vercel.app/relatedproducts${editId ? `/${editId}` : ''}`;
    else if (view === 'users') url = `https://e-commerce-construction-backend.vercel.app/users${editId ? `/${editId}` : ''}`;

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
    if (view === 'category') url = `https://e-commerce-construction-backend.vercel.app/products/${id}`;
    else if (view === 'related') url = `https://e-commerce-construction-backend.vercel.app/relatedproducts/${id}`;
    else if (view === 'users') url = `https://e-commerce-construction-backend.vercel.app/users/${id}`;
    else if (view === 'requests') url = `https://e-commerce-construction-backend.vercel.app/requests/${id}`;

    const res = await fetch(url, { method: 'DELETE' });
    if (res.ok) {
      alert('Item deleted successfully');
      fetchData();
    } else {
      alert('Failed to delete item');
    }
  };

  return (
    <div>
      <nav className="navbar navbar-dark bg-dark fixed-top d-flex justify-content-between px-3">
        <h4 className="text-white">Admin</h4>
        <button className="btn btn-danger" onClick={() => navigate('/login')}>Logout</button>
      </nav>

      <div className="container" style={{ marginTop: '80px' }}>
        <div className="d-flex justify-content-between mb-4">
          <button className={`btn mx-1 ${view === 'category' ? 'btn-primary' : 'btn-outline-info'}`} onClick={() => setView('category')}>Category</button>
          <button className={`btn mx-1 ${view === 'related' ? 'btn-primary' : 'btn-outline-info'}`} onClick={() => setView('related')}>Related Products</button>
          <button className={`btn mx-1 ${view === 'users' ? 'btn-primary' : 'btn-outline-info'}`} onClick={() => setView('users')}>User Details</button>
          <button className={`btn mx-1 ${view === 'requests' ? 'btn-primary' : 'btn-outline-info'}`} onClick={() => setView('requests')}>User Requests</button>
        </div>

        <AdminForm view={view} formData={formData} handleChange={handleInputChange} handleFileChange={handleFileChange}/>
        {view !== 'requests' && <button className="btn btn-success mb-3" onClick={handleAddOrUpdate}>{editId ? 'Update' : 'Add'}</button>}

        <AdminTable view={view} dataList={dataList} onEdit={handleEdit} onDelete={handleDelete} />
      </div>
    </div>
  );
};

export default Admin;
