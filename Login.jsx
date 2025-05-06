import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../authReducer';
import { useNavigate } from 'react-router-dom';
import bcrypt from 'bcryptjs';

function Login() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  async function handleLogin (e) {
    e.preventDefault();
    const response = await fetch('http://localhost:3001/users');
    const users = await response.json();
    const user = users.find((user) => user.email === email);

    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
        localStorage.setItem("user", JSON.stringify(user));
        dispatch(login(user));
        navigate('/dashboard');
        return;
      }else{
        alert('Invalid password')
      }
    } else {
      alert('Invalid email');
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
      />
      <button type="submit">Login</button>
    </form>
  );
}

export default Login;
