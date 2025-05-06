import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import bcrypt from 'bcryptjs';

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student');
  const [image, setImage] = useState('');
  const navigate = useNavigate();

  // Обработчик для загрузки изображения в формате Base64
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result); // Преобразуем файл в строку Base64
      };
      reader.readAsDataURL(file); // Чтение файла как Base64
    }
  };

  // Обработчик регистрации
  async function handleRegister(e) {
    e.preventDefault();
    const hashedPassword = await bcrypt.hash(password, 10);

    const requestData = {
      email,
      password: hashedPassword,
      role,
      image, // Отправляем Base64 изображение
    };

    const response = await fetch('http://localhost:3001/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestData),
    });

    if (response.ok) {
      alert('Регистрация прошла успешно! Войдите в аккаунт.');
      navigate('/login');
    } else {
      alert('Ошибка регистрации. Попробуйте снова.');
    }
  }

  return (
    <div>
      <h2>Регистрация</h2>
      <form onSubmit={handleRegister}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Пароль:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Роль:</label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
          >
            <option value="student">Student</option>
            <option value="teacher">Teacher</option>
          </select>
        </div>

        <div>
          <label>Avatar:</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            required
          />
          {image && (
            <img
              src={image}
              alt="Avatar preview"
              style={{ width: '100px', height: '100px', objectFit: 'cover', marginTop: '10px' }}
            />
          )}
        </div>

        <button type="submit">Зарегистрироваться</button>
      </form>
    </div>
  );
}

export default Register;
