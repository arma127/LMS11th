import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function TeacherCourseList() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    async function fetchCourses() {
      const response = await fetch('http://localhost:3001/courses');
      const data = await response.json();
      setCourses(data);
    }
    fetchCourses();
  }, []);

  return (
    <div>
      <h1>Список курсов</h1>
      <ul className="course-list">
        {courses.map((course) => (
          <li key={course.id} className="course-card">
            {/* Используем Link для перехода на страницу с уроками */}
            <Link to={`/teacher/courses/${course.id}`}>
            {course.image && (
                <img
                  src={course.image}
                  alt={course.title}
                  style={{ width: '200px', height: 'auto', borderRadius: '10px' }}
                />
              )}</Link>
              <div className="course-title">{course.title}</div>
            <div className="course-description">{course.description}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TeacherCourseList;
