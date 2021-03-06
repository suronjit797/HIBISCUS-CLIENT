import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import { Button, Modal, Row, Spinner } from 'react-bootstrap';
import InventoryCard from '../../Components/InventoryCard/InventoryCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
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

    // pagination
    const [itemPerPage, setItemPerPage] = useState(9)
    const [pageNumber, setItemPageNumber] = useState('')
    const [currentPage, setCurrentPage] = useState(0)
    const auth_token = localStorage.getItem('auth_token')

    // total my item count
    useEffect(() => {
        axios.get('/api/my-item/count', {
            headers: {
                Authorization: `Bearer ${auth_token}`
            }
        })
            .then(res => setItemPageNumber(Math.ceil(parseInt(res.data.result) / parseInt(itemPerPage))))
            .catch(error => console.dir(error))
    }, [itemPerPage, auth_token, loading])

    useEffect(() => {
        const skip = currentPage * itemPerPage
        axios.get(`/api/my-items?limits=${itemPerPage}&skip=${skip}`, {
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
                    signOut(auth)
                    navigate('/login')
                    return
                }
            })
    }, [user, loading, currentPage, itemPerPage, auth_token])

    useEffect(() => {
        document.title = 'My Items - HIBISCUS'
    }, [])


    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // remove handler
    const handleRemove = () => {
        setShow(false);
        axios.delete(`/api/inventory/${removeItem._id}`, { data: { image: removeItem.image } })
            .then(res => setLoading(true))
            .catch(error => console.log(error))
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
            {
                myItems.length <= 0 ? (
                    <>
                        <h3 className="text-danger text-center"> You haven't add any item.. please add some </h3>
                        <div className="text-center mt-5">
                            <Link to='/add-items' className='neomorphs_btn px-4 fw-bold text-capitalize'> go to add item </Link>
                        </div>
                    </>
                ) : (
                    <>

                        <div>
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

                    </>
                )
            }
        </div>
    );
};

export default MyItems;