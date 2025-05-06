import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../authReducer';

function Navbar() {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

return (
  <nav>
    <ul>
      {!user ? (
        <>
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/register">Register</Link></li>
        </>
      ) : (
        <>
          {user.role === 'student' && (
            <>
            <li><Link to="/profile">Profile</Link></li>
            <li><Link to="/courses">Courses</Link></li>
            <li><Link to="/my-courses">My courses</Link></li>
            </>
          )}
          {user.role === 'teacher' && (
            <>
            <li><Link to="/profile">Profile</Link></li>
            <li><Link to="/teacher/courses">Courses</Link></li>
              <li><Link to="/update-courses">Update Courses</Link></li>
              <li><Link to="/create-course">Create Course</Link></li>
              <li><Link to="/create-lesson">Create Lesson</Link></li>
              <li><Link to="/update-lesson">Update Lesson</Link></li>
            </>
          )}
          {user.role === 'admin' && (
            <>
            <li><Link to="/profile">Profile</Link></li>
            <li><Link to="/teacher/courses">Courses</Link></li>
              <li><Link to="/approve-enrollments">Approve enrollments</Link></li>
              <li><Link to="/user-list">Users</Link></li>
            </>
          )}
          <li><button onClick={() => dispatch(logout())}>Logout</button></li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;

