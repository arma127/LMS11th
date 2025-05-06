import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

function CourseList() {
  const [courses, setCourses] = useState([]);
  const [enrollments, setEnrollments] = useState([]);

  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    if (user?.id) {
      fetchEnrollments(user.id);
    }
    fetchCourses();
  }, [user]);

  const fetchCourses = async () => {
    const response = await fetch("http://localhost:3001/courses");
    const data = await response.json();
    setCourses(data);
  };

  const fetchEnrollments = async (userId) => {
    const response = await fetch(`http://localhost:3001/enrollments?userId=${userId}`);
    const data = await response.json();
    setEnrollments(data);
  };

  const handleEnroll = async (course) => {
    if (!user?.id) {
      alert("Ошибка: пользователь не найден");
      return;
    }

    const newEnrollment = {
      userId: user.id,
      courseId: course.id,
      status: "pending"
    };

    const response = await fetch("http://localhost:3001/enrollments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newEnrollment),
    });

    if (response.ok) {
      fetchEnrollments(user.id);
    }
  };

  const handleUnenroll = async (course) => {
    const enrollment = enrollments.find((e) => e.courseId === course.id);
    if (enrollment) {
      await fetch(`http://localhost:3001/enrollments/${enrollment.id}`, {
        method: "DELETE",
      });
      fetchEnrollments(user.id);
    }
  };

  const isEnrolled = (courseId) =>
    enrollments.some((e) => e.courseId === courseId);

  return (
    <div>
      <ul className="course-list">
        {courses.map((course) => (
          <li key={course.id} className="course-card">
  {course.image && (
    <img src={course.image} alt={course.title} className="course-image" style={{ width: '200px', height: 'auto', borderRadius: '10px' }} />
  )}
  <h3>{course.title}</h3>
  <div className="course-description">{course.description}</div>
  {isEnrolled(course.id) ? (
    <button onClick={() => handleUnenroll(course)}>Отменить запись</button>
  ) : (
    <button onClick={() => handleEnroll(course)}>Записаться</button>
  )}
</li>

        ))}
      </ul>
    </div>
  );
}

export default CourseList;
