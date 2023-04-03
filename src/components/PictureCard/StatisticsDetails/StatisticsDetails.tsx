import React from 'react';
import LikeIcon from '../../../../assets/like.png';
import { Statistics } from '../../../types/types';
import moment from 'moment';

import './StatisticsDetails.scss';

type Props = {
    details: Statistics;
}

const StatisticsDetails = (props:Props) => {
    const { likes, created } = props.details;
    return (
        <div className='statistics-details'>
            <div className='statistics-details__likes'>
                <img src={LikeIcon} />
                <p>{likes} personnes</p>
            </div>
                <p>{moment(created).fromNow()}</p>
        </div>
    )
}

export default StatisticsDetails;