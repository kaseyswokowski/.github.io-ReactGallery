import React from 'react';
import GalleryItem from './GalleryItem';

const Gallery = (props) => {
    // Check if passed data has loaded
    const dataLoading = (props.data.isLoading !== undefined && props.data.isLoading);
    let data = props.data.pictures;

    // Create title to display
    let title = `${props.data.searchTag.charAt(0).toUpperCase() + props.data.searchTag.slice(1)}`;

   /*  Add 'Images' on the end of title only if there is data to show. 
       Otherwise if no pictures were returned, message would state
       '*search* Pics did not return any results......' */
    if(data.length !== 0) {
        title += ' Images'
    }

    // Iterate through data to create all Gallery Items
    let pictures = props.data.pictures.map((picture, index) =>
    <GalleryItem
    // Pass in required data
        farmID={picture.farm}
        serverID={picture.server}
        ID={picture.id}
        secret={picture.secret}
        key={index}
    />
    )

    return(    
        <div className="photo-container">
            {/* If data is still loading, display 'Loading...' */}
            {dataLoading
            ?
                <p>Loading...</p>
            :
                // If search returned pictures, setup list to display previously created Gallery Items
                data.length > 0 
                ?
                    <div className="photo-container">
                        <h1>{title}</h1>
                        <ul>
                            {pictures}
                        </ul>
                    </div>
                :
                    // Otherwise display message of no results
                    <div>
                        <h1>No results found</h1>
                        <p>{title} did not return any results, please try again.</p>
                    </div>
            }
        </div>
        
        

    )
}
    

    

export default Gallery;