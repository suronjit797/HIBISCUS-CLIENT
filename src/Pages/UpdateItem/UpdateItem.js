import React from 'react';
import { useParams } from 'react-router-dom';

const UpdateItem = () => {
    const {id} = useParams()
    return (
        <div>
            update item : {id}
        </div>
    );
};

export default UpdateItem;