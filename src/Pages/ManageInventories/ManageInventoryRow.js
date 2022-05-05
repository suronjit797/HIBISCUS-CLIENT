import React, { useEffect, useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan, faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';


const ManageInventoryRow = ({ inventory, handleShow, setRemoveItem }) => {
    const { _id, name, image, price, date, quantity, supplier } = inventory

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
        setRemoveItem({ id, image })
    }



    const dt = new Date(date).toDateString()

    return (
        <>
            <tr className={`table-${quantityClass}`}  >
                <td data-level='Name: ' > {name} </td>
                <td data-level='Price: ' > {parseInt(price).toLocaleString()} </td>
                <td data-level='Quantity: ' > {parseInt(quantity).toLocaleString()} </td>
                <td data-level='Total: ' > {(parseInt(quantity) * parseInt(price)).toLocaleString()} </td>
                <td data-level='supplier: ' > {supplier} </td>
                <td data-level='stored date: ' > {dt} </td>
                <td className='justify-content-center'>
                    <Link
                        to={`/update-item/${_id}`}
                        title='Update Item'
                        className='d-inline-flex align-items-center justify-content-center mx-2 neomorphs_btn text-primary removeItem'
                    >
                        <FontAwesomeIcon icon={faPenToSquare} />
                    </Link>

                    <button
                        className='neomorphs_btn text-danger removeItem'
                        title='Delete Item'
                        onClick={() => handelRemove(_id)}
                    >
                        <FontAwesomeIcon icon={faTrashCan} />
                    </button>
                </td>
            </tr>
        </>

    );
};

export default ManageInventoryRow;