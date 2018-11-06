import { auth, provider } from "../firebase";
import { FETCH_USER } from "./types";

export const fetchUser = () => dispatch => {
  auth.onAuthStateChanged(user => {
    console.log("here");
    if (user) {
      dispatch({
        type: FETCH_USER,
        payload: user
      });
    } else {
      dispatch({
        type: FETCH_USER,
        payload: null
      });
    }
  });
};

export const signIn = () => dispatch => {
  console.log("login");
  auth
    .signInWithPopup(provider)
    .then(result => {})
};

export const signOut = () => dispatch => {
    console.log("out");
  auth
    .signOut()
    .then(() => {
    })
};
