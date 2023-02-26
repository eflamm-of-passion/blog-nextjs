import { ArticlesResponse } from "@/types/strapi.type";
import axios from "axios";

const getArticles = () => {
  const response: Promise<ArticlesResponse> = axios
    .get<ArticlesResponse>(process.env.STRAPI_URL + "/articles")
    .then((response) => response.data);
  return response;
};

const strapiApi = {
  getArticles,
};

export default strapiApi;
