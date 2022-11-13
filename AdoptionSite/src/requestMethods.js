import axios from "axios";

const {REACT_APP_SERVER_URL} = process.env;
// const REACT_APP_SERVER_URL = "http://localhost:3001"

const user = JSON.parse(localStorage.getItem("persist:root"));
const userData = user && JSON.parse(user.userData);
const TOKEN = userData && userData.accessToken;

export const publicRequest = axios.create({
  baseURL: REACT_APP_SERVER_URL,
});

export const userRequest = axios.create({
  baseURL: REACT_APP_SERVER_URL,
  headers: { 'authorization' : `Bearer ${TOKEN}` },
});