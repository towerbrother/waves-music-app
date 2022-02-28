import React, { useContext } from "react";
import MusicContext from "../context/musicContext";
import IData from "../interfaces/IData";

const LibrarySong: ({
  name,
  cover,
  artist,
  audio,
  color,
  id,
  active,
}: IData) => JSX.Element = ({
  name,
  cover,
  artist,
  audio,
  color,
  id,
  active,
}: IData) => {
  const { songs, setSongs, setCurrentSong, audioRef, isPlaying } =
    useContext(MusicContext);

  const handleSongSelect = async () => {
    await setCurrentSong({ name, cover, artist, audio, color, id, active });
    await setSongs(
      songs.map((s: IData) =>
        s.id === id ? { ...s, active: true } : { ...s, active: false }
      )
    );

    if (isPlaying) audioRef.current.play();
  };

  return (
    <div
      onClick={handleSongSelect}
      className={`library-song ${active ? "selected" : ""}`}
    >
      <img alt={name} src={cover}></img>
      <div className="song-description">
        <h3>{name}</h3>
        <h4>{artist}</h4>
      </div>
    </div>
  );
};

export default LibrarySong;
