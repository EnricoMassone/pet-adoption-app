import React from "react";

class Carousel extends React.Component {
  state = {
    photos: [],
    active: 0,
  };

  static getDerivedStateFromProps({ media }) {
    let photos = [];

    if (media && media.photos && media.photos.photo) {
      photos = media.photos.photo.filter((photo) => photo["@size"] === "pn");
    }

    return {
      photos,
    };
  }

  render() {
    const { active, photos } = this.state;

    return (
      <div className="carousel">
        <img alt="animal" src={photos[active].value} />
        <div className="carousel-smaller">
          {photos.map((photo, index) => (
            <img
              key={photo.value}
              src={photo.value}
              alt="animal thumbnail"
              className={index === active ? "active" : ""}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default Carousel;
