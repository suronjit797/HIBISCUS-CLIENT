import React from 'react';
import { useParams } from 'react-router-dom';


const SingleInventory = () => {
    const { id } = useParams();

    return (
        <div>
            inventory id : {id}
        </div>
    );
};

export default SingleInventory;