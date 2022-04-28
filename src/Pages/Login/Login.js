import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';


import './Login.css'


const Login = () => {
    const [auth, setAuth] = useState({ user: false })  //have to make user auth

    // form state
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    // for location
    let navigate = useNavigate();
    let location = useLocation();




    let from = location.state?.from?.pathname || "/";
    if (auth.user) {
        navigate(from, { replace: true });
    }


    // sumbit handler
    const handleSumbit = event => {
        event.preventDefault()

        toast.success('user login successful', {theme: "colored"})
    }

    const handleResetPassowrd = () => {
        toast.error('Processing Reset Password...',  {theme: "colored"})
    }

    return (
        <div className='my-4 my_form'>
            <h1 className="text-center mb-4"> Login Hare </h1>
            <form onSubmit={handleSumbit} className='w-100'>
                <input type="email"
                    name="email"
                    id="email"
                    className="form-control mb-3"
                    required
                    onChange={e => setEmail(e.target.value)}
                    value={email}
                    placeholder='Your Email'
                />
                <input type="password"
                    name="password"
                    id="password"
                    className="form-control mb-3"
                    required
                    onChange={e => setPassword(e.target.value)}
                    value={password}
                    placeholder='Your Password'
                />

                <p className='my-3' > Don't have an account <Link to='/register'> Register Now </Link> </p>
                <b
                    className='my-3 d-block cursor-pointer text-primary'
                    onClick={handleResetPassowrd}
                > Forgotten password? </b>

                <button className="btn primary_btn w-100"> <span>Login Now</span> </button>
            </form>
        </div>
    );
};

export default Login;