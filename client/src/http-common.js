import axios from "axios";

export default axios.create({
  //withCredentials: true,
  baseURL: "http://localhost:5000",
  //baseURL: "http://localhost:5000",
  headers: {
    "Content-type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
});