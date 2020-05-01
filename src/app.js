import React from "react";
import { render } from "react-dom";
import { Router, Link } from "@reach/router";
import Results from "./results";
import Details from "./details";
import SearchParams from "./searchParams";
import store from "./store";
import { Provider } from "react-redux";

class App extends React.Component {
  render() {
    return (
      <div>
        <header>
          <Link to="/">Adopt me!</Link>
          <Link to="/search-params">
            <span role="img" aria-label="search">
              🔎
            </span>
          </Link>
        </header>
        <Provider store={store}>
          <Router>
            <Results path="/" />
            <Details path="/details/:id" />
            <SearchParams path="/search-params" />
          </Router>
        </Provider>
      </div>
    );
  }
}

const root = document.getElementById("root");
render(React.createElement(App), root);
