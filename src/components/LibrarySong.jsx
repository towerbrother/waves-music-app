import React from "react";
import { playAudio } from "../util";

const LibrarySong = ({
  song,
  songs,
  setSongs,
  setCurrentSong,
  audioRef,
  isPlaying,
}) => {
  const handleSongSelect = () => {
    setCurrentSong(song);
    setSongs(
      songs.map((s) =>
        s.id === song.id ? { ...s, active: true } : { ...s, active: false }
      )
    );

    playAudio(isPlaying, audioRef);
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
