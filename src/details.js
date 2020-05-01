import React from "react";
import petfinder from "petfinder-client";
import Carousel from "./carousel";
import Modal from "./modal";

const api = petfinder({
  key: process.env.API_KEY,
  secret: process.env.API_SECRET,
});

class Details extends React.Component {
  state = {
    loading: true,
    showModal: false,
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

  toggleModal = () => {
    this.setState((state) => {
      return {
        showModal: !state.showModal,
      };
    });
  };

  render() {
    if (this.state.loading) {
      return (
        <div className="details">
          <h2>Loading...</h2>
        </div>
      );
    }

    const {
      name,
      animal,
      breed,
      description,
      location,
      media,
      showModal,
    } = this.state;

    return (
      <div className="details">
        <Carousel media={media} />
        <div>
          <h1>{name}</h1>
          <h2>{`${animal} - ${breed} - ${location}`}</h2>
          <button onClick={this.toggleModal}>Adopt {name}</button>
          <p>{description}</p>
        </div>
        {showModal ? (
          <Modal>
            <h1>Do you want to adopt {name} ?</h1>
            <div className="buttons">
              <button onClick={this.toggleModal}>Yes</button>
              <button onClick={this.toggleModal}>No</button>
            </div>
          </Modal>
        ) : null}
      </div>
    );
  }
}

export default Details;
