import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import { Button, Modal, Row, Spinner } from 'react-bootstrap';
import InventoryCard from '../../Components/InventoryCard/InventoryCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import Pagination from '../../Components/Pagination/Pagination';


const MyItems = () => {

    const navigate = useNavigate()

    const [myItems, setMyItems] = useState([])
    const [show, setShow] = useState(false);
    const [removeItem, setRemoveItem] = useState({})   //have to remove in 42 line
    const [loading, setLoading] = useState(true)
    // fire base
    const [user, userLoading] = useAuthState(auth);

    useEffect(() => {
        const auth_token = localStorage.getItem('auth_token')
        axios.get('/api/my-items', {
            headers: {
                Authorization: `Bearer ${auth_token}`
            }
        })
            .then(res => {
                setMyItems(res.data)
                setLoading(false)
            })
            .catch(error => {
                if (error.request.status === 403 || error.request.status === 401) {
                    toast.error(error.message, { theme: 'colored' })
                    // signOut(auth)
                    navigate('/login')
                    return
                }
            })
    }, [user, loading])

    useEffect(() => {
        document.title = 'My Items - HIBISCUS'
    }, [])


    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // remove handler
    const handleRemove = () => {
        setShow(false);
        toast.info('remove your item will be available soon', { theme: 'colored' })

        // this item have to available after assignment result
        /* 
                axios.delete(`/api/inventory/${removeItem._id}`, { data: { image: removeItem.image } })
                    .then(res => setLoading(true))
                    .catch(error => console.log(error))
        */
    }

    // loading spinner
    if (userLoading || loading) {
        return (
            <section className="centerSpinner">
                <Spinner animation="border" variant="primary" />
            </section>
        )
    }

    return (
        <div className='container my-5'>
            <div className="my-items">
                <Row lg={3} md={2} className='g-4' >
                    {
                        myItems.map(item => (
                            <InventoryCard inventory={item} key={item._id}>
                                <button
                                    className="btn btn-danger close_btn"
                                    title='Remove your items'
                                    onClick={() => {
                                        handleShow()
                                        setRemoveItem(item)
                                    }}
                                >
                                    <FontAwesomeIcon icon={faXmark} />
                                </button>
                            </InventoryCard>
                        ))
                    }
                </Row>
            </div>

            {/* modal */}
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
            <Pagination />
        </div>
    );
};

export default MyItems;