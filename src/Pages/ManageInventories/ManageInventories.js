import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';

import './ManageInventories.css'
import ManageInventoryRow from './ManageInventoryRow';

const ManageInventories = () => {

    const [inventories, setInventories] = useState([])
    useEffect(() => {
        axios.get('http://localhost:3000/json/inventory.json')
            .then(res => setInventories(res.data))
    }, [])

    return (
        <div className="manageInventory">
            <div className='container my-5 text-capitalize'>
                <Table hover>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>supplier</th>
                            <th>Quantity</th>
                            <th> total price </th>
                            <th> Remove item </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            inventories.map(inventory=> <ManageInventoryRow key={inventory._id} inventory={inventory} /> )
                        }
                    </tbody>
                </Table>
            </div>
        </div>
    );
};

export default ManageInventories;