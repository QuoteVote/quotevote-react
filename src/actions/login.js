import axios from "axios";

import jwt from "jsonwebtoken";
import {
  USER_LOGIN_FAILURE,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS
  // USER_LOGOUT
} from "./types";
import { persistor } from "config/redux";
import firebase from 'firebase';

export const userLogin = async (username, password, dispatch, history) => {
  console.log('logging in user ---login.js', username)
  dispatch({ type: USER_LOGIN_REQUEST });
  const result = await firebase.auth().signInWithEmailAndPassword(username, password)
  console.log('got result ---login.js', result.user)
  const { l } = result.user;
  localStorage.setItem("token", l);
  dispatch({
    type: USER_LOGIN_SUCCESS,
    payload: {
      user:result.user,
      loading: false,
      loginError: null
    }
  });
  await persistor.flush();

  history.push("/hhsb/Home");
};

