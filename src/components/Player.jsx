import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faPause,
  faAngleLeft,
  faAngleRight,
} from "@fortawesome/free-solid-svg-icons";

const Player = ({
  audioRef,
  isPlaying,
  setIsPlaying,
  songInfo,
  setSongInfo,
  songs,
  setSongs,
  currentSong,
  setCurrentSong,
}) => {
  useEffect(() => {
    setSongs(
      songs.map((s) =>
        s.id === currentSong.id
          ? { ...s, active: true }
          : { ...s, active: false }
      )
    );
  }, [currentSong]);

  const handlePlaySong = () => {
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(!isPlaying);
    } else {
      audioRef.current.play();
      setIsPlaying(!isPlaying);
    }
  };

  const handleInputDrag = (e) => {
    audioRef.current.currentTime = e.target.value;
    setSongInfo({ ...songInfo, currentTime: e.target.value });
  };

  const handleSkipTrack = async (direction) => {
    let currentIndex = songs.findIndex((song) => song.id === currentSong.id);
    if (direction === "skip-back") {
      await setCurrentSong(
        (currentIndex - 1) % songs.length === -1
          ? songs[songs.length - 1]
          : songs[(currentIndex - 1) % songs.length]
      );
    }

    if (direction === "skip-forward") {
      await setCurrentSong(songs[(currentIndex + 1) % songs.length]);
    }

    if (isPlaying) audioRef.current.play();
  };

  const formatTime = (time) =>
    Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2);

  return (
    <div className="player">
      <div className="time-control">
        <p>{formatTime(songInfo.currentTime)}</p>
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
