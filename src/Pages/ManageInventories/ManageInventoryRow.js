import React, { useEffect, useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan } from '@fortawesome/free-solid-svg-icons'


const ManageInventoryRow = ({ inventory }) => {
    const { _id, name, model, price, quantity, supplier } = inventory

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
        <tr className={`table-${quantityClass}`}  >
            <td> {name}-{model} </td>
            <td> {quantity} </td>
            <td>
                <span className='tk'> &#2547; </span>{parseInt(price * quantity).toLocaleString()}/=
            </td>
            <td>
                <button className='neomorphs_btn text-danger removeItem' > <FontAwesomeIcon icon={faTrashCan} /> </button>
            </td>
        </tr>

    );
};

export default ManageInventoryRow;