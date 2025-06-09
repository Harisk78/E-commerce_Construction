import React, { useState } from 'react';

const AdminTable = ({ view, dataList, onEdit, onDelete }) => {
  const [mutedRequests, setMutedRequests] = useState([]);

  const toggleMute = (id) => {
    setMutedRequests(prev =>
      prev.includes(id) ? prev.filter(mid => mid !== id) : [...prev, id]
    );
  };

  const confirmDelete = (id) => {
    const confirm = window.confirm("Are you sure you want to delete this request?");
    if (confirm) onDelete(id);
  };

  const isMuted = (id) => mutedRequests.includes(id);

  return (
    <table className="table table-bordered">
      <thead>
        <tr>
          {view === 'category' && (<><th>ID</th><th>Name</th><th>Image</th><th>Actions</th></>)}
          {view === 'related' && (<><th>ID</th><th>Name</th><th>Image</th><th>Parent ID</th><th>Actions</th></>)}
          {view === 'users' && (<><th>ID</th><th>Username</th><th>Phone</th><th>Actions</th></>)}
          {view === 'requests' && (<><th>Request ID</th><th>Product</th><th>Username</th><th>Phone</th><th>Quantity</th><th>Actions</th></>)}
        </tr>
      </thead>
      <tbody>
        {Array.isArray(dataList) && view === 'category' && dataList.map((cat) => (
          <tr key={cat.id}>
            <td>{cat.id}</td>
            <td>{cat.name}</td>
            <td><img src={cat.imageUrl} height="40" alt="img" className="product-img"/></td>
            <td>
              <button className="btn btn-sm btn-warning mx-1" onClick={() => onEdit(cat)}>Edit</button>
              <button className="btn btn-sm btn-danger" onClick={() => onDelete(cat.id)}>Delete</button>
            </td>
          </tr>
        ))}

        {Array.isArray(dataList) && view === 'related' && dataList.map((prod) => (
          <tr key={prod.id}>
            <td>{prod.id}</td>
            <td>{prod.name}</td>
            <td><img src={prod.imageUrl || prod.image} height="40" alt={prod.name+" img"} /></td>
            <td>{prod.product_id}</td>
            <td>
              <button className="btn btn-sm btn-warning mx-1" onClick={() => onEdit(prod)}>Edit</button>
              <button className="btn btn-sm btn-danger" onClick={() => onDelete(prod.id)}>Delete</button>
            </td>
          </tr>
        ))}

        {Array.isArray(dataList) && view === 'users' && dataList.map((user) => (
          <tr key={user.id}>
            <td>{user.id}</td>
            <td>{user.username}</td>
            <td>{user.phone}</td>
            <td>
              <button className="btn btn-sm btn-warning mx-1" onClick={() => onEdit(user)}>Edit</button>
              <button className="btn btn-sm btn-danger" onClick={() => onDelete(user.id)}>Delete</button>
            </td>
          </tr>
        ))}

        {Array.isArray(dataList) && view === 'requests' && dataList.map((req) => (
          <tr key={req.id} className={isMuted(req.id) ? 'text-muted' : ''}>
            <td>{req.id}</td>
            <td>{req.product}</td>
            <td>{req.username}</td>
            <td>{req.phone}</td>
            <td>{req.quantity}</td>
            <td>
              <input
                type="checkbox"
                checked={isMuted(req.id)}
                onChange={() => toggleMute(req.id)}
                className="form-check-input me-2 pointer"
                title="Mute/Unmute"
              />
              <button
                className="btn btn-sm btn-light ms-2"
                title="Remove Request"
                onClick={() => confirmDelete(req.id)}
              >
                ❌
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default AdminTable;
