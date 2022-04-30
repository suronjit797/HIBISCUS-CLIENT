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


    // remove handler
    const handleRemove = id => {
        const confirm = window.confirm('are you sure to remove ' + id + ' ' + name)
        console.log(confirm);
    }


    return (
        <tr className={`table-${quantityClass}`}  >
            <td data-level='Name' > {name} ({model}) </td>
            <td data-level='supplier' > {supplier} </td>
            <td data-level='Quantity' > {quantity} </td>
            <td data-level='total price' >
                <span> <span className='tk'> &#2547; </span>{parseInt(price * quantity).toLocaleString()}/= </span>
            </td>
            <td className='justify-content-center'>
                <button className='neomorphs_btn text-danger removeItem' onClick={() => handleRemove(_id)} >
                    <FontAwesomeIcon icon={faTrashCan} />
                </button>
            </td>
        </tr>

    );
};

export default ManageInventoryRow;