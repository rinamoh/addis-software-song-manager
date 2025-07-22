// src/App.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSongsRequest } from './store/songsSlice';
import CreateSong from './components/createSong';
import { deleteSongRequest } from './store/songsSlice';
import UpdateSong from './components/updateSong';


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
      <CreateSong/>

      {loading && <p>Loading songs...</p>}
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}

      {!loading && songs.length === 0 && <p>No songs found.</p>}

      <ul>
  {Array.isArray(songs) && songs.map(song => (
    <UpdateSong key={song.id} song={song} />
  ))}
</ul>
    </div>
  );
};

export default App;
