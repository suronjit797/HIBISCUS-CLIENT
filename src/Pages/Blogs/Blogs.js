import React, { useEffect, useState } from 'react';
import jwt_decode from "jwt-decode";
import { Spinner } from 'react-bootstrap';
import axios from 'axios'

import './Blog.css'
import SingleBlog from './SingleBlog';

const Blogs = () => {

    // statye
    const [blogs, setBlogs] = useState([])
    const [question, setQuestion] = useState('')
    const [answer, setAnswer] = useState('')
    const [loading, setLoading] = useState(true)


    // get auth token form localStorage adn decoded
    const auth_token = localStorage.getItem('auth_token')
    const decoded = auth_token ? jwt_decode(auth_token) : {}

    // side effect
    useEffect(() => {
        axios.get('/api/blog')
            .then(res => setBlogs(res.data))
            .catch(error => console.log(error))
        setLoading(false)
    }, [loading])

    // handle blog submit
    const handleSubmit = event => {
        event.preventDefault()
        const post = { question, answer, email: decoded?.email }
        axios.post('/api/blog', { post })
            .then(res => setLoading(true))
            .catch(error => console.log(error))

        // set default state
        setAnswer('')
        setQuestion('')
    }



    // loading spinner
    if (loading) {
        return (
            <section className="centerSpinner">
                <Spinner animation="border" variant="primary" />
            </section>
        )
    }

    return (
        <div className="container my-4">
            <div className='blog'>
                <div className={`my - 5 my_form ${decoded?.role !== 'admin' ? 'd-none' : ''} `}>  {/* after add role remove d-none */}
                    <form onSubmit={handleSubmit} className='w-100'>
                        <input type="text"
                            name="question"
                            id="question"
                            className="form_control mb-3"
                            onChange={e => setQuestion(e.target.value)}
                            value={question}
                            placeholder='Your question'
                            required
                        />
                        <textarea
                            name="answer"
                            id="answer"
                            rows='5'
                            className="form_control mb-3"
                            onChange={e => setAnswer(e.target.value)}
                            value={answer}
                            placeholder='Your answer'
                            required
                        />
                        <button className="btn mt-3 neomorphs_btn w-100 fw-bold">Post </button>
                    </form>
                </div>

                <div className="blog_body">
                    {
                        blogs.map(blog => (
                            <SingleBlog
                                key={blog._id}
                                blog={blog}
                                role={decoded.role}
                                setLoading={setLoading}
                            />
                        ))
                    }
                </div>
            </div>
        </div >
    );
};

export default Blogs;