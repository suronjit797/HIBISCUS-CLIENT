import React, { useEffect, useState } from 'react';
import { Spinner } from 'react-bootstrap';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import FirebaseErrorMsg from '../../Components/firebaseErrorMsg';
import auth from '../../firebase.init';


import './Login.css'


const Login = () => {

    // form state
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    // for location
    let navigate = useNavigate();
    let location = useLocation();
    let from = location.state?.from?.pathname || "/";

    // firebase hoooks
    const [
        signInWithEmailAndPassword,
        signUser,
        signLoading,
        signError,
    ] = useSignInWithEmailAndPassword(auth);


    useEffect(() => {
        if (signError) {
            toast.error(FirebaseErrorMsg(signError.message), { theme: "colored" })
        }
    }, [signError])


    // sumbit handler
    const handleSumbit = event => {
        event.preventDefault()
        signInWithEmailAndPassword(email, password)
    }

    const handleResetPassowrd = () => {
        toast.error('Processing Reset Password...', { theme: "colored" })
    }

    if (signLoading) {
        return (
            <p className="centerSpinner">
                <Spinner animation="border" variant="primary" />
            </p>
        )
    }

    if (signUser) {
        navigate(from, { replace: true });
    }

    return (
        <div className='my-5 my_form'>
            <h1 className="text-center mb-5"> Login Hare </h1>
            <form onSubmit={handleSumbit} className='w-100'>
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
                <b className='mb-3 d-block cursor-pointer text-primary' onClick={handleResetPassowrd}>
                    Forgotten password?
                </b>

                <button className="btn primary_btn w-100"> <span>Login Now</span> </button>
                <p className='my-3' > Don't have an account <Link to='/register'> Register Now </Link> </p>
            </form>
        </div>
    );
};

export default Login;