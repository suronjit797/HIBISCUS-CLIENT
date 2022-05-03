import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './NotFound.css'

const NotFound = () => {
    useEffect(()=>{
        document.title = '4O4 Not found'
    },[])
    return (
        <div className='notFound text-center'>
            <h1 className='fw-bold'> Opps!!! </h1>
            <b className='mt-2 mb-3'>Error 4O4 : Page Not Found </b>
            <Link to='/' className="btn neomorphs_btn fw-bold text-primary d-inline-block"> <span>Go Home</span> </Link>
        </div>
    );
};

export default NotFound;