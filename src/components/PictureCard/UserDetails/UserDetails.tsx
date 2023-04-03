import React, { useContext } from 'react';
import { MediaQuery, ProfileImages, User } from '../../../types/types';
import { MediaQueryContext } from '../../../utils/MediaQueryContext';
import './UserDetails.scss';

type Props = {
    details: User;
}

type MediaQueryContextType = {
    mediaQuery: MediaQuery;
}

function getProfileImage(profileImages: ProfileImages, mediaQuery: MediaQuery) {
    if (mediaQuery.isSmall) return profileImages.small;
    if (mediaQuery.isLarge) return profileImages.large;
    return profileImages.medium;
}

const UserDetails = (props:Props) => {
    const { mediaQuery } : MediaQueryContextType = useContext(MediaQueryContext);
    const { first_name, last_name, profile_images } = props.details;

    return (
        <div className='user-details'>
            <p>{first_name}</p>
            <p className='user-details__last-name'>{last_name}</p>
            <img src={getProfileImage(profile_images, mediaQuery)} />
        </div>
    )
}
export default UserDetails;