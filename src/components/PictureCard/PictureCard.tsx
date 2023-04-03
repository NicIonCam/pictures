import React, { useContext } from 'react';
import { Post, Urls, MediaQuery } from '../../types/types';
import UserDetails from './UserDetails/UserDetails.tsx';
import StatisticsDetails from './StatisticsDetails/StatisticsDetails.tsx';
import { MediaQueryContext } from '../../utils/MediaQueryContext.tsx';
import './PictureCard.scss';

type Props = {
    cardData: Post;
};
type MediaQueryContextType = {
    mediaQuery: MediaQuery;
}

function getImageSize(urls: Urls, mediaQuery: MediaQuery) {
    if (mediaQuery.isLarge) return urls.full;
    if (mediaQuery.isSmall) return urls.small;
    return urls.regular;
}

const PictureCard = (props: Props) => {
    const { mediaQuery }: MediaQueryContextType = useContext(MediaQueryContext);
    const { user, media, title, description } = props.cardData;

    return (
        <div className='picture-card'>
            <img className='picture-card__image' src={getImageSize(media.urls, mediaQuery)}/>
            <div className='picture-card__details'>
                <UserDetails details={user} />
                <div className='picture-card__post-details'>
                    <p>{title}</p>
                    <p>{description}</p>
                </div>
                <StatisticsDetails details={media.statistics} />
            </div>
        </div>
    )
}

export default PictureCard;