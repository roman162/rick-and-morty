import axios from "axios";

const Http = axios.create({
  withCredentials: false,
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
  responseType: 'json',
})

export default Http