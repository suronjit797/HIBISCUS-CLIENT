import React, { useEffect, useState } from 'react';
import { Card, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import './InventoryCard.css'

const InventoryCard = ({ inventory }) => {
    const { _id, name, model, image, description, price, quantity, supplier } = inventory

    const [quantityClass, setQuantityClass] = useState('danger')

    useEffect(() => {
        if (quantity > 20) {
            setQuantityClass('success')
        } else if (quantity > 10) {
            setQuantityClass('warning')
        } else {
            setQuantityClass('danger')
        }
    }, [quantity])


    return (
        <Col>
            <Card className='inventory_card'>
                <Card.Img variant="top" src={image} />
                <Card.Body className='text-capitalize'>
                    <Card.Title>
                        {name}-
                        <small className='text-primary' > {model} </small>
                    </Card.Title>
                    <h5 className="fw-bold text-primary">
                        <span className="text-dark me-2"> price: </span> 
                        <span className='tk'> &#2547;</span>{parseInt(price).toLocaleString()}/=
                    </h5>
                    <h6 className='text-secondary mb-3 fw-bold'> supplied by {supplier} </h6>
                    <Card.Text className="text-justify">
                        {
                            description.length > 140 ? (
                                <>
                                    {description.slice(0, 140)}... <Link to={`/inventory/${_id}`}>see more </Link>
                                </>
                            ) : description
                        }
                    </Card.Text>
                    <div className={`fw-bold text-${quantityClass}`}>
                        {
                            quantity > 0 ? (
                                <span className={`border border-3 d-inline-block px-3 py-1 rounded border-${quantityClass}`}> in stoke {quantity} items </span>
                            ) : (
                                <span className={`border border-3 border-danger d-inline-block px-3 py-1 rounded bg-danger text-white`}> Out of stock </span>
                            )
                        }
                    </div>

                    <Link to={`/update-item/${_id}`} className="btn neomorphs_btn bg-dark text-light mt-3 w-100"> Manage Stock </Link>

                </Card.Body>
            </Card>
        </Col>
    );
};

export default InventoryCard;