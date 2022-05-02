import React, { useEffect, useState } from 'react';
import axios from 'axios'

const MyItems = () => {
    const [myItems, setMyItems] = useState([])

    useEffect(()=>{
        axios.get('/api/my-items')
    }, [])
    return (
        <div>
            MyItems
        </div>
    );
};

export default MyItems;