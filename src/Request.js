import axios from "axios";

//BASE URL
const BASE_URL = "https://bloggerjsserver.herokuapp.com/api";
export const URL = "https://bloggerjsserver.herokuapp.com";

export const Request = axios.create({
  baseURL: BASE_URL,
});
