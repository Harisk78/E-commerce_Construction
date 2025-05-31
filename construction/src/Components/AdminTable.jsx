import React from 'react';

const AdminTable = ({ view, dataList, onEdit, onDelete }) => {
  return (
    <table className="table table-bordered">
      <thead>
        <tr>
          {view === 'category' && (<><th>ID</th><th>Name</th><th>Image</th><th>Actions</th></>)}
          {view === 'related' && (<><th>ID</th><th>Name</th><th>Image</th><th>Parent ID</th><th>Actions</th></>)}
          {view === 'users' && (<><th>ID</th><th>Username</th><th>Phone</th><th>Actions</th></>)}
          {view === 'requests' && (<><th>Request ID</th><th>Product</th><th>Username</th><th>Phone</th><th>Quantity</th></>)}
        </tr>
      </thead>
      <tbody>
        {view === 'category' && dataList.map((cat) => (
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

        {view === 'related' && dataList.map((prod) => (
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
        {view === 'users' && dataList.map((user) => (
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
        {view === 'requests' && dataList.map((req) => (
          <tr key={req.id}>
            <td>{req.id}</td>
            <td>{req.product}</td>
            <td>{req.username}</td>
            <td>{req.phone}</td>
            <td>{req.quantity}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default AdminTable;
