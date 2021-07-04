import React from 'react';

const Error = () => {
    return (
        <div>
            <h1>Error! '<span className="errorLink">{`${window.location}`}</span>' is not recognised</h1>
            <p>Please Select a Link or Search for pictures.</p>
        </div>
    )
}

export default Error;