import React, { useEffect, useState } from 'react';
import { Spinner } from 'react-bootstrap';
import { useCreateUserWithEmailAndPassword, useUpdateProfile } from 'react-firebase-hooks/auth';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import auth from '../../firebase.init';
import { toast } from 'react-toastify';
import FirebaseErrorMsg from '../../Components/firebaseErrorMsg';
import SocialSignIn from '../../Components/SocialSignIn/SocialSignIn';
import axios from 'axios';


const Register = () => {

    // location
    const navigate = useNavigate()
    const location = useLocation()
    let from = location?.state?.from?.pathname || "/";



    // form state
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [agree, setAgree] = useState(false)


    // firebase 
    const [createUserWithEmailAndPassword, emailUser, emailLoading, emailError] = useCreateUserWithEmailAndPassword(auth, { sendEmailVerification: true });
    const [updateProfile, updating] = useUpdateProfile(auth);



    // submit handler
    const handleSubmit = async (event) => {
        event.preventDefault()
        // password must be 6 character
        if (password.length < 6) {
            return toast.error('Password Must be 6 Character', { theme: "colored" })
        }
        // confirm password check
        if (password !== confirmPassword) {
            return toast.error('Password Does not match', { theme: "colored" })
        }
        await createUserWithEmailAndPassword(email, password)
        await updateProfile({ displayName: name });

    }

    useEffect(() => {
        if (emailError) {
            toast.error(FirebaseErrorMsg(emailError.message), { theme: "colored" })
        }
    }, [emailError])


    if (emailUser) {
        navigate(from, { replace: true });
        // jwt token
        axios.post('/api/user/login', { email, role: 'user' })   //have to make role dynamic
            .then(res => {
                console.log(res.data.token)
                localStorage.setItem('auth_token', res.data.token)
            })
            .catch(error => console.log(error))
    }

    if (emailLoading || updating) {
        return (
            <section className="centerSpinner">
                <Spinner animation="border" variant="primary" />
            </section>
        )
    }




    return (
        <div className='my-5 my_form'>
            <h1 className="text-center mb-5"> Registration </h1>
            <form onSubmit={handleSubmit} className='w-100'>
                <input type="text"
                    name="name"
                    id="name"
                    className="form_control mb-3"
                    onChange={e => setName(e.target.value)}
                    value={name}
                    placeholder='Your Name'
                    // autoComplete='off'
                    required
                />
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
                <input type="password"
                    name="password"
                    id="confirmPassword"
                    className="form_control mb-3"
                    onChange={e => setConfirmPassword(e.target.value)}
                    value={confirmPassword}
                    placeholder='Confirm Your Password'
                    // autoComplete='off'
                    required
                />
                <div className="mb-3 form-check">
                    <input
                        type="checkbox"
                        className="form-check-input"
                        id="exampleCheck1"
                        checked={agree}
                        onChange={e => setAgree(e.target.checked)}
                    />
                    <label className="form-check-label text-capitalize" htmlFor="exampleCheck1">
                        are you agree with out terms & conditions?
                    </label>
                </div>
                <button
                    className="btn mt-3 neomorphs_btn w-100"
                    disabled={!agree}
                > <span>Register Now</span> </button>
                <p className='my-3' > Don't have an account <Link to='/login'> Login Now </Link> </p>
            </form>

            <SocialSignIn />
        </div>
    );
};

export default Register;