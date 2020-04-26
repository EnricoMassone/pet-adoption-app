import React from "react";
import { render } from "react-dom";
import { Router, Link } from "@reach/router";
import Results from "./results";
import Details from "./details";
import SearchParams from "./searchParams";

class App extends React.Component {
  render() {
    return (
      <div>
        <header>
          <Link to="/">Adopt me!</Link>
        </header>
        <Router>
          <Results path="/" />
          <Details path="/details/:id" />
          <SearchParams path="/search-params" />
        </Router>
      </div>
    );
  }
}

const root = document.getElementById("root");
render(React.createElement(App), root);
