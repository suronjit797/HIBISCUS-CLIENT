import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSignInWithFacebook, useSignInWithGithub, useSignInWithGoogle } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import FirebaseErrorMsg from '../firebaseErrorMsg';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebookF, faGithub, faGoogle } from '@fortawesome/free-brands-svg-icons'

import './SocialSignIn.css'
import { Spinner } from 'react-bootstrap';
import axios from 'axios';

const SocialSignIn = () => {

    // location
    const navigate = useNavigate()
    const location = useLocation()
    let from = location?.state?.from?.pathname || "/";

    // google sign in  
    const [signInWithGoogle, googleUser, googleLoading, googleError] = useSignInWithGoogle(auth);
    const [signInWithFacebook, facebookUser, facebookLoading, facebookError] = useSignInWithFacebook(auth);
    const [signInWithGithub, githubUser, githubLoading, githubError] = useSignInWithGithub(auth);
    // error toast
    useEffect(() => {
        if (googleError) {
            toast.error(FirebaseErrorMsg(googleError.message), { theme: "colored" })
        }
    }, [googleError])
    useEffect(() => {
        if (facebookError) {
            toast.error(FirebaseErrorMsg(facebookError.message), { theme: "colored" })
        }
    }, [facebookError])
    useEffect(() => {
        if (githubError) {
            toast.error(FirebaseErrorMsg(githubError.message), { theme: "colored" })
        }
    }, [githubError])

    // user token
    useEffect(() => {
        // navigate to target pages
        if (googleUser) {
            const email = googleUser.user.email
            // jwt token
            axios.post('/api/user/login', { email })
                .then(res => {
                    console.log(res.data.token)
                    localStorage.setItem('auth_token', res.data.token)
                    navigate(from, { replace: true });
                })
                .catch(error => console.log(error))
        }
    }, [googleUser])




    // spinner
    if (googleLoading || facebookLoading || githubLoading) {
        return (
            <section className="text-center">
                <Spinner animation="border" variant="primary" />
            </section>
        )
    }


    return (
        <div>
            <p className="text-center my-3 divider"> <span>Or</span> </p>
            <p className="text-center"> <b>Login with social media</b> </p>

            <div className="text-center social_icons">
                <button className='neomorphs_btn' onClick={() => signInWithGoogle()} >
                    <FontAwesomeIcon icon={faGoogle} />
                </button>
                <button disabled className='neomorphs_btn' onClick={() => signInWithFacebook()} >
                    <FontAwesomeIcon icon={faFacebookF} />
                </button>
                <button disabled className='neomorphs_btn' onClick={() => signInWithGithub()} >
                    <FontAwesomeIcon icon={faGithub} />
                </button>
            </div>

        </div>
    );
};

export default SocialSignIn;