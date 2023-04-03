import React, { ReactNode, Reducer, useEffect, useReducer } from 'react';
import { getPosts, getMedia, getUser } from '../api/Api.tsx';
import { Post } from '../types/types';

const actionTypes = {
    ADD_POSTS: 'add-posts',
    SET_LOADING_POSTS: 'loading-posts',
    UPDATE_POST: 'update-post',
}

export type PostsState = {
    posts: Array<Post>;
    loadingPosts: boolean;
    loadMediaAndUserForPost: Function;
}

type PostsAction = {
    type: string;
    payload: any;
}

const initialState: PostsState = {
    posts: [],
    loadingPosts: true,
    loadMediaAndUserForPost: () => {},
}

const PostReducer: Reducer <PostsState, PostsAction> = (state, action) => {
    // console.log('action', action, state);
    switch(action.type) {
        case actionTypes.SET_LOADING_POSTS:
            return {
                ...state,
                loadingPosts: action.payload
            }
        case actionTypes.ADD_POSTS:
            return {
                ...state,
               posts: action.payload
            }
        case actionTypes.UPDATE_POST:
            const { postId, media, user} = action.payload;
            return {
                ...state,
                posts: state.posts.map((post: any) => {
                    if (post.id === postId) {
                        return {
                            ...post,
                            media,
                            user,
                        }
                    }
                    return post;
                })
            }
        default:
            return state;
    }
}

export const PostsContext = React.createContext(initialState);

export const PostsContextProvider: React.FC<{children: ReactNode}> = ({ children }: { children: ReactNode }) => {
    const [state, dispatch] = useReducer(PostReducer, initialState);

    const loadPosts = (query: string, offset: number, limit: number) => {
        dispatch({
            type: actionTypes.SET_LOADING_POSTS,
            payload: true
        })

        getPosts(query, offset, limit)
            .then((response: any) => {
                const responsePosts = response.data.response.posts;

                loadMediaAndUserForPost(responsePosts[0].mediaId, responsePosts[0].user.username, responsePosts[0].id);
                dispatch({
                    type: actionTypes.ADD_POSTS,
                    payload: responsePosts,
                })
            })
            .catch((error: any) => {
                throw new Error(error);
            })
    }

    const loadMediaAndUserForPost = (mediaId: string, userName: string, postId: string) => {
       Promise.allSettled([getMedia(mediaId), getUser(userName)])
        .then((response: any) => {
            const media = response[0].value.data.response.media;
            const user = response[1].value.data.response.user;
            dispatch({
                type: actionTypes.UPDATE_POST,
                payload: {
                    postId,
                    media,
                    user,
                }
            })
            dispatch({
                type: actionTypes.SET_LOADING_POSTS,
                payload: false
            })
        })
        .catch((error:any) => {
            throw new Error(error);
        })
    }

    useEffect(() => {
        loadPosts('', 0, 15);
    }, [])

    console.log('state', state);
    return (
        <PostsContext.Provider value={{
            posts: state.posts,
            loadingPosts: state.loadingPosts,
            loadMediaAndUserForPost,
        }}>
            {children}
        </PostsContext.Provider>
    )
}