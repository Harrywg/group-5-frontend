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

export const updateUsers = (userId, userData) => {
  return api.patch(`/users/${userId}`, userData).then(({ data }) => data);
};

export const deleteUser = (userId) => {
  return api.delete(`/users/${userId}`);
};
