import React from "react";
import petfinder, { ANIMALS } from "petfinder-client";

const apiClient = petfinder({
  key: process.env.API_KEY,
  secret: process.env.API_SECRET,
});

class SearchParams extends React.Component {
  state = {
    location: "Seattle, WA",
    animal: "",
    breed: "",
    breeds: [],
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
    console.log("Rendering...");
    const { location, animal, breed, breeds } = this.state;

    return (
      <div className="search-params">
        <label htmlFor="location">
          Location
          <input
            id="location"
            value={location}
            placeholder="Location"
            onChange={this.handleLocationChange}
          ></input>
        </label>

        <label htmlFor="animal">
          Animal
          <select
            id="animal"
            value={animal}
            onBlur={this.handleAnimalChange}
            onChange={this.handleAnimalChange}
          >
            <option value="">All</option>
            {ANIMALS.map((animal) => (
              <option key={animal} value={animal}>
                {animal}
              </option>
            ))}
          </select>
        </label>

        <label htmlFor="breed">
          Breed
          <select
            id="breed"
            value={breed}
            onBlur={this.handleBreedChange}
            onChange={this.handleBreedChange}
            disabled={breeds.length === 0}
          >
            <option value="">All</option>
            {breeds.map((breedName) => (
              <option key={breedName} value={breedName}>
                {breedName}
              </option>
            ))}
          </select>
        </label>
      </div>
    );
  }
}

export default SearchParams;
