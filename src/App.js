import React from "react";
import Player from "./components/Player";
import Song from "./components/Song";

const App = () => {
  return (
    <div className="App">
      <h1>Waves Music App</h1>
      <Song />
      <Player />
    </div>
  );
}

export default App;
