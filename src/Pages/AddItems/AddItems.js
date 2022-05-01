import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import axios from 'axios'
import { toast } from 'react-toastify';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCloudArrowUp } from '@fortawesome/free-solid-svg-icons'

import './AddItems.css'

const AddItems = () => {
    // make data formate
    const dt = new Date()
    const YYYY = '' + dt.getFullYear()
    let MM = '' + (dt.getMonth() + 1)
    let DD = '' + dt.getDate()

    if (MM.length < 2) {
        MM = '0' + MM;
    }
    if (DD.length < 2) {
        DD = '0' + DD;
    }

    // states
    const [name, setName] = useState('')
    const [image, setImage] = useState('')
    const [price, setPrice] = useState('')
    const [quantity, setQuantity] = useState('')
    const [supplier, setSupplier] = useState('')
    const [date, setDate] = useState(`${YYYY}-${MM}-${DD}`)
    const [description, setDescription] = useState(name)

    // fire base
    const [user] = useAuthState(auth);
    const email = user.email
    //  name, date, image, description, price, quantity, supplier email

    const handleAddItems = event => {
        event.preventDefault()

        // validation for add data
        if (!image) {
            return toast.error('Please choose a image for your products', { theme: "colored" })
        } else if (image.size > 1048576) {
            return toast.error('File size is too large. please try to upload under 1MB', { theme: "colored" })
        } else if (quantity < 5) {
            return toast.error('Please add minimum 5 items', { theme: "colored" })
        }

        // make form data
        const formData = new FormData()

        // append in form data
        formData.append('email', email)
        formData.append('name', name)
        formData.append('image', image)
        formData.append('price', price)
        formData.append('quantity', quantity)
        formData.append('supplier', supplier)
        formData.append('date', date)
        formData.append('description', description)

        // post in data base
        axios.post('/api/inventory', formData)
            .then(res => {
                if (res.data.insertedId) {
                    toast.success('File added successfully', { theme: "colored" })
                }
            })
            .catch(error => toast.error(error.message, { theme: "colored" }))

        // initial state set
        setName('')
        setImage('')
        setDescription('')
        setPrice('')
        setQuantity('')
        setSupplier('')
        setDate(`${YYYY}-${MM}-${DD}`)
    }
    return (
        <div className='container my-5'>
            <form onSubmit={handleAddItems} className=' addNewForm row'>

                <div className="col-md-6">
                    <div className="form-group mb-3">
                        <input
                            type="text"
                            name="name"
                            id="name"
                            value={name}
                            onChange={e => setName(e.target.value)}
                            placeholder=" Enter your product's name"
                            // autoComplete='off'
                            className='form_control'
                            autoCapitalize='on'
                            required
                        />
                    </div>

                    <div className="form-group mb-3">
                        <input
                            type="number"
                            name="price"
                            id="price"
                            value={price}
                            onChange={e => setPrice(e.target.value)}
                            placeholder=" Enter your product's price"
                            // autoComplete='off'
                            className='form_control'
                            required
                        />
                    </div>
                    <div className="form-group mb-3">
                        <input
                            type="date"
                            name="date"
                            id="date"
                            value={date}
                            onChange={e => setDate(e.target.value)}
                            placeholder=" Enter your product's price"
                            // autoComplete='off'
                            className='form_control'
                            required
                        />
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="form-group mb-3">
                        <input
                            type="number"
                            name="quantity"
                            id="quantity"
                            value={quantity}
                            onChange={e => setQuantity(e.target.value)}
                            placeholder=" Enter your product's quantity"
                            // autoComplete='off'
                            className='form_control'
                            required
                        />
                    </div>
                    <div className="form-group mb-3">
                        <input
                            type="text"
                            name="supplier"
                            id="supplier"
                            value={supplier}
                            onChange={e => setSupplier(e.target.value)}
                            placeholder=" Enter your supplier name"
                            // autoComplete='off'
                            className='form_control'
                            required
                        />
                    </div>
                    <div className="form-group mb-3">
                        <label className='image-file w-100 neomorphs_btn text-primary' htmlFor="image">
                            <FontAwesomeIcon className='me-3 ' icon={faCloudArrowUp} />
                            Upload Images
                        </label>
                        <input
                            type="file"
                            name="image"
                            id="image"
                            className='d-none'
                            files={image}
                            onChange={e => setImage(e.target.files[0])}
                        />
                    </div>
                </div>

                <div className="form-group mb-3">
                    <textarea
                        name="description"
                        id="description"
                        rows="6"
                        className='form_control'
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        placeholder=" Enter your product's description"
                        // autoComplete='off'
                        required
                    />
                </div>


                <div className="col-12">
                    <button type="submit" className='neomorphs_btn mx-auto w-100' > Add you items </button>
                </div>




            </form>
        </div>
    );
};

export default AddItems;