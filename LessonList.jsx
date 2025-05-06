import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function LessonList() {
  const { courseId } = useParams();
  const [lessons, setLessons] = useState([]);
  const completedLessons = useSelector(state => state.progress.completedLessons[courseId] || []);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchLessons() {
      const response = await fetch(`http://localhost:3001/lessons?courseId=${courseId}`);
      const data = await response.json();
      setLessons(data);
    }
    fetchLessons();
  }, [courseId]);

  const progress = lessons.length
    ? Math.round((completedLessons.length / lessons.length) * 100)
    : 0;

  return (
    <div>
      <h2>Прогресс: {progress}%</h2>
      <ul>
        {lessons.map((lesson) => (
          <li key={lesson.id}>
            <h3>{lesson.title}</h3>
            <button onClick={() => navigate(`/courses/${courseId}/lessons/${lesson.id}`)}>Пройти</button>
            <p>Статус: {completedLessons.includes(lesson.id) ? 'Пройдено' : 'Не пройдено'}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default LessonList;
