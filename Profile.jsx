import React, { useState } from 'react';
import { useSelector } from 'react-redux';

function Profile() {
  const user = useSelector((state) => state.auth.user);
  const [email, setEmail] = useState(user.email);
  const [image, setImage] = useState(user.image || '');
  const [isEditing, setIsEditing] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result); // Base64 строка
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedUser = {
      id: user.id,
      email,
      image,
      password: user.password,
      role: user.role,
    };

    const res = await fetch(`http://localhost:3001/users/${user.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedUser),
    });

    if (res.ok) {
      alert('Профиль обновлен');
      setIsEditing(false);
    } else {
      alert('Ошибка при обновлении профиля');
    }
  };

  return (
    <div>
      <h1>Профиль пользователя</h1>
      <div>
        <img
          src={image || 'https://via.placeholder.com/150'}
          alt="Avatar"
          style={{ width: '150px', height: '150px', objectFit: 'cover' }}
        />
      </div>
      <div>
        <p><strong>Email:</strong> {email}</p>
        <p><strong>Роль:</strong> {user.role}</p>
      </div>

      {isEditing ? (
        <form onSubmit={handleSubmit}>
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
            <label>Avatar:</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />
            {image && (
              <img
                src={image}
                alt="Avatar preview"
                style={{
                  width: '100px',
                  height: '100px',
                  objectFit: 'cover',
                  marginTop: '10px',
                }}
              />
            )}
          </div>
          <button type="submit">Сохранить изменения</button>
        </form>
      ) : (
        <button onClick={() => setIsEditing(true)}>Изменить</button>
      )}
    </div>
  );
}

export default Profile;
