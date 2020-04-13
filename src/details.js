import React from "react";
import petfinder from "petfinder-client";

const api = petfinder({
  key: process.env.API_KEY,
  secret: process.env.API_SECRET,
});

class Details extends React.Component {
  state = {
    loading: true,
  };

  componentDidMount() {
    const promise = api.pet.get({
      output: "full",
      id: this.props.id,
    });

    promise.then((data) => {
      const pet = data.petfinder.pet;

      let breed;

      if (Array.isArray(pet.breeds.breed)) {
        breed = pet.breeds.breed.join(", ");
      } else {
        breed = pet.breeds.breed;
      }

      const { name, animal, description, media, contact } = pet;
      const location = `${contact.city}, ${contact.state}`;

      this.setState({
        loading: false,
        name,
        animal,
        description,
        media,
        location,
        breed,
      });
    });
  }

  render() {
    if (this.state.loading) {
      return (
        <div className="details">
          <h2>Loading...</h2>
        </div>
      );
    }

    const { name, animal, breed, description, location } = this.state;

    return (
      <div className="details">
        <div>
          <h1>{name}</h1>
          <h2>{`${animal} - ${breed} - ${location}`}</h2>
          <p>{description}</p>
        </div>
      </div>
    );
  }
}

export default Details;
