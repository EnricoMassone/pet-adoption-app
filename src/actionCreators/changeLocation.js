import { SET_LOCATION } from "../actions";

export default function changeLocation(location) {
  return {
    type: SET_LOCATION,
    payload: location,
  };
}
