import axios from "axios";

const api = axios.create({
  baseURL: "https://group-5-backend-ztnc.onrender.com/api",
});

export const getUsers = () => {
  return api.get("/users").then(({ data }) => data);
};

export const getPlaces = () => {
  return api.get("/places").then(({ data }) => data);
};

export const getUsersByUsername = (username) => {
  return api.get(`/users/username/${username}`).then(({ data }) => data);
};

export const postUsers = (userData) => {
  return api.post("/users", userData).then(({ data }) => data);
};

export const postPlace = (newPlace) => {
  return api.post(`/places`, newPlace).then(({ data }) => data);
};

export const postGuess = (id, lat, lon) => {
  return api
    .post(`/places/${id}/guesses?lat=${lat}&lon=${lon}`)
    .then(({ data }) => data);
};
