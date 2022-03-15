import axios from "axios";

const API_URL = "http://localhost:3001/";

const headers = {
  "Accept": "application/json",
  "Content-Type": "application/json"
}

class AuthService {
  login(email: string, password: string) {
    return axios
      .post(API_URL + "login", { 
      user: {
        email,
        password
      }}, 
      { headers: headers })
      .then(response => {
        if(response.headers && response.headers.authorization && response){
          localStorage.setItem("user", response.headers.authorization);
        }
        return response.headers.authorization;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(email: string, password: string) {
    return axios.
      post(API_URL + "signup", {
      user: {
        email,
        password
      }}, 
    { headers: headers });
  }

  getCurrentUser() {
    const userStr = localStorage.getItem("user");
    if (userStr) return userStr;

    return null;
  }
}

export default new AuthService();
