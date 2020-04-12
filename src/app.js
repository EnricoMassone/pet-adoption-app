import React from "react";
import { render } from "react-dom";
import Pet from "./pet";

class App extends React.Component {
  handleClick() {
    alert("You clicked the title");
  }

  render() {
    return React.createElement("div", {}, [
      React.createElement("h1", { onClick: this.handleClick }, "Adopt me"),
      React.createElement(Pet, {
        name: "Luna",
        animal: "Dog",
        breed: "Havanese",
      }),
      React.createElement(Pet, {
        name: "Pepper",
        animal: "Bird",
        breed: "Cockatail",
      }),
      React.createElement(Pet, {
        name: "Doink",
        animal: "Cat",
        breed: "Mixed",
      }),
    ]);
  }
}

const root = document.getElementById("root");
render(React.createElement(App), root);
