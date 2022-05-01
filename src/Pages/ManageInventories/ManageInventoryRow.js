import React, { useEffect, useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan } from '@fortawesome/free-solid-svg-icons'


const ManageInventoryRow = ({ inventory, handleShow, setRemoveId }) => {
    const { _id, name, date, quantity, supplier } = inventory

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

    const handelRemove = id => {
        handleShow()
        setRemoveId(id)
    }



    return (
        <>
            <tr className={`table-${quantityClass}`}  >
                <td data-level='Name: ' > {name} </td>
                <td data-level='supplier: ' > {supplier} </td>
                <td data-level='Quantity: ' > {quantity} </td>
                <td data-level='stored date: ' > {date} </td>
                <td className='justify-content-center'>
                    <button className='neomorphs_btn text-danger removeItem' onClick={() => handelRemove(_id)} >
                        <FontAwesomeIcon icon={faTrashCan} />
                    </button>
                </td>
            </tr>
        </>

    );
};

export default ManageInventoryRow;