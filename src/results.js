import React from "react";
import Pet from "./pet";
import petfinder from "petfinder-client";

const api = petfinder({
  key: process.env.API_KEY,
  secret: process.env.API_SECRET,
});

class Results extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      pets: [],
      isLoading: true,
    };
  }

  componentDidMount() {
    const promise = api.pet.find({ output: "full", location: "Seattle, WA" });
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

  render() {
    const { isLoading } = this.state;
    return (
      <div className="search">
        {isLoading ? (
          <h2>Loading...</h2>
        ) : this.state.pets.length ? (
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

export default Results;
