import React, { useContext } from "react";
import MusicContext from "../context/musicContext";
import IData from "../interfaces/IData";
import LibrarySong from "./LibrarySong";

const Library: () => JSX.Element = () => {
  const { songs, libraryStatus } = useContext(MusicContext);

  return (
    <div className={`library ${libraryStatus ? "active-library" : ""}`}>
      <h2>Library</h2>
      <div className="library-songs">
        {songs.map((song: IData) => (
          <LibrarySong
            key={song.id}
            name={song.name}
            cover={song.cover}
            artist={song.artist}
            audio={song.audio}
            color={song.color}
            id={song.id}
            active={song.active}
          />
        ))}
      </div>
    </div>
  );
};

export default Library;
