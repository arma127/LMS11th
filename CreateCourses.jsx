import React, { useState } from 'react';
import { useSelector } from 'react-redux';

function CreateCourse() {
  const user = useSelector((state) => state.auth.user);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(''); // base64 image string

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result); // base64 string
    };
    reader.readAsDataURL(file);
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!title || !description || !image) return;

    const newCourse = {
      title,
      description,
      image,
      teacherId: user?.id,
    };

    const response = await fetch('http://localhost:3001/courses', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newCourse),
    });

    if (response.ok) {
      alert('Course is created');
      setTitle('');
      setDescription('');
      setImage('');
    } else {
      alert('Error creating course');
    }
  };

  return (
    <div>
      <form onSubmit={handleCreate}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        /><br />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        /><br />
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
        /><br />
        {image && (
          <img
            src={image}
            alt="Preview"
            style={{ width: '150px', height: '150px', objectFit: 'cover' }}
          />
        )}
        <br />
        <button type="submit">Create</button>
      </form>
    </div>
  );
}

export default CreateCourse;
