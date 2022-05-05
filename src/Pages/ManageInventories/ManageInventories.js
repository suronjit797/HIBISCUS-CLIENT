import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Modal, Spinner, Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Pagination from '../../Components/Pagination/Pagination';


import './ManageInventories.css'
import ManageInventoryRow from './ManageInventoryRow';

const ManageInventories = () => {
    const navigate = useNavigate()

    // states 
    const [inventories, setInventories] = useState([])
    const [show, setShow] = useState(false);
    const [removeItem, setRemoveItem] = useState({})
    const [loading, setLoading] = useState(true)

    // pagination
    const [itemPerPage, setItemPerPage] = useState(9)
    const [pageNumber, setItemPageNumber] = useState('')
    const [currentPage, setCurrentPage] = useState(0)

    useEffect(() => {
        const skip = currentPage * itemPerPage
        axios.get(`/api/inventory?limits=${itemPerPage}&skip=${skip}`)
            .then(res => {
                setInventories(res.data)
                setLoading(false)
            })
            .catch(error=>console.dir(error))
    }, [loading, currentPage, itemPerPage])

    useEffect(() => {
        axios.get('/api/inventory/count')
            .then(res => setItemPageNumber(Math.ceil(parseInt(res.data.result) / parseInt(itemPerPage))))
            .catch(error => console.dir(error))
    }, [itemPerPage])





    useEffect(() => {
        const skip = currentPage * itemPerPage
        axios.get(`/api/inventory?limits=${itemPerPage}&skip=${skip}`)
            .then(res => {
                setInventories(res.data)
                setLoading(false)
            })
            .catch(error=>console.dir(error))
    }, [loading, currentPage, itemPerPage])
    useEffect(() => {
        document.title = 'Mange Inventory - HIBISCUS'
    }, [])

    // handler
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleRemove = () => {
        setShow(false);

        axios.delete(`/api/inventory/${removeItem.id}`, { data: { image: removeItem.image } })
            .then(res => setLoading(true))
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
                <div className="d-block d-md-flex align-items-center mb-4 mb-md-5">
                    <h2 className='mb-3 mb-md-0 text-md-start text-center'> Manage <span className="text-primary"> inventories </span> </h2>
                <button
                        className="btn me-md-0 d-block mx-auto px-5 fw-bold neomorphs_btn text-success"
                        onClick={() => navigate('/add-items')}
                    > Add new items </button>
                </div>
                <Table hover bordered >
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Total Price</th>
                            <th>supplier</th>
                            <th> Stored date </th>
                            <th style={{minWidth: '135px'}}> <b>#</b> </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            inventories.map(inventory => (
                                <ManageInventoryRow
                                    key={inventory._id}
                                    inventory={inventory}
                                    handleShow={handleShow}
                                    setRemoveItem={setRemoveItem}
                                />
                            ))
                        }
                    </tbody>
                </Table>
                {/* pagination */}
                {
                    pageNumber > 0 && <div className="mt-4">
                        <Pagination
                            pageNumber={pageNumber}
                            currentPage={currentPage}
                            setCurrentPage={setCurrentPage}
                            setLoading={setLoading}
                            setItemPerPage={setItemPerPage}
                            itemPerPage={itemPerPage}
                        />
                    </div>
                }
            </div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header className='bg-danger text-light'>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure want to delete this item</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="danger" onClick={handleRemove}>
                        Delete Item
                    </Button>
                </Modal.Footer>
            </Modal>

        </div>
    );
};

export default ManageInventories;