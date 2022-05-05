import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { toast } from 'react-toastify';
import axios from 'axios';

const SingleBlog = ({ blog, role, setLoading }) => {
    const { _id, answer, question } = blog

    //remove handler
    const handleRemoveBlog = () => {
        const confirm = window.confirm('Are you sure want to delete this post?')
        if (confirm) {
            axios.delete(`/api/blog/${_id}`)
                .then(res => {
                    toast.success('Blog delete successfully', {theme: 'colored'})
                    setLoading(true)
                })
                .catch(error => console.log(error))
        }
    }
    return (
        <div className='single_blog text-capitalize text-justify px-5'>
            <h3 className='text-primary'> {question}? </h3>
            <p> {answer} </p>
            <button
                className={`text-danger close_btn ${role !== 'admin' ? 'd-none' : ''}`} //implement role system
                title='Remove your items'
                onClick={handleRemoveBlog}
            >
                <FontAwesomeIcon icon={faXmark} />
            </button>
        </div>
    );
};

export default SingleBlog;