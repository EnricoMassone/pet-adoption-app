import React from "react";
import { createPortal } from "react-dom";

const modalRoot = document.getElementById("modal");

class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.containerElement = document.createElement("div");
  }

  componentDidMount() {
    modalRoot.appendChild(this.containerElement);
  }

  componentWillUnmount() {
    modalRoot.removeChild(this.containerElement);
  }

  render() {
    return createPortal(this.props.children, this.containerElement);
  }
}

export default Modal;
