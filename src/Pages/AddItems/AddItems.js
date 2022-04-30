import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import axios from 'axios'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCloudArrowUp } from '@fortawesome/free-solid-svg-icons'

import './AddItems.css'





const AddItems = () => {

    // states
    const [name, setName] = useState('')
    const [model, setModel] = useState('')
    const [image, setImage] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
    const [quantity, setQuantity] = useState('')
    const [supplier, setSupplier] = useState('')



    // fire base
    const [user] = useAuthState(auth);
    const email = user.email
    //  name, model, image, description, price, quantity, supplier email

    const handleAddItems = event => {
        event.preventDefault()

        // make form data
        const formData = new FormData()

        // append in form data
        formData.append('email', email)
        formData.append('name', name)
        formData.append('model', model)
        formData.append('image', image)
        formData.append('description', description)
        formData.append('price', price)
        formData.append('quantity', quantity)
        formData.append('supplier', supplier)

        // post in data base
        axios.post('/api/inventory', formData)
            .then(res => console.log(res.data))




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
                            type="text"
                            name="model"
                            id="model"
                            value={model}
                            onChange={e => setModel(e.target.value)}
                            placeholder=" Enter your product's model number"
                            // autoComplete='off'
                            className='form_control'
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