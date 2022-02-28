import React, { useContext } from "react";
import MusicContext from "../context/musicContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faPause,
  faAngleLeft,
  faAngleRight,
} from "@fortawesome/free-solid-svg-icons";
import IData from "../interfaces/IData";

const Player: () => JSX.Element = () => {
  const {
    audioRef,
    isPlaying,
    setIsPlaying,
    songInfo,
    setSongInfo,
    songs,
    setSongs,
    currentSong,
    setCurrentSong,
  } = useContext(MusicContext);

  const handleActiveLibrary = (id: string) => {
    setSongs(
      songs.map((s: IData) =>
        s.id === id ? { ...s, active: true } : { ...s, active: false }
      )
    );
  };

  const handlePlaySong = (): void => {
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(!isPlaying);
    } else {
      audioRef.current.play();
      setIsPlaying(!isPlaying);
    }
  };

  const handleInputDrag = (e: any): void => {
    audioRef.current.currentTime = e.target.value;
    setSongInfo({ ...songInfo, currentTime: e.target.value });
  };

  const handleSkipTrack = async (direction: string): Promise<void> => {
    let currentIndex = songs.findIndex(
      (song: IData) => song.id === currentSong.id
    );
    if (direction === "skip-back") {
      const prevSong =
        (currentIndex - 1) % songs.length === -1
          ? songs[songs.length - 1]
          : songs[(currentIndex - 1) % songs.length];
      await setCurrentSong(prevSong);
      handleActiveLibrary(prevSong.id);
    }

    if (direction === "skip-forward") {
      await setCurrentSong(songs[(currentIndex + 1) % songs.length]);
      handleActiveLibrary(songs[(currentIndex + 1) % songs.length]);
    }

    if (isPlaying) audioRef.current.play();
  };

  const formatTime = (time: number): string =>
    Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2);

  return (
    <div className="player">
      <div className="time-control">
        <p>
          {songInfo.currentTime ? formatTime(songInfo.currentTime) : "0:00"}
        </p>
        <input
          type="range"
          min={0}
          max={songInfo.duration || 0}
          value={songInfo.currentTime}
          onChange={handleInputDrag}
        />
        <p>{songInfo.duration ? formatTime(songInfo.duration) : "0:00"}</p>
      </div>
      <div className="play-control">
        <FontAwesomeIcon
          className="skip-back"
          size="2x"
          icon={faAngleLeft}
          onClick={() => handleSkipTrack("skip-back")}
        />
        <FontAwesomeIcon
          onClick={handlePlaySong}
          className="play"
          size="2x"
          icon={isPlaying ? faPause : faPlay}
        />
        <FontAwesomeIcon
          className="skip-forward"
          size="2x"
          icon={faAngleRight}
          onClick={() => handleSkipTrack("skip-forward")}
        />
      </div>
    </div>
  );
};

export default Player;
