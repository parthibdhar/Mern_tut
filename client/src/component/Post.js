
import React, { useState } from 'react';
import axios from 'axios';

const Post = () => {
    const [name, setName] = useState('');
  const [age, setAge] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    axios.post('http://localhost:5000/post', { name, age })
      .then(response => {
        window.alert('Data saved');
      });
  };
  return (
    <div> <form onSubmit={handleSubmit}>
    <label>
      Name:
      <input type="text" value={name} onChange={e => setName(e.target.value)} />
    </label>
    <br />
    <label>
      Age:
      <input type="text" value={age} onChange={e => setAge(e.target.value)} />
    </label>
    <br />
    <button type="submit">Add Person</button>
  </form></div>
  )
}

export default Post