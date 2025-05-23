import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Login = ({ setIsAuthenticated }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = () => {
    setIsAuthenticated(username, password);
  };

  return (
    <div className="container py-5" style={{ maxWidth: '400px' }}>
      <h2 className="mb-4 text-center">Login</h2>
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <input
          type="password"
          className="form-control"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button className="btn btn-primary w-100 mb-3" onClick={handleSubmit}>
        Login
      </button>
      <div className="text-center">
        <p>
          New here?{' '}
          <Link to="/register" className="text-decoration-none">
            Register if you are new
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
