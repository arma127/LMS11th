import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

function LessonList() {
  const { courseId } = useParams(); // Получаем ID курса из URL
  const [lessons, setLessons] = useState([]);

  useEffect(() => {
    async function fetchLessons() {
      const response = await fetch(`http://localhost:3001/lessons?courseId=${courseId}`);
      const data = await response.json();
      setLessons(data);
    }
    fetchLessons();
  }, [courseId]); // Перезапрашиваем уроки при изменении courseId

  return (
    <div>
      <h1>Уроки курса</h1>
      <ul>
        {lessons.map((lesson) => (
          <li key={lesson.id} className="lesson-card">
            <div className="lesson-info">
              {/* Если есть изображение, показываем его */}
              {lesson.image && <img src={lesson.image} alt={lesson.title} style={{ width: '100px', height: '100px', objectFit: 'cover' }} />}
              <div className="lesson-text">
                <h3>{lesson.title}</h3>
                <p>{lesson.content}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default LessonList;
