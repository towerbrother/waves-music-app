import React, { useState, useRef } from "react";
import Library from "./components/Library";
import Player from "./components/Player";
import Song from "./components/Song";
import Nav from "./components/Nav";
import data from "./data";
import IData from "./interfaces/IData";
import ISongInfo from "./interfaces/ISongInfo";
import MusicContext from "./context/musicContext";
import "./styles/styles.scss";

const App = () => {
  const [songs, setSongs] = useState<IData[]>(data());
  const [currentSong, setCurrentSong] = useState<IData>(songs[0]);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [songInfo, setSongInfo] = useState<ISongInfo>({
    currentTime: 0,
    duration: 0,
  });
  const [libraryStatus, setLibraryStatus] = useState<boolean>(false);

  const audioRef: React.MutableRefObject<null | HTMLAudioElement> =
    useRef(null);

  const handleTimeUpdate = (e: any): void => {
    const time = e.target.currentTime;
    const duration = e.target.duration;
    setSongInfo({ ...songInfo, currentTime: time, duration: duration });
  };

  const handleSongEnd = async (): Promise<void> => {
    let currentIndex = songs.findIndex((song) => song.id === currentSong.id);
    await setCurrentSong(songs[(currentIndex + 1) % songs.length]);
    if (isPlaying) audioRef.current?.play();
  };

  return (
    <MusicContext.Provider
      value={{
        songs,
        setSongs,
        currentSong,
        setCurrentSong,
        isPlaying,
        setIsPlaying,
        libraryStatus,
        setLibraryStatus,
        songInfo,
        setSongInfo,
        audioRef,
      }}
    >
      <div className={`App ${libraryStatus ? "library-active" : ""}`}>
        <Nav />
        <Library />
        <Song />
        <Player />
        <audio
          ref={audioRef}
          src={currentSong.audio}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleTimeUpdate}
          onEnded={handleSongEnd}
        ></audio>
      </div>
    </MusicContext.Provider>
  );
};

export default App;
