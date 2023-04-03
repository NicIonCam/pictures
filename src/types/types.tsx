export type Statistics = {
    created: number;
    downloads: number;
    likes: number;
    views: number;
}

export type Urls = {
    full: string;
    raw: string;
    regular: string;
    small: string;
    small_s3: string;
    thumb: string;
};

export type Media = {
    id: string;
    type: string;
    statistics: Statistics;
    urls: Urls;
}

export type ProfileImages = {
    large: string;
    medium: string;
    small: string;
}

export type User = {
    first_name: string;
    id: string;
    last_name?: string;
    username: string;
    profile_images: ProfileImages;
}

export type Post = {
    created: string;
    description: string;
    id: string;
    likes: number;
    title?: string;
    mediaId: string;
    media: Media;
    user: User;
}

export type MediaQuery = {
    isSmall: boolean;
    isMedium: boolean;
    isLarge: boolean;
}