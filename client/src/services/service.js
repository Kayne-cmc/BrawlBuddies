import http from "../http-common";

class DataService {
  login(data) {
    return http.post("/auth/login", data);
  }

  register(data) {
    return http.post("/auth/register", data);
  }

  logout() {
    return http.get("/auth/logout");
  }

  loggedIn() {
    return http.get("/auth/loggedIn");
  }

  add(data) {
    return http.post("/actions/add", data);
  }

  remove(data) {
    return http.post("/actions/remove", data);
  }

  matches() {
    return http.get("/data/matches");
  }

  stats() {
    return http.get("/data/stats");
  }

  legends() {
    return http.get("/data/legends");
  }
}

export default new DataService();