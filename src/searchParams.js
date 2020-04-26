import React from "react";
import { ANIMALS } from "petfinder-client";

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
    this.setState({
      animal: event.target.value,
    });
  };

  render() {
    const { location, animal, breed } = this.state;

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
            onChange={this.handleAnimalChange}
            onBlur={this.handleAnimalChange}
          >
            <option value="">All</option>
            {ANIMALS.map((animal) => (
              <option key={animal} value={animal}>
                {animal}
              </option>
            ))}
          </select>
        </label>
      </div>
    );
  }
}

export default SearchParams;
