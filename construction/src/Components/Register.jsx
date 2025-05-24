import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [form, setForm] = useState({ username: '', password: '', phone: '' });
  const navigate = useNavigate();

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const res = await fetch('https://e-commerce-construction.vercel.app/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      alert('Registered successfully! Please log in.');
      navigate('/login');
    } else {
      alert('Registration failed');
    }
  };

  return (
    <div className="container py-5" style={{ maxWidth: '400px' }}>
      <h2 className='mb-4 text-center'>Register</h2>
      <form onSubmit={handleSubmit}>
        <input className="form-control my-2" name="username" placeholder="Username" onChange={handleChange} required />
        <input className="form-control my-2" name="password" type="password" placeholder="Password" onChange={handleChange} required />
        <input className="form-control my-2" name="phone" placeholder="Phone Number" onChange={handleChange} required />
        <button className="btn btn-primary w-100 mb-3" type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
