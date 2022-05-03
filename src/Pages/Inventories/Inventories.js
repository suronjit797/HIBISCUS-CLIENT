import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Row, Spinner } from 'react-bootstrap';
import InventoryCard from '../../Components/InventoryCard/InventoryCard';

const Inventories = () => {
    const [inventories, setInventories] = useState([])
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        axios.get('/api/inventory')
            .then(res => {
                setInventories(res.data)
                setLoading(false)
            })
    }, [loading])

    useEffect(()=>{
        document.title = 'Inventory - HIBISCUS'
    },[])

    // loading spinner
    if (loading) {
        return (
            <section className="centerSpinner">
                <Spinner animation="border" variant="primary" />
            </section>
        )
    }


    return (
        <div className="container">
            <div className="inventory my-5">
                <Row xs={1} md={2} lg={3} className="g-4">
                    {
                        inventories.map(inventory => <InventoryCard key={inventory._id} inventory={inventory} />)
                    }
                </Row>
            </div>

            {/* have to add pagination */}
        </div>
    );
};

export default Inventories;