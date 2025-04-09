import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../authReducer';
import { useNavigate, Link } from 'react-router-dom';
import bcrypt from 'bcryptjs';

function LoginPage() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('http://localhost:3001/users');
      if (!response.ok) {
        throw new Error('errror');
      }

      const users = await response.json();
      const user = users.find((user) => user.email === email);

      if (!user) {
        setError('Неверный email или пароль');
        return;
      }

      const isPasswordCorrect = await bcrypt.compare(password, user.password);

      if (!isPasswordCorrect) {
        setError('Неверный email или пароль');
        return;
      }

      dispatch(login(user));
      localStorage.setItem('user', JSON.stringify(user));

      if (user.role === 'admin') {
        navigate('/user-list');
      } else if (user.role === 'teacher') {
        navigate('/update-courses');
      } else {
        navigate('/courses');
      }
    } catch (error) {
      setError('error');
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="loginWrapper">
      <div className="loginContainer">
        <div>
          <h2 className="loginTitle">
            Вход
          </h2>
        </div>

        {error && (
          <div className="errorMsg" role="alert">
            <span className="errorText">{error}</span>
          </div>
        )}

        <form className="loginForm" onSubmit={handleLogin}>
          <div className="fieldsBox">
            <div>
              <label htmlFor="email-address" className="hiddenLabel">Email</label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="inputField topField"
                placeholder="Your email"
              />
            </div>
            <div>
              <label htmlFor="password" className="hiddenLabel">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="inputField bottomField"
                placeholder="Your password"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="loginBtn"
            >
              {isLoading ? 'Вход...' : 'Войти'}
            </button>
          </div>

          <div className="registerLinkBox">
            <p className="registerText">
              <Link to="/register" className="registerLink">
                Зарегистрироваться
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;