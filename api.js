import axios from "axios";

const api = axios.create({
  baseURL: "https://group-5-backend-ztnc.onrender.com/api",
});

export const getUsers = () => {
  console.log("invoke");
  return api.get("/users").then(({ data }) => data);
};

export const getPlaces = () => {
  return api.get("/places").then(({ data }) => data);
};
