import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

function CreateLesson() {
  const user = useSelector((state) => state.auth.user);
  const [courses, setCourses] = useState([]);
  const [courseId, setCourseId] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState('');

  useEffect(() => {
    fetch('http://localhost:3001/courses')
      .then((res) => res.json())
      .then((data) => {
        const teacherCourses = data.filter(c => c.teacherId === user.id);
        setCourses(teacherCourses);
        if (teacherCourses.length > 0) setCourseId(teacherCourses[0].id);
      });
  }, [user]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result); // base64
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newLesson = {
      courseId,
      title,
      content,
      image,
    };

    const res = await fetch('http://localhost:3001/lessons', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newLesson),
    });

    if (res.ok) {
      alert('Lesson is created');
      setTitle('');
      setContent('');
      setImage('');
    } else {
      alert('Error');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Course:
          <select value={courseId} onChange={e => setCourseId(e.target.value)}>
            {courses.map(c => (
              <option key={c.id} value={c.id}>{c.title}</option>
            ))}
          </select>
        </label>
        <div>
          <input
            type="text"
            placeholder="Lesson Title"
            value={title}
            onChange={e => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <textarea
            placeholder="Lesson Content"
            value={content}
            onChange={e => setContent(e.target.value)}
            required
          />
        </div>
        <div>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
          />
        </div>
        {image && (
          <img
            src={image}
            alt="Preview"
            style={{ width: '150px', height: '150px', objectFit: 'cover' }}
          />
        )}
        <button type="submit">Create</button>
      </form>
    </div>
  );
}

export default CreateLesson;

