interface AUTHOR {
    name: string;
    role: string;
    avatar?: string;

}

interface THUMBNAIL {
    large: string;
    small: string;
}

export interface POST {
    author: AUTHOR;
    thumbnail: THUMBNAIL;
    id: number;
    date: number;
    content: string;
    title: string
}