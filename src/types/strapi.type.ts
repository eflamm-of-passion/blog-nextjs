export type ArticlesResponse = {
  data: ArticleResponse[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
};

export type ArticleResponse = {
  id: number;
  attributes: ArticleData;
};

export type ArticleData = {
  title: string;
  excerpt: string;
  content: string;
  creationDate: Date;
  updateDate: Date;
  author: string;
  slug: string;
};
