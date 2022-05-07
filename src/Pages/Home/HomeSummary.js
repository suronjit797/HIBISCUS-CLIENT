import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBoxesStacked } from '@fortawesome/free-solid-svg-icons'

const HomeSummary = ({ loading }) => {

    const [totalItems, setTotalItems] = useState(0)
    const [lowQuantity, setLowQuantity] = useState(0)
    const [heighQuantity, setHeighQuantity] = useState(0)
    const [stockOut, setStockOut] = useState(0)
    const [supplier, setSupplier] = useState([])

    // total products
    useEffect(() => {
        axios.get('/api/inventory/count')
            .then(res => setTotalItems(res.data.result))
    }, [loading])
    // lowQuantity
    useEffect(() => {
        axios.get('/api/low-quantity')
            .then(res => setLowQuantity(res.data.result))
    }, [loading])
    // most in stock
    useEffect(() => {
        axios.get('/api/high-quantity')
            .then(res => setHeighQuantity(res.data.result))
    }, [loading])
    // out of  stock
    useEffect(() => {
        axios.get('/api/stock-out')
            .then(res => setStockOut(res.data.result))
    }, [loading])
    // supplier
    useEffect(() => {
        axios.get('/api/suppliers')
            .then(res => setSupplier(res.data.result))
    }, [loading])




    return (
        <div className='mt-5'>
            <h3 className="text-center mb-4 home_summary-header fw-bold">
                <span className="text-primary">Inventory </span> Summary
            </h3>

            <Row xs={1} sm={2} md={3} lg={4} className="g-4 text-capitalize" >
                <Col>
                    <div className="bg_primary summary_card p-4 d-flex justify-content-center align-items-center text-white">
                        <FontAwesomeIcon className='me-3 fa-2x' icon={faBoxesStacked} />
                        <div>
                            <h6>total items</h6>
                            <h5 className="fw-bold text-center"> {totalItems} </h5>
                        </div>
                    </div>
                </Col>
                <Col>
                    <div className="bg_warning summary_card p-4 d-flex justify-content-center align-items-center text-white">
                        <FontAwesomeIcon className='me-3 fa-2x' icon={faBoxesStacked} />
                        <div>
                            <h6>Low quantity</h6>
                            <h5 className="fw-bold text-center"> {lowQuantity} </h5>
                        </div>
                    </div>
                </Col>
                <Col>
                    <div className="bg_success summary_card p-4 d-flex justify-content-center align-items-center text-white">
                        <FontAwesomeIcon className='me-3 fa-2x' icon={faBoxesStacked} />
                        <div>
                            <h6>Most in stock</h6>
                            <h5 className="fw-bold text-center"> {heighQuantity} </h5>
                        </div>
                    </div>
                </Col>
                <Col>
                    <div className="bg_danger  summary_card p-4 d-flex justify-content-center align-items-center text-white">
                        <FontAwesomeIcon className='me-3 fa-2x' icon={faBoxesStacked} />
                        <div>
                            <h6>out of stock</h6>
                            <h5 className="fw-bold text-center"> {stockOut} </h5>
                        </div>
                    </div>
                </Col>
                <Col>
                    <div className="bg_info summary_card p-4 d-flex justify-content-center align-items-center text-white">
                        <FontAwesomeIcon className='me-3 fa-2x' icon={faBoxesStacked} />
                        <div>
                            <h6> Total Suppliers </h6>
                            <h5 className="fw-bold text-center"> {supplier.length} </h5>
                        </div>
                    </div>
                </Col>
            </Row>
        </div>
    );
};

export default HomeSummary;