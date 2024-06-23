export interface IArticle {
    _id: string;
    title: string;
    summary: string;
    content: string;
    tag:string;
    thumbnail_image: string
}

export interface ICreateArticle extends Record<string, unknown>  {
    title: string;
    summary: string;
    content: string;
}

export interface IUpdateArticlePayload {
    _id: string;
    title: string;
    tag: string;
    summary: string;
    content: string;
    thumbnail_image?: File;
  }
  