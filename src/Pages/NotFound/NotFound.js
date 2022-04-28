import React from 'react';
import { Link } from 'react-router-dom';
import './NotFound.css'

const NotFound = () => {
    return (
        <div className='notFound text-center'>
            <h1 className='fw-bold'> Opps!!! </h1>
            <b className='mt-2 mb-3'>Error 4O4 : Page Not Found </b>
            <Link to='/' className="btn primary_btn d-inline-block"> <span>Go Home</span> </Link>
        </div>
    );
};

export default NotFound;