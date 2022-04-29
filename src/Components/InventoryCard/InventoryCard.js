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
            <Card>
                <Card.Img variant="top" src={image} />
                <Card.Body className='text-capitalize'>
                    <Card.Title>
                        {name}-
                        <small className='text-primary' > {model} </small>
                    </Card.Title>
                    <h5 className="fw-bold text-primary"> <span className='tk'>&#2547;</span>{parseInt(price).toLocaleString()}/= </h5>
                    <h6> supplied by {supplier} </h6>

                    <Card.Text>
                        {
                            description.length > 30 ? (
                                <> {description.slice(0, 100)} <Link to={`/inventory/${_id}`}> see more... </Link> </>
                            ) : description
                        }
                    </Card.Text>
                    <div className={`fw-bold text-${quantityClass}`}>
                        <span className={`border border-3 d-inline-block px-3 py-1 rounded border-${quantityClass}`}> in stoke {quantity} items </span>
                    </div>
                </Card.Body>
            </Card>
        </Col>
    );
};

export default InventoryCard;