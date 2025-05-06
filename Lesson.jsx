import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { markLessonCompleted } from '../progressReducer';

function Lesson() {
  const { courseId, lessonId } = useParams();
  const [lesson, setLesson] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchLesson() {
      const res = await fetch(`http://localhost:3001/lessons/${lessonId}`);
      const data = await res.json();
      setLesson(data);
    }
    fetchLesson();
  }, [lessonId]);

  const handleComplete = () => {
    dispatch(markLessonCompleted(courseId, lesson.id));
    navigate(`/courses/${courseId}`);
  };

  if (!lesson) return <p>Загрузка...</p>;

  return (
    <div>
      <h2>{lesson.title}</h2>
      <img src={lesson.image} alt={lesson.title} width="300" />
      <p>{lesson.content}</p>
      <button onClick={handleComplete}>Отметить как пройдено</button>
    </div>
  );
}

export default Lesson;
