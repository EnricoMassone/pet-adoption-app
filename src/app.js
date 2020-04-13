import React from "react";
import { render } from "react-dom";
import Pet from "./pet";
import petfinder from "petfinder-client";

console.log(process.env.API_KEY);

const api = petfinder({
  key: process.env.API_KEY,
  secret: process.env.API_SECRET,
});

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      pets: [],
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

      console.log(pets);

      this.setState({
        pets,
      });
    });
  }

  render() {
    return (
      <div>
        <h1>Adopt me</h1>
        {this.state.pets.map((pet) => {
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
            />
          );
        })}
      </div>
    );
  }
}

const root = document.getElementById("root");
render(React.createElement(App), root);
