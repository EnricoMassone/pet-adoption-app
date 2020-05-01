import React from "react";
import { ANIMALS } from "petfinder-client";
import { connect } from "react-redux";
import changeAnimal from "./actionCreators/changeAnimal";
import changeLocation from "./actionCreators/changeLocation";
import changeBreed from "./actionCreators/changeBreed";
import getBreeds from "./actionCreators/getBreeds";

class SearchBox extends React.Component {
  handleFormSubmit = (event) => {
    event.preventDefault();
    this.props.onSearch();
  };

  render() {
    return (
      <div className="search-params">
        <form onSubmit={this.handleFormSubmit}>
          <label htmlFor="location">
            Location
            <input
              id="location"
              value={this.props.location}
              placeholder="Location"
              onChange={this.props.handleLocationChange}
            ></input>
          </label>

          <label htmlFor="animal">
            Animal
            <select
              id="animal"
              value={this.props.animal}
              onBlur={this.props.handleAnimalChange}
              onChange={this.props.handleAnimalChange}
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
              value={this.props.breed}
              onBlur={this.props.handleBreedChange}
              onChange={this.props.handleBreedChange}
              disabled={this.props.breeds.length === 0}
            >
              <option value="">All</option>
              {this.props.breeds.map((breedName) => (
                <option key={breedName} value={breedName}>
                  {breedName}
                </option>
              ))}
            </select>
          </label>

          <button type="submit">Search</button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = ({ animal, location, breed, breeds }) => ({
  animal,
  location,
  breed,
  breeds,
});

const mapDispatchToProps = (dispatch) => ({
  handleLocationChange(event) {
    const action = changeLocation(event.target.value);
    dispatch(action);
  },

  handleAnimalChange(event) {
    const action = changeAnimal(event.target.value);
    dispatch(action);
    dispatch(getBreeds());
  },

  handleBreedChange(event) {
    const action = changeBreed(event.target.value);
    dispatch(action);
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchBox);
