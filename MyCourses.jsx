import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function MyCourses() {
  const [myCourses, setMyCourses] = useState([]);
  const [allCourses, setAllCourses] = useState([]);
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    if (user?.id) {
      fetchEnrollments(user.id);
    }
    fetchCourses();
  }, [user]);

  const fetchCourses = async () => {
    const res = await fetch("http://localhost:3001/courses");
    const data = await res.json();
    setAllCourses(data);
  };

  const fetchEnrollments = async (id) => {
    const res = await fetch(`http://localhost:3001/enrollments?userId=${id}`);
    const data = await res.json();
    const approvedEnrollments = data.filter(
      (enroll) => enroll.status === "approved"
    );
    setMyCourses(approvedEnrollments);
  };

  const getCourse = (courseId) => {
    return allCourses.find((c) => c.id === courseId);
  };

  return (
    <div>
      <h2>Мои курсы</h2>
      <ul>
        {myCourses.map((enroll) => {
          const course = getCourse(enroll.courseId);
          return (
            <li key={enroll.id} style={{ marginBottom: "20px" }}>
              {course ? (
                <div>
                  <h3>{course.title}</h3>
                  <img
                    src={course.image}
                    alt={course.title}
                    style={{ width: "200px", borderRadius: "8px" }}
                  />
                  <p>{course.description}</p>
                  <button onClick={() => navigate(`/courses/${enroll.courseId}`)}>
                    Пройти курс
                  </button>
                </div>
              ) : (
                <p>Информация о курсе не найдена</p>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default MyCourses;

