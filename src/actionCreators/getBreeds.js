import petfinder from "petfinder-client";
import { SET_BREEDS } from "../actions";

const apiClient = petfinder({
  key: process.env.API_KEY,
  secret: process.env.API_SECRET,
});

export default function getBreeds() {
  return function (dispatch, getState) {
    const { animal } = getState();

    if (!animal) {
      dispatch({ type: SET_BREEDS, payload: [] });
      return;
    }

    apiClient.breed
      .list({
        animal,
      })
      .then((data) => {
        if (
          data.petfinder &&
          data.petfinder.breeds &&
          data.petfinder.breeds.breed
        ) {
          if (Array.isArray(data.petfinder.breeds.breed)) {
            dispatch({
              type: SET_BREEDS,
              payload: [...new Set(data.petfinder.breeds.breed)], // removes any duplicate introduced by random generation of strings
            });
          } else {
            dispatch({
              type: SET_BREEDS,
              payload: [data.petfinder.breeds.breed],
            });
          }
        } else {
          dispatch({ type: SET_BREEDS, payload: [] });
        }
      });
  };
}
