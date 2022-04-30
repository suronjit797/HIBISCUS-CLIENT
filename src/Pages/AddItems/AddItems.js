import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';

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
    //  name, model, image, description, price, quantity, supplier email

    const handleAddItems = event => {
        event.preventDefault()

    }
    console.log(user.email);
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
                            value={image}
                            onChange={e => setImage(e.target.value)}
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