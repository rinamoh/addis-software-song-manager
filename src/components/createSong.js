
import React, { useState } from 'react';
import { css } from '@emotion/react'; // for ad-hoc styles
import styled from '@emotion/styled';
import { useDispatch } from 'react-redux';
import { createSongRequest } from '../store/songsSlice';

// Styled wrapper for form container
const FormWrapper = styled.div`
  background-color: #f5f5f5;
  padding: 16px;
  margin-bottom: 20px;
  border-radius: 6px;
  max-width: 400px;
`;

// Styled input fields with Emotion styled API
const Input = styled.input`
  padding: 8px 12px;
  margin-bottom: 12px;
  width: 100%;
  box-sizing: border-box;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

// Styled button
const Button = styled.button`
  background-color: #6200ee;
  color: #fff;
  font-size: 16px;
  border: none;
  padding: 10px 14px;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: #3700b3;
  }
`;

const CreateSong = () => {
  const dispatch = useDispatch();

  // Local state to hold form values
  const [song, setSong] = useState({
    title: '',
    artist: '',
    album: '',
    year: '',
  });

  // Update state on input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSong(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation: all fields required
    if (!song.title || !song.artist || !song.album || !song.year) {
      alert('Please fill all fields');
      return;
    }

    // Dispatch createSongRequest with numeric year
    dispatch(createSongRequest({
      ...song,
      year: Number(song.year),
    }));

    // Reset form to empty
    setSong({
      title: '',
      artist: '',
      album: '',
      year: '',
    });
  };

  return (
    <FormWrapper>
      <form onSubmit={handleSubmit}>
        <Input
          type="text"
          name="title"
          value={song.title}
          placeholder="Title"
          onChange={handleChange}
        />
        <Input
          type="text"
          name="artist"
          value={song.artist}
          placeholder="Artist"
          onChange={handleChange}
        />
        <Input
          type="text"
          name="album"
          value={song.album}
          placeholder="Album"
          onChange={handleChange}
        />
        <Input
          type="number"
          name="year"
          value={song.year}
          placeholder="Year"
          onChange={handleChange}
        />
        <Button type="submit">Add Song</Button>
      </form>
    </FormWrapper>
  );
};

export default CreateSong;
