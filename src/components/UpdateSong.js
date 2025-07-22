
import React, { useState } from 'react';
import styled from '@emotion/styled';
import { useDispatch } from 'react-redux';
import { updateSongRequest, deleteSongRequest } from '../store/songsSlice';

// Styled inputs and buttons (reuse same styling pattern)
const Input = styled.input`
  margin-right: 8px;
  padding: 6px 10px;
  border-radius: 4px;
  border: 1px solid #ccc;
  width: 120px;
`;

const Button = styled.button`
  margin-left: 6px;
  padding: 6px 10px;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  font-weight: bold;
`;

const SaveButton = styled(Button)`
  background-color: #2e7d32;
  color: white;
  &:hover {
    background-color: #1b5e20;
  }
`;

const CancelButton = styled(Button)`
  background-color: #9e9e9e;
  color: white;
  &:hover {
    background-color: #757575;
  }
`;

const DeleteButton = styled(Button)`
  background-color: #b00020;
  color: white;
  &:hover {
    background-color: #7f0015;
  }
`;

const UpdateSong = ({ song }) => {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [editSong, setEditSong] = useState({ ...song });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditSong(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    if (!editSong.title || !editSong.artist || !editSong.album || !editSong.year) {
      alert('Please fill all fields before saving');
      return;
    }
    dispatch(updateSongRequest({ ...editSong, year: Number(editSong.year) }));
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditSong({ ...song });
    setIsEditing(false);
  };

  const handleDelete = () => {
    if (window.confirm(`Delete "${song.title}"?`)) {
      dispatch(deleteSongRequest(song.id));
    }
  };

  if (isEditing) {
    return (
      <li css={{ marginBottom: '10px' }}>
        <Input name="title" value={editSong.title} onChange={handleChange} />
        <Input name="artist" value={editSong.artist} onChange={handleChange} />
        <Input name="album" value={editSong.album} onChange={handleChange} />
        <Input name="year" type="number" value={editSong.year} onChange={handleChange} />

        <SaveButton onClick={handleSave}>Save</SaveButton>
        <CancelButton onClick={handleCancel}>Cancel</CancelButton>
      </li>
    );
  }

  // View mode:
  return (
    <li css={{ marginBottom: '10px' }}>
      <strong>{song.title}</strong> by {song.artist} ({song.year})
      <Button css={{ marginLeft: 12 }} onClick={() => setIsEditing(true)}>
        Edit
      </Button>
      <DeleteButton onClick={handleDelete}>Delete</DeleteButton>
    </li>
  );
};

export default UpdateSong;
