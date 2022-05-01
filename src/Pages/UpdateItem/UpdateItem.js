import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';
import axios from 'axios'

import './UpdateItem.css'

const UpdateItem = () => {
    const { id } = useParams()

    const [product, setProduct] = useState({})
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        axios.get(`/api/inventory/${id}`)
            .then(res => {
                setProduct(res.data)
                setLoading(false)
            })
            .catch(error => console.log(error))
    }, [id])






    // loading spinner
    if (loading) {
        return (
            <section className="centerSpinner">
                <Spinner animation="border" variant="primary" />
            </section>
        )
    }


    const { image, name, date, description, price, quantity, supplier } = product
    const dt = new Date(date).toDateString()

    return (
        <div className="updateItem">
            <div className='container my-5 '>
                <div className="card">
                    <div className="row gx-4 align-items-stretch">
                        <div className="col-md-4">
                            <img src={image} className="img-fluid rounded-start h-100 w-100" alt="..." />
                        </div>
                        <div className="col-md-8">
                            <div className="card-body text-capitalize">
                                <h4 className="card-title mb-4"> {name} </h4>
                                <p className="card-text"> {description} </p>
                                <p className="card-text mb-1"> <b>price:</b> {price} tk </p>
                                <p className="card-text mb-1"> <b>quantity</b> {quantity} Phones </p>
                                <p className="card-text mb-1"> <b>total price: </b> {quantity * price} tk </p>
                                <p className="card-text"> supplied by {supplier} </p>

                                <p className="mb-0"> Added in: {dt}  </p>

                                <button className="btn neomorphs_btn primary_btn d-inline-block mt-3 px-5"> <span>Delivered</span> </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UpdateItem;