export interface IArticle {
    _id: string;
    title: string;
    summary: string;
    content: string;
    category: string;
}

export interface ICreateArticle {
    title: string;
    summary: string;
    content: string;
    category: string;
}