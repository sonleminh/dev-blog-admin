export interface IArticle {
    _id: string;
    title: string;
    summary: string;
    content: string;
    id_category: string;
    thumbnail_image: string
}

export interface ICreateArticle extends Record<string, unknown> {
    title: string;
    summary: string;
    content: string;
    id_category: string;
}