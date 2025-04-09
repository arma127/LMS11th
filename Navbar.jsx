import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../authReducer';

function Navbar() {
  const user = useSelector((state) => state.auth.user); 
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout()); 
    localStorage.removeItem('user'); 
    navigate('/login'); 
  };

  if (!user) {
    return null;
  }

  return (
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        {user.role === 'student' && (
          <li><Link to="/courses">Courses</Link></li>
        )}
        {user.role === 'teacher' && (
          <>
            <li><Link to="/update-courses">Update Courses</Link></li>
            <li><Link to="/courses">Courses</Link></li>
          </>
        )}
        {user.role === 'admin' && (
          <>
            <li><Link to="/user-list">Users</Link></li>
            <li><Link to="/delete-users">Delete Users</Link></li>
          </>
        )}
      </ul>
      <div className="logout-container"> 
        <button onClick={handleLogout}>Logout</button>
      </div>
    </nav>
  );
}

export default Navbar;
