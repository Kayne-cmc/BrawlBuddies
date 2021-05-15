import axios from "axios";

export default axios.create({
  //withCredentials: true,
  // baseURL: "http://localhost:5000",
  baseURL: "https://brawlbuddies.herokuapp.com/",
  headers: {
    "Content-type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
});