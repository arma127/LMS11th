import React from 'react';
import { useSelector } from 'react-redux';

function Dashboard() {
  const user = useSelector((state) => state.auth.user);

  return (
    <div>
      <h1>Welcome to the Dashboard!</h1>
      <p>{`Hello, ${user.email}`}</p>
    </div>
  );
}

export default Dashboard;
