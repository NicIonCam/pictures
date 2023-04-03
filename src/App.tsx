import React, { SetStateAction, useContext, useEffect, useRef, useState } from "react";
import './App.scss';
import { PostsState } from "./store/Posts";
import { PostsContextProvider, PostsContext } from "./store/Posts.tsx";
import { MediaQueryContextProvider } from "./utils/MediaQueryContext.tsx";
import PictureCard from "./components/PictureCard/PictureCard.tsx";
import { Post } from "./types/types";

const DURATION_TIME = 6000;

function App() {
  const { posts, loadMediaAndUserForPost } : PostsState = useContext(PostsContext);
  const [visibleIndex, setVisibleIndex] = useState(0);
  let showIntervalRef : ReturnType<any> = useRef();

  const loadNextPost = () => {
    const nextIndex = visibleIndex + 1;
    const nextPost: Post = posts[nextIndex];
    if (!nextPost) return;
    loadMediaAndUserForPost(nextPost.mediaId, nextPost.user.username, nextPost.id);
  }

  const startVisualTimer = () => {
    showIntervalRef = window.setTimeout(() => {
      setVisibleIndex(visibleIndex + 1);
    }, DURATION_TIME);
  }

  useEffect(() => {
    loadNextPost();
    startVisualTimer();
    return () => {
      clearTimeout(showIntervalRef);
    }
  }, [visibleIndex])

  return (
      <div className="pictures">
        <PictureCard cardData={posts[visibleIndex]} />
      </div>
  );
}

export default function Wrapper() {
  return (
    <MediaQueryContextProvider>
      <PostsContextProvider>
        <PostsContext.Consumer>
          {({ loadingPosts }: PostsState) => {
            if (loadingPosts)
              return (
                <div className="loading-posts">
                  Loading...
                </div>
              ) 
            return <App />
          }}
        </PostsContext.Consumer>
      </PostsContextProvider>
    </MediaQueryContextProvider>
  )
}