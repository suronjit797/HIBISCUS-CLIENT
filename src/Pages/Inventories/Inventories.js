import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Row } from 'react-bootstrap';
import InventoryCard from '../../Components/InventoryCard/InventoryCard';

const Inventories = () => {
    const [inventories, setInventories] = useState([])
    useEffect(() => {
        axios.get('http://localhost:3000/json/inventory.json')
            .then(res => setInventories(res.data))
    }, [])

    return (
        <div className="container">
            <div className="inventory my-5">
                <Row xs={1} md={2} lg={3} className="g-4">
                    {
                        inventories.map(inventory => <InventoryCard key={inventory._id} inventory={inventory} />)
                    }
                </Row>
            </div>
        </div>
    );
};

export default Inventories;