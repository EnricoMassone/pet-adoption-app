import { SET_BREED, SET_ANIMAL } from "../actions";

export default function breed(state = "", action) {
  if (action.type === SET_BREED) {
    return action.payload;
  } else if (action.type === SET_ANIMAL) {
    return "";
  } else {
    return state;
  }
}
