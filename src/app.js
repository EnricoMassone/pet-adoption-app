import React from "react";
import { render } from "react-dom";

const Pet = (props) => {
  return React.createElement("div", {}, [
    React.createElement("h1", {}, props.name),
    React.createElement("h2", {}, props.animal),
    React.createElement("h2", {}, props.breed),
  ]);
};

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
