export type Blog = {
  id: string;
  title: string;
  body: string;
  category: {
    id: string,
    name: string,
    createdAt: string,
    updatedAt: string,
    publishedAt: string,
    revisedAt: string,
  }
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
}

export type Category = {
  id: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
  name: string;
}

export type TocItem = {
  text: string;
  id: string;
}
