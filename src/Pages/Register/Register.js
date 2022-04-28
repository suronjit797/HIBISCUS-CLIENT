import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Register = () => {

    // form state
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    // sumbit handler
    const handleSumbit = event => {
        event.preventDefault()

        if(password !== confirmPassword){
            alert('Password Does not match')
            return
        }

        alert(email, password)
    }


    return (
        <div className='my-4 my_form'>
            <h1 className="text-center mb-4"> Register Hare </h1>
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
                <input type="password"
                    name="password"
                    id="confirmPassword"
                    className="form-control mb-3"
                    required
                    onChange={e => setConfirmPassword(e.target.value)}
                    value={confirmPassword}
                    placeholder='Confirm Your Password'
                />
                <p className='my-3' > Don't have an account <Link to='/login'> Login Now </Link> </p>
                <button className="btn primary_btn w-100"> <span>Register Now</span> </button>
            </form>
        </div>
    );
};

export default Register;