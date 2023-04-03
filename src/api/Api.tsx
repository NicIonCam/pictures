import axios, { Axios } from 'axios';

const requestTypes = {
    GET: 'get'
}
const API_KEY = "ZSTYF0GBSSF0l3Ou6DTPE";

const BaseURL: string = "https://apis.slstice.com/mock/";

export function getPosts(query: string, offset: Number, limit:Number): Promise<Axios> {
    return axios({
        baseURL: BaseURL,
        method: requestTypes.GET,
        url: `posts?query=${query}&offset=${offset}&limit=${limit}&api_key=${API_KEY}`
    })
}

export function getMedia(mediaId: string): Promise<Axios> {
    return axios({
        baseURL: BaseURL,
        method: requestTypes.GET,
        url: `medias/${mediaId}?api_key=${API_KEY}`
    })
}

export function getUser(userName: string): Promise<Axios> {
    return axios({
        baseURL: BaseURL,
        method: requestTypes.GET,
        url: `users/${userName}?api_key=${API_KEY}`
    })
}

