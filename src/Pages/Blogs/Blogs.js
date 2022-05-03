import React, { useEffect, useState } from 'react';
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

    const [role, setRole] = useState('user')   //have to make with server


    // get auth token form localStorage adn decoded
    const auth_token = localStorage.getItem('auth_token')

    // side effect
    useEffect(() => {
        axios.get('/api/blog')
            .then(res => setBlogs(res.data))
            .catch(error => console.log(error))
        setLoading(false)
    }, [loading])

    useEffect(() => {
        axios.get('/api/user/jwt-verify', {
            headers: {
                Authorization: `Bearer ${auth_token}`
            }
        })
            .then(res => setRole(res.data.role))
            .catch(error => setRole('user'))
        setLoading(false)
    }, [loading, auth_token])

    useEffect(() => {
        document.title = 'Blogs - HIBISCUS'
    }, [])

    // handle blog submit
    const handleSubmitPost = event => {
        event.preventDefault()
        const post = { question, answer }
        axios.post('/api/blog', { post }, {
            headers: {
                Authorization: `Bearer ${auth_token}`
            }
        })
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
                <div className={`my-5 my_form ${role !== 'admin' ? 'd-none' : ''} `}>  {/* after add role remove d-none */}
                    <form onSubmit={handleSubmitPost} className='w-100'>
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
                    <h2 className='text-center mb-4'> Blogs page </h2>
                    {
                        blogs.map(blog => (
                            <SingleBlog
                                key={blog._id}
                                blog={blog}
                                role={role}
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