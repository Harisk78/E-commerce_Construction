import React from 'react';

const AdminForm = ({ view, formData, handleChange, handleFileChange }) => {
  if (view === 'category') {
    return (
      <>
        <input
          name="name"
          value={formData.name || ''}
          onChange={handleChange}
          placeholder="Category Name"
          className="form-control my-2"
        />
        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleFileChange}
          className="form-control my-2"
        />
      </>
    );
  }

  if (view === 'related') {
    return (
      <>
        <input
          name="name"
          value={formData.name || ''}
          onChange={handleChange}
          placeholder="Product Name"
          className="form-control my-2"
        />
        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleFileChange}
          className="form-control my-2"
        />
        <input
          name="product_id"
          value={formData.product_id || ''}
          onChange={handleChange}
          placeholder="Parent ID"
          className="form-control my-2"
        />
      </>
    );
  }

  if (view === 'users') {
    return (
      <>
        <input
          name="username"
          value={formData.username || ''}
          onChange={handleChange}
          placeholder="Username"
          className="form-control my-2"
        />
        <input
          name="password"
          value={formData.password || ''}
          onChange={handleChange}
          placeholder="Password"
          type="password"
          className="form-control my-2"
        />
        <input
          name="phone"
          value={formData.phone || ''}
          onChange={handleChange}
          placeholder="Phone Number"
          className="form-control my-2"
        />
      </>
    );
  }

  return null;
};

export default AdminForm;
