import React, { useContext } from "react";
import MusicContext from "../context/musicContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMusic } from "@fortawesome/free-solid-svg-icons";

const Nav: () => JSX.Element = () => {
  const { libraryStatus, setLibraryStatus } = useContext(MusicContext);
  return (
    <nav>
      <h1>Waves</h1>
      <button onClick={() => setLibraryStatus(!libraryStatus)}>
        Library
        <FontAwesomeIcon icon={faMusic} />
      </button>
    </nav>
  );
};

export default Nav;
