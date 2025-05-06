import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import CourseList from './components/CourseList';  // Только для студентов
import LessonList from './components/LessonList';  // Только для студентов
import UserList from './components/UserList';
import UpdateCourses from './components/UpdateCourses';
import CreateCourse from './components/CreateCourse';
import CreateLesson from './components/CreateLesson';
import ApproveEnrollments from './components/ApproveEnrollments';
import MyCourses from './components/MyCourses';
import Lesson from './components/Lesson';
import TeacherCourseList from './components/TeacherCourseList'; // Для учителей
import TeacherLessonList from './components/TeacherLessonList';
import UpdateLesson from './components/UpdateLesson';
import Profile from './components/Profile';
import './styles.css';

function App() {
  const user = useSelector((state) => state.auth.user);

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/login" />} />
        <Route path="/profile" element={user ? <Profile /> : <Navigate to="/login" />} />
        {/* Только для студентов */}
        {user && user.role === 'student' && (
          <>
            <Route path="/courses" element={<CourseList />} />
            <Route path="/courses/:courseId" element={<LessonList />} />
            <Route path="/my-courses" element={<MyCourses />} />
            <Route path="/courses/:courseId/lessons/:lessonId" element={<Lesson />} />
          </>
        )}

        {/* Маршруты для администратора */}
        {user && user.role === 'admin' && (
          <>
          <Route path="/teacher/courses" element={<TeacherCourseList />} /> {/* Список курсов для учителя */}
          <Route path="/teacher/courses/:courseId" element={<TeacherLessonList />} />
            <Route path="/user-list" element={<UserList />} />
            <Route path="/approve-enrollments" element={<ApproveEnrollments />} />
          </>
        )}

        {/* Маршруты для учителей */}
        {user && user.role === 'teacher' && (
          <>
            <Route path="/teacher/courses" element={<TeacherCourseList />} /> {/* Список курсов для учителя */}
            <Route path="/teacher/courses/:courseId" element={<TeacherLessonList />} /> {/* Список уроков для курса */}
            <Route path="/update-courses" element={<UpdateCourses />} />
            <Route path="/update-lesson" element={<UpdateLesson/>} />
            <Route path="/create-course" element={<CreateCourse />} />
            <Route path="/create-lesson" element={<CreateLesson />} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
