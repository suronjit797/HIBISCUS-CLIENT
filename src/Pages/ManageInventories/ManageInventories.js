import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Modal, Spinner, Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';


import './ManageInventories.css'
import ManageInventoryRow from './ManageInventoryRow';

const ManageInventories = () => {
    const navigate = useNavigate()

    // states 
    const [inventories, setInventories] = useState([])
    const [show, setShow] = useState(false);
    const [removeId, setRemoveId] = useState('')
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        axios.get('/api/inventory')
            .then(res => {
                setInventories(res.data)
                setLoading(false)
            })
    }, [loading])

    // handler
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleRemove = () => {
        setShow(false);
        axios.delete(`/api/inventory/${removeId}`)
            .then(res => {
                setLoading(true)
                console.log(res.data)
            })
            .catch(error => console.log(error))
    }


    // loading spinner
    if (loading) {
        return (
            <section className="centerSpinner">
                <Spinner animation="border" variant="primary" />
            </section>
        )
    }


    return (
        <div className="manageInventory">
            <div className='container my-5 text-capitalize'>
                <div className="text-end mb-4">
                    <button
                        className="btn px-5 fw-bold neomorphs_btn text-success"
                        onClick={() => navigate('/add-items')}
                    > Add new items </button>
                </div>
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
                            inventories.map(inventory => (
                                <ManageInventoryRow
                                    key={inventory._id}
                                    inventory={inventory}
                                    handleShow={handleShow}
                                    setRemoveId={setRemoveId}
                                />
                            ))
                        }
                    </tbody>
                </Table>
            </div>

            <>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Modal heading</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={handleRemove}>
                            Delete Item
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        </div>
    );
};

export default ManageInventories;