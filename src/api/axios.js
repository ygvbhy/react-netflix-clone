import axios from "axios";

const instance = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  params: {
    api_key: "36513076aa95435637d44bfd01d587ff",
    language: "ko-KR",
  },
});

export default instance;
