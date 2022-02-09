import React from "react";

const LibrarySong = ({
  song,
  songs,
  setSongs,
  setCurrentSong,
  audioRef,
  isPlaying,
}) => {
  const handleSongSelect = async () => {
    setCurrentSong(song);
    await setSongs(
      songs.map((s) =>
        s.id === song.id ? { ...s, active: true } : { ...s, active: false }
      )
    );

    if (isPlaying) audioRef.current.play();
  };

  return (
    <div
      onClick={handleSongSelect}
      className={`library-song ${song.active ? "selected" : ""}`}
    >
      <img alt={song.name} src={song.cover}></img>
      <div className="song-description">
        <h3>{song.name}</h3>
        <h4>{song.artist}</h4>
      </div>
    </div>
  );
};

export default LibrarySong;
