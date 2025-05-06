import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

function UpdateCourses() {
  const [courses, setCourses] = useState([]);
  const user = useSelector((state) => state.auth.user);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [courseTitle, setCourseTitle] = useState('');
  const [courseDescription, setCourseDescription] = useState('');
  const [courseImage, setCourseImage] = useState('');

  useEffect(() => {
    const fetchCourses = async () => {
      const response = await fetch('http://localhost:3001/courses');
      const data = await response.json();
      const teacherCourses = data.filter(course => course.teacherId === user.id);
      setCourses(teacherCourses);
    };
    fetchCourses();
  }, [user.id]);

  const handleUpdate = async () => {
    const updatedCourse = {
      ...selectedCourse,
      title: courseTitle,
      description: courseDescription,
      image: courseImage,
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
    setCourseImage('');
    setSelectedCourse(null);
  };

  return (
    <form>
      <select
        value={selectedCourse?.id || ''}
        onChange={(e) => {
          const id = e.target.value;
          const course = courses.find((c) => c.id === id);
          setSelectedCourse(course);
          setCourseTitle(course?.title || '');
          setCourseDescription(course?.description || '');
          setCourseImage(course?.image || '');
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
          <input
            type="text"
            value={courseImage}
            onChange={(e) => setCourseImage(e.target.value)}
            placeholder="Image URL"
          />
          <br />
          <button type="button" onClick={handleUpdate}>Update</button>
        </div>
      )}
    </form>
  );
}

export default UpdateCourses;
