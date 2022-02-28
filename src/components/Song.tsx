import React, { useContext } from "react";
import MusicContext from "../context/musicContext";

const Song: () => JSX.Element = () => {
  const { currentSong } = useContext(MusicContext);

  return (
    <div className="song-container">
      <img alt={currentSong.name} src={currentSong.cover}></img>
      <h2>{currentSong.name}</h2>
      <h3>{currentSong.artist}</h3>
    </div>
  );
};

export default Song;
