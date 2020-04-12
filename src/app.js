import React from "react";
import { render } from "react-dom";
import Pet from "./pet";

class App extends React.Component {
  render() {
    return (
      <div>
        <h1>Adopt me</h1>
        <Pet name="Luna" animal="dog" breed="Havanese" />
        <Pet name="Pepper" animal="bird" breed="Cockatail" />
        <Pet name="Doink" animal="cat" breed="Mixed" />
      </div>
    );
  }
}

const root = document.getElementById("root");
render(React.createElement(App), root);
