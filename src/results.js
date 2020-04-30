import React from "react";
import Pet from "./pet";
import petfinder from "petfinder-client";
import SearchBox from "./searchBox";
import { Consumer } from "./searchContext";

const api = petfinder({
  key: process.env.API_KEY,
  secret: process.env.API_SECRET,
});

class Results extends React.Component {
  state = {
    pets: [],
    isLoading: true,
  };

  searchPets() {
    const { location, animal, breed } = this.props;
    console.log(location, animal, breed);

    const promise = api.pet.find({
      output: "full",
      location,
      animal,
      breed,
    });

    promise.then((data) => {
      let pets;

      if (data.petfinder.pets && data.petfinder.pets.pet) {
        if (Array.isArray(data.petfinder.pets.pet)) {
          pets = data.petfinder.pets.pet;
        } else {
          pets = [data.petfinder.pets.pet];
        }
      } else {
        pets = [];
      }

      this.setState({
        pets,
        isLoading: false,
      });
    });
  }

  handleSearchFormSubmit = (event) => {
    event.preventDefault();

    this.setState(
      {
        isLoading: true,
      },
      this.searchPets
    );
  };

  componentDidMount() {
    this.searchPets();
  }

  render() {
    const { isLoading } = this.state;

    if (isLoading) {
      return (
        <div className="search">
          <h2>Loading...</h2>
        </div>
      );
    }

    return (
      <div className="search">
        <SearchBox onSearch={this.handleSearchFormSubmit} />
        {this.state.pets.length ? (
          this.state.pets.map((pet) => {
            let breed;

            if (Array.isArray(pet.breeds.breed)) {
              breed = pet.breeds.breed.join(", ");
            } else {
              breed = pet.breeds.breed;
            }

            return (
              <Pet
                key={pet.id}
                animal={pet.animal}
                breed={breed}
                name={pet.name}
                media={pet.media}
                location={`${pet.contact.city}, ${pet.contact.state}`}
                id={pet.id}
              />
            );
          })
        ) : (
          <h2>No pets found</h2>
        )}
      </div>
    );
  }
}

function ResultsWithConsumer() {
  return (
    <Consumer>
      {(context) => (
        <Results
          location={context.location}
          animal={context.animal}
          breed={context.breed}
        />
      )}
    </Consumer>
  );
}

export default ResultsWithConsumer;
