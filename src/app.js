import React from "react";
import { render } from "react-dom";
import { Router } from "@reach/router";
import Results from "./results";
import Details from "./details";

class App extends React.Component {
  render() {
    return (
      <div>
        <h1>Adopt me</h1>
        <Router>
          <Results path="/" />
          <Details path="/details/:id" />
        </Router>
      </div>
    );
  }
}

const root = document.getElementById("root");
render(React.createElement(App), root);
