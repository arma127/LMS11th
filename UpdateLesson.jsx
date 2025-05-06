import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

function UpdateLesson() {
  const user = useSelector((state) => state.auth.user);
  const [courses, setCourses] = useState([]);
  const [lessons, setLessons] = useState([]);
  const [selectedCourseId, setSelectedCourseId] = useState('');
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState('');

  useEffect(() => {
    fetch('http://localhost:3001/courses')
      .then((res) => res.json())
      .then((data) => {
        const teacherCourses = data.filter(c => c.teacherId === user.id);
        setCourses(teacherCourses);
      });
  }, [user]);

  useEffect(() => {
    if (selectedCourseId) {
      fetch('http://localhost:3001/lessons')
        .then((res) => res.json())
        .then((data) => {
          const filtered = data.filter(lesson => lesson.courseId === selectedCourseId);
          setLessons(filtered);
        });
    }
  }, [selectedCourseId]);

  const handleLessonSelect = (lessonId) => {
    const lesson = lessons.find(l => l.id === lessonId);
    if (lesson) {
      setSelectedLesson(lesson);
      setTitle(lesson.title);
      setContent(lesson.content);
      setImage(lesson.image || '');
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result); // base64 image
    };
    reader.readAsDataURL(file);
  };

  const handleUpdate = async () => {
    const updatedLesson = {
      ...selectedLesson,
      title,
      content,
      image,
    };

    const res = await fetch(`http://localhost:3001/lessons/${selectedLesson.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedLesson),
    });

    if (res.ok) {
      alert('Lesson updated');
      setLessons(lessons.map(l => l.id === selectedLesson.id ? updatedLesson : l));
      setSelectedLesson(null);
      setTitle('');
      setContent('');
      setImage('');
    } else {
      alert('Error updating lesson');
    }
  };

  return (
    <div>
      <h2>Update Lesson</h2>

      <label>
        Select Course:
        <select value={selectedCourseId} onChange={(e) => {
          setSelectedCourseId(e.target.value);
          setSelectedLesson(null);
        }}>
          <option value="">-- Select --</option>
          {courses.map(course => (
            <option key={course.id} value={course.id}>{course.title}</option>
          ))}
        </select>
      </label>

      {lessons.length > 0 && (
        <label>
          Select Lesson:
          <select value={selectedLesson?.id || ''} onChange={(e) => handleLessonSelect(e.target.value)}>
            <option value="">-- Select --</option>
            {lessons.map(lesson => (
              <option key={lesson.id} value={lesson.id}>{lesson.title}</option>
            ))}
          </select>
        </label>
      )}

      {selectedLesson && (
        <div>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
          <br />
          <textarea
            placeholder="Content"
            value={content}
            onChange={e => setContent(e.target.value)}
            rows="4"
            cols="50"
          />
          <br />
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
          />
          {image && (
            <div>
              <img
                src={image}
                alt="Lesson Preview"
                style={{ width: '150px', height: '150px', objectFit: 'cover', marginTop: '10px' }}
              />
            </div>
          )}
          <br />
          <button onClick={handleUpdate}>Update Lesson</button>
        </div>
      )}
    </div>
  );
}

export default UpdateLesson;
