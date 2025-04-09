import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function LessonList() {
  const { courseId } = useParams();
  const [lessons, setLessons] = useState([]);

  useEffect(() => {
    async function fetchLessons() {
      const response = await fetch(`http://localhost:3001/lessons?courseId=${courseId}`);
      const data = await response.json();
      setLessons(data);
    }

    fetchLessons();
  }, [courseId]);

  return (
    <div>
      <h1>Lessons</h1>
      <ul>
        {lessons.map((lesson) => (
          <li key={lesson.id}>{lesson.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default LessonList;
