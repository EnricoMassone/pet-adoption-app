import { SET_BREEDS, SET_ANIMAL } from "../actions";

export default function breeds(state = [], action) {
  if (action.type === SET_BREEDS) {
    return action.payload;
  } else if (action.type === SET_ANIMAL) {
    return [];
  } else {
    return state;
  }
}
