import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Navbar from './components/Navbar';
import LoginPage from './components/Login';
import RegisterPage from './components/Register';
import Dashboard from './components/Dashboard';
import CourseList from './components/CourseList';
import LessonList from './components/LessonList';
import UserList from './components/UserList';
import DeleteUsers from './components/DeleteUsers';
import UpdateCourses from './components/UpdateCourses';

function App() {
  const user = useSelector((state) => state.auth.user);

  return (
    <>
      {user && <Navbar />}
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        
        {user ? (
          <>
            <Route path="/" element={<Dashboard />} />
            {user.role === 'student' && <Route path="/courses" element={<CourseList />} />}
            {user.role === 'teacher' && <Route path="/update-courses" element={<UpdateCourses />} />}
            {user.role === 'admin' && <Route path="/user-list" element={<UserList />} />}
            {user.role === 'admin' && <Route path="/delete-users" element={<DeleteUsers />} />}
            <Route path="/courses/:courseId" element={<LessonList />} />
          </>
        ) : (
          <Route path="*" element={<Navigate to="/login" />} />
        )}
      </Routes>
    </>
  );
}

export default App;