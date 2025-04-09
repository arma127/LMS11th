import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import bcrypt from 'bcryptjs';

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  async function handleRegister(e) {
    e.preventDefault();
  
    setIsLoading(true);
    setError('');

    try {
      const hashedPassword = await bcrypt.hash(password, 10);

      const requestData = {
        email,
        password: hashedPassword,
        role,
      };

      const response = await fetch('http://localhost:3001/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });

      if (response.ok) {
        alert('успешно');
        navigate('/login');
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'ошибка');
      }
    } catch (err) {
      setError('ошибка');
      console.error('Error:', err);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="regWrapper">
      <div className="regContainer">
        <div>
          <h2 className="regTitle">
            Регистрация
          </h2>
        </div>

        {error && (
          <div className="errorMsg" role="alert">
            <span className="errorText">{error}</span>
          </div>
        )}

        <form className="regForm" onSubmit={handleRegister}>
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
                placeholder="Email"
              />
            </div>
            <div>
              <label htmlFor="password" className="hiddenLabel">Пароль</label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="inputField midField"
                placeholder="Пароль"
              />
            </div>
            
            <div>
              <label htmlFor="role" className="hiddenLabel">Роль</label>
              <select
                id="role"
                name="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                required
                className="inputField bottomField"
              >
                <option value="student">Студент</option>
                <option value="teacher">Преподаватель</option>
              </select>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="regBtn"
            >
              {isLoading ? 'Регистрация...' : 'Зарегистрироваться'}
            </button>
          </div>

          <div className="loginLinkBox">
            <p className="loginText">
              <Link to="/login" className="loginLink">
                Войти
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;