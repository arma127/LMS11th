import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

function DeleteUsers() {
  const [users, setUsers] = useState([]);
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch('http://localhost:3001/users');
      const data = await response.json();
      const filteredUsers = data.filter((u) => u.id !== user?.id);
      setUsers(filteredUsers);
    };
    fetchUsers();
  }, [user?.id]); 

  const handleDelete = async (userId) => {
    await fetch(`http://localhost:3001/users/${userId}`, {
      method: 'DELETE',
    });
    setUsers(users.filter((u) => u.id !== userId));
  };

  if (user?.role !== 'admin') {
    return <p>YOU DON'T HAVE RIGHTS</p>;
  }

  return (
    <div>
      <h2>Delete Users</h2>
      <ul>
        {users.map((u) => (
          <li key={u.id}>
            {u.name} ({u.email})
            <button onClick={() => handleDelete(u.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DeleteUsers;
