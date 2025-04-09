import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

function UpdateCourses() {
  const [courses, setCourses] = useState([]);
  const user = useSelector((state) => state.auth.user);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [courseTitle, setCourseTitle] = useState('');
  const [courseDescription, setCourseDescription] = useState('');

  useEffect(() => {
    const fetchCourses = async () => {
      const response = await fetch('http://localhost:3001/courses');
      const data = await response.json();
      setCourses(data);
    };
    fetchCourses();
  }, []);

  const handleUpdate = async () => {
    const updatedCourse = {
      ...selectedCourse,
      title: courseTitle,
      description: courseDescription,
    };

    await fetch(`http://localhost:3001/courses/${selectedCourse.id}`, {
      method: 'PUT',
      body: JSON.stringify(updatedCourse),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    setCourses(
      courses.map((course) =>
        course.id === selectedCourse.id ? updatedCourse : course
      )
    );
    setCourseTitle('');
    setCourseDescription('');
    setSelectedCourse(null);
  };

  if (user?.role !== 'teacher') {
    return <p>YOU DO NOT HAVE RIGHTS</p>;
  }

  return (
    <div>
      <h2>Update Courses</h2>
      <select
        value={selectedCourse?.id || ''}
        onChange={(e) => {
          const id = e.target.value;
          const course = courses.find((c) => c.id === id);
          setSelectedCourse(course);
          setCourseTitle(course?.title || '');
          setCourseDescription(course?.description || '');
        }}
      >
        <option value="">Select a course</option>
        {courses.map((course) => (
          <option key={course.id} value={course.id}>
            {course.title}
          </option>
        ))}
      </select>

      {selectedCourse && (
        <div>
          <input
            type="text"
            value={courseTitle}
            onChange={(e) => setCourseTitle(e.target.value)}
            placeholder="New course title"
          />
          <br />
          <textarea
            value={courseDescription}
            onChange={(e) => setCourseDescription(e.target.value)}
            placeholder="New course description"
            rows="4"
            cols="50"
          />
          <br />
          <button onClick={handleUpdate}>Update</button>
        </div>
      )}
    </div>
  );
}

export default UpdateCourses;
