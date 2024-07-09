export interface ITagOptions {
    value: string;
    label: string;
}

export interface IArticle {
    _id: string;
    title: string;
    summary: string;
    content: string;
    tags: ITagOptions[];
    thumbnail_image: string;
    createdAt: string;
}

export interface ICreateArticle extends Record<string, unknown>  {
    title: string;
    tags: object[];
    summary: string;
    content: string;
}

export interface IUpdateArticlePayload {
    _id: string;
    title: string;
    tags: object[];
    summary: string;
    content: string;
    thumbnail_image?: File;
}
  