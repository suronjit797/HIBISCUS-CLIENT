import React from 'react';
import { Card, Col } from 'react-bootstrap';

import './InventoryCard.css'

const InventoryCard = ({inventory}) => {
    const {name, model, image, description, price, quantity, supplier} = inventory
    return (
        <Col>
            <Card>
                <Card.Img variant="top" src={image} />
                <Card.Body>
                    <Card.Title className='text-capitalize'> {name} </Card.Title>
                    <Card.Text>
                        {description}
                    </Card.Text>
                </Card.Body>
            </Card>
        </Col>
    );
};

export default InventoryCard;