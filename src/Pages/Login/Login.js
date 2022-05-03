import React, { useEffect, useState } from 'react';
import { Button, Form, Modal, Spinner } from 'react-bootstrap';
import { useSendPasswordResetEmail, useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import FirebaseErrorMsg from '../../Components/firebaseErrorMsg';
import SocialSignIn from '../../Components/SocialSignIn/SocialSignIn';
import auth from '../../firebase.init';
import axios from 'axios'


import './Login.css'


const Login = () => {
    // form state
    const [email, setEmail] = useState('')
    const [resetEmail, setResetEmail] = useState('')
    const [password, setPassword] = useState('')
    const [show, setShow] = useState(false);


    // for location
    let navigate = useNavigate();
    let location = useLocation();
    let from = location?.state?.from?.pathname || "/";

    // firebase hooks
    const [
        signInWithEmailAndPassword, signUser, signLoading, signError,] = useSignInWithEmailAndPassword(auth);
    const [sendPasswordResetEmail, sending, resetError] = useSendPasswordResetEmail(auth)

    // for error message
    useEffect(() => {
        if (signError) {
            toast.error(FirebaseErrorMsg(signError.message), { theme: "colored" })
        } else if (resetError) {
            toast.error(FirebaseErrorMsg(resetError.message), { theme: "colored" })
        }
    }, [signError, resetError])


    // login submit handler
    const handleSubmit = event => {
        event.preventDefault()
        signInWithEmailAndPassword(email, password)

        // jwt token
        axios.post('/api/user/login', { email })
            .then(res => {
                console.log(res.data.token)
                localStorage.setItem('auth_token', res.data.token)
            })
            .catch(error => console.log(error))
    }

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // password reset handler
    const handleResetPassword = event => {
        event.preventDefault()
        sendPasswordResetEmail(resetEmail)
        toast.info('Processing Reset Password. Please check you gmail account', { theme: "colored" })
        setShow(false);
    }

    // loading spinner
    if (signLoading || sending) {
        return (
            <section className="centerSpinner">
                <Spinner animation="border" variant="primary" />
            </section>
        )
    }

    // navigate to home
    if (signUser) {
        navigate(from, { replace: true });
    }

    return (
        <div className='my-5 my_form'>
            <h1 className="text-center mb-5"> Login Hare </h1>
            <form onSubmit={handleSubmit} className='w-100'>
                <input type="email"
                    name="email"
                    id="email"
                    className="form_control mb-3"
                    onChange={e => setEmail(e.target.value)}
                    value={email}
                    placeholder='Your Email'
                    // autoComplete='off'
                    required
                />
                <input type="password"
                    name="password"
                    id="password"
                    className="form_control mb-3"
                    onChange={e => setPassword(e.target.value)}
                    value={password}
                    placeholder='Your Password'
                    // autoComplete='off'
                    required
                />
                <b className='mb-3 d-block cursor-pointer text-primary' onClick={handleShow}>
                    Forgotten password?
                </b>

                <button className="btn mt-3 neomorphs_btn w-100"> <span>Login Now</span> </button>
                <p className='my-3' > Don't have an account <Link to='/register'> Register Now </Link> </p>
            </form>
            <SocialSignIn />

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title> Reset you password? </Modal.Title>
                </Modal.Header>
                <Form onSubmit={''}>
                    <Modal.Body>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Your Email Address"
                                value={resetEmail}
                                required
                                onChange={e => setResetEmail(e.target.value)}
                                autoFocus
                            />
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="danger" onClick={handleClose}>
                            Close
                        </Button>
                        <Button type='submit' variant="primary" onClick={handleResetPassword}>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </div>
    );
};

export default Login;