import React from "react";
import { render } from "react-dom";
import { Router, Link } from "@reach/router";
import Results from "./results";
import Details from "./details";
import SearchParams from "./searchParams";
import petfinder from "petfinder-client";
import { Provider } from "./searchContext";

const apiClient = petfinder({
  key: process.env.API_KEY,
  secret: process.env.API_SECRET,
});

class App extends React.Component {
  state = {
    location: "Seattle, WA",
    animal: "",
    breed: "",
    breeds: [],
    handleLocationChange: this.handleLocationChange,
    handleAnimalChange: this.handleAnimalChange,
    handleBreedChange: this.handleBreedChange,
    getBreeds: this.getBreeds,
  };

  handleLocationChange = (event) => {
    this.setState({
      location: event.target.value,
    });
  };

  handleAnimalChange = (event) => {
    // prevents running setState when not necessary
    if (this.state.animal === event.target.value) {
      return;
    }

    this.setState(
      {
        animal: event.target.value,
        breed: "",
        breeds: [],
      },
      this.getBreeds
    );
  };

  handleBreedChange = (event) => {
    this.setState({
      breed: event.target.value,
    });
  };

  getBreeds() {
    const { animal } = this.state;

    if (!animal) {
      this.setState({
        breeds: [],
      });

      return;
    }

    apiClient.breed
      .list({
        animal,
      })
      .then((data) => {
        if (
          data.petfinder &&
          data.petfinder.breeds &&
          data.petfinder.breeds.breed
        ) {
          if (Array.isArray(data.petfinder.breeds.breed)) {
            this.setState({
              breeds: [...new Set(data.petfinder.breeds.breed)], // removes any duplicate introduced by random generation of strings
            });
          } else {
            this.setState({
              breeds: [data.petfinder.breeds.breed],
            });
          }
        } else {
          this.setState({
            breeds: [],
          });
        }
      });
  }

  render() {
    return (
      <div>
        <header>
          <Link to="/">Adopt me!</Link>
        </header>
        <Provider value={this.state}>
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
