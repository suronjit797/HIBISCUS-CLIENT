import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';
import { toast } from 'react-toastify'
import axios from 'axios'

import './UpdateItem.css'

const UpdateItem = () => {
    const { id } = useParams()

    const [product, setProduct] = useState({})
    const [addQuantity, setAddQuantity] = useState(0)
    const [loading, setLoading] = useState(true)

    const [quantityClass, setQuantityClass] = useState('danger')
    const { image, name, date, description, price, quantity, supplier } = product
    useEffect(() => {
        if (quantity > 20) {
            setQuantityClass('success')
        } else if (quantity > 10) {
            setQuantityClass('warning')
        } else {
            setQuantityClass('danger')
        }
    }, [quantity])


    useEffect(() => {
        axios.get(`/api/inventory/${id}`)
            .then(res => {
                setProduct(res.data)
                setLoading(false)
            })
            .catch(error => console.log(error))
    }, [id, loading])



    // loading spinner
    if (loading) {
        return (
            <section className="centerSpinner">
                <Spinner animation="border" variant="primary" />
            </section>
        )
    }


    const dt = new Date(date).toDateString()

    // delivered handler
    const handleDelivered = () => {
        if (quantity > 0) {
            axios.put(`/api/inventory/${id}`, { quantity: quantity - 1 })
                .then(res => {
                    console.log(res.data)
                    setLoading(true)
                    toast.success('successfully delivered', { theme: 'colored' })
                })
                .catch(error => console.log(error))
        } else {
            toast.warning('No items available to delivered', { theme: 'colored' })
        }
    }

    // add products handler
    const handleAddQuantity = () => {
        if (addQuantity > 100) {
            toast.warning('You can add maximum 100 products quantity', { theme: 'colored' })
        } else if (addQuantity <= 0) {
            toast.warning('You you have minimum one product to add products quantity', { theme: 'colored' })
        } else {
            axios.put(`/api/inventory/${id}`, { quantity: parseInt(quantity) + parseInt(addQuantity) })
                .then(res => {
                    console.log(res.data)
                    setLoading(true)
                    setAddQuantity(0)
                    toast.success('successfully add item', { theme: 'colored' })
                })
                .catch(error => console.log(error))
        }
    }


    const handleDeliveredQuantity = () => {
        toast.info('this feature will be available soon', { theme: 'colored' })
    }

    return (
        <div className="updateItem">
            <div className='container my-5 '>
                <div className="card text-capitalize">
                    <div className="row gx-4 align-items-stretch">
                        <div className="col-md-4">
                            <div className="position-relative inventory_image h-100">
                                
                                <img src={image} className="img-fluid rounded-start h-100 w-100" alt="..." />
                                <b
                                    className={` position-absolute end-0 top-0 rounded_custom-left px-3 py-2 text-white bg-${quantityClass} `}>
                                    {
                                        quantity > 0 ? `available ${quantity}` : ' Out Of stock '
                                    }
                                </b>
                            </div>
                        </div>
                        <div className="col-md-8">
                            <div className="card-body py-4">
                                <h4 className="card-title mb-4"> {name} </h4>
                                <p className="card-text"> {description} </p>
                                <p className="card-text mb-1"> <b>price:</b> {price} tk </p>
                                <p className="card-text mb-1"> <b>total price: </b> {quantity * price} tk </p>
                                <p className="card-text"> products supplied by <b>{supplier}</b> </p>
                                <p className="mb-0"> Added in: {dt}  </p>
                                <div>
                                    <div className='my-3 updateAddForm' >
                                        <button className="btn btn-danger" onClick={handleDeliveredQuantity} > delivered </button>
                                        <input
                                            type="number"
                                            name="number"
                                            id="number"
                                            placeholder='Quantity'
                                            value={addQuantity}
                                            onChange={e => setAddQuantity(e.target.value)}
                                            required
                                        />
                                        <button className="btn btn-success" onClick={handleAddQuantity}> Add </button>
                                    </div>
                                </div>

                                <button
                                    className="btn neomorphs_btn primary_btn d-inline-block mt-3 px-5"
                                    onClick={handleDelivered}
                                > <span>Delivered</span> </button>
                            </div>
                        </div>
                    </div>
                </div>



            </div>
        </div>
    );
};

export default UpdateItem;