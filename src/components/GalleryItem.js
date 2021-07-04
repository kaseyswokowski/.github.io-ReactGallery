import React from 'react';

const GalleryItem = (props) => {
    return (
        <li>
            <img src={`https://farm${props.farmID}.staticflickr.com/${props.serverID}/${props.ID}_${props.secret}.jpg`} alt=""></img>
        </li>
    )
}

export default GalleryItem;