import {
  ArticleResponse,
  ArticlesResponse,
  StaticPath,
} from "@/types/strapi.type";
import axios from "axios";

const getArticles = (locale: string) => {
  const url =
    process.env.STRAPI_URL +
    "/articles?locale=" +
    (locale ?? process.env.DEFAULT_LOCALE);
  console.log("GET " + url);
  const response: Promise<ArticlesResponse> = axios
    .get<ArticlesResponse>(url)
    .then((response) => response.data);
  return response;
};

const getArticleSlugs = (locale: string) => {
  const url =
    process.env.STRAPI_URL +
    "/articles?locale=" +
    (locale ?? process.env.DEFAULT_LOCALE);
  console.log("GET " + url);
  const response: Promise<StaticPath[]> = axios
    .get<ArticlesResponse>(url)
    .then((response) =>
      response.data.data.map((article) => ({
        params: {
          slug: article.attributes.slug,
        },
      }))
    );
  return response;
};

const getArticleBySlug = (slug: string, locale: string) => {
  const url =
    process.env.STRAPI_URL +
    "/articles?slug=" +
    slug +
    "&locale=" +
    (locale ?? process.env.DEFAULT_LOCALE);
  console.log("GET " + url);
  const response: Promise<ArticlesResponse> = axios
    .get<ArticlesResponse>(url)
    .then((response) => response.data);
  return response;
};

const strapiApi = {
  getArticles,
  getArticleSlugs,
  getArticleBySlug,
};

export default strapiApi;
