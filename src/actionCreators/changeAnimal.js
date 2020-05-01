import { SET_ANIMAL } from "../actions";

export default function changeAnimal(animal) {
  return {
    type: SET_ANIMAL,
    payload: animal,
  };
}
