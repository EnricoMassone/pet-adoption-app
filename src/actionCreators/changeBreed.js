import { SET_BREED } from "../actions";

export default function changeBreed(breed) {
  return {
    type: SET_BREED,
    payload: breed,
  };
}
