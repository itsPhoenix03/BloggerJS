import axios from "axios";

//BASE URL
const BASE_URL = "http://localhost:5000/api/";
export const URL = "http://localhost:5000";

export const Request = axios.create({
  baseURL: BASE_URL,
});
