import React from "react";
import SearchBox from "./searchBox";
import { navigate } from "@reach/router";

class SearchParams extends React.Component {
  handleSearchFormSubmit() {
    navigate("/");
  }

  render() {
    const {
      location,
      animal,
      breed,
      breeds,
      handleLocationChange,
      handleAnimalChange,
      handleBreedChange,
    } = this.props;

    return (
      <div className="search-route">
        <SearchBox
          onSearch={this.handleSearchFormSubmit}
          location={location}
          animal={animal}
          breed={breed}
          breeds={breeds}
          handleLocationChange={handleLocationChange}
          handleAnimalChange={handleAnimalChange}
          handleBreedChange={handleBreedChange}
        />
      </div>
    );
  }
}

export default SearchParams;
