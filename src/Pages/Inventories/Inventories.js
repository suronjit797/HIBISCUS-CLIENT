import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Row, Spinner } from 'react-bootstrap';
import InventoryCard from '../../Components/InventoryCard/InventoryCard';
import Pagination from '../../Components/Pagination/Pagination';
import { useNavigate } from 'react-router-dom';

const Inventories = () => {
    const [inventories, setInventories] = useState([])
    const [loading, setLoading] = useState(true)

    const navigate = useNavigate()


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
            .catch(error => console.dir(error))
    }, [loading, currentPage, itemPerPage])

    // total item count
    useEffect(() => {
        axios.get('/api/inventory/count')
            .then(res => setItemPageNumber(Math.ceil(parseInt(res.data.result) / parseInt(itemPerPage))))
            .catch(error => console.dir(error))
    }, [itemPerPage])

    useEffect(() => {
        document.title = 'Inventory - HIBISCUS'
    }, [])

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

                <div className="d-block d-md-flex align-items-center mb-4 mb-md-5">
                    <h2 className='mb-3 mb-md-0 text-md-start text-center headers '>Inven<span className="text-primary">tories </span> </h2>
                    <button
                        className="btn me-md-0 d-block mx-auto px-5 fw-bold neomorphs_btn text-success"
                        onClick={() => navigate('/add-items')}
                    > Add new items </button>
                </div>



                <Row xs={1} md={2} lg={3} className="g-4">
                    {
                        inventories.map(inventory => <InventoryCard key={inventory._id} inventory={inventory} />)
                    }
                </Row>
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
        </div>
    );
};

export default Inventories;