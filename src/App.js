// src/App.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSongsRequest } from './store/songsSlice';


const App = () => {
  const dispatch = useDispatch();

  // Step 1: Get the songs data from the Redux state
  const songs = useSelector((state) => state.songs.list);
  const loading = useSelector((state) => state.songs.loading);
  const error = useSelector((state) => state.songs.error);

  // Step 2: Dispatch fetchSongs when component loads
  useEffect(() => {
    dispatch(fetchSongsRequest());
  }, [dispatch]);

  {!loading && Array.isArray(songs) && songs.length === 0 && <p>No songs found.</p>}

  // Step 3: Show UI based on state
  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial, sans-serif' }}>
      <h1>🎵 Song Manager</h1>

      {loading && <p>Loading songs...</p>}
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}

      {!loading && songs.length === 0 && <p>No songs found.</p>}

      <ul>
        {songs.map((song) => (
          <li key={song.id}>
            <strong>{song.title}</strong> by {song.artist} ({song.year})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
