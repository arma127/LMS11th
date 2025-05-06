import React, { useEffect, useState } from "react";

function ApproveEnrollments() {
  const [enrollments, setEnrollments] = useState([]);
  const [courses, setCourses] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchEnrollments();
    fetchCourses();
    fetchUsers();
  }, []);

  const fetchEnrollments = async () => {
    const res = await fetch("http://localhost:3001/enrollments?status=pending");
    const data = await res.json();
    setEnrollments(data);
  };

  const fetchCourses = async () => {
    const res = await fetch("http://localhost:3001/courses");
    const data = await res.json();
    setCourses(data);
  };

  const fetchUsers = async () => {
    const res = await fetch("http://localhost:3001/users");
    const data = await res.json();
    setUsers(data);
  };

  const getCourseName = (id) => {
    const course = courses.find((c) => c.id === id);
    return course ? course.description : "Курс не найден";
  };

  const getUserName = (id) => {
    const user = users.find((u) => u.id === id);
    return user ? user.name || user.username : "Пользователь не найден";
  };

  const approve = async (enrollId) => {
    await fetch(`http://localhost:3001/enrollments/${enrollId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status: "approved" }), 
    });
    fetchEnrollments();
  };
  

  return (
    <div>
      <h2>Заявки на курсы</h2>
      {enrollments.length === 0 ? (
        <p>Нет необработанных заявок</p>
      ) : (
        <ul>
          {enrollments.map((enroll) => (
            <li key={enroll.id}>
              {getUserName(enroll.userId)} — {getCourseName(enroll.courseId)}
              <button onClick={() => approve(enroll.id)}>Одобрить</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ApproveEnrollments;
