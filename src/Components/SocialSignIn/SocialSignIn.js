import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebookF, faGithub, faGoogle } from '@fortawesome/free-brands-svg-icons'
import { useSignInWithFacebook, useSignInWithGithub, useSignInWithGoogle } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import FirebaseErrorMsg from '../firebaseErrorMsg';
import { toast } from 'react-toastify';

import './SocialSignIn.css'
import { Spinner } from 'react-bootstrap';

const SocialSignIn = () => {

    // location
    const navigate = useNavigate()
    const location = useLocation()
    let from = location.state?.from?.pathname || "/";

    // google singin  
    const [signInWithGoogle, googleUser, googleLoading, googleError] = useSignInWithGoogle(auth);
    const [signInWithFacebook, facebookeUser, facebookeLoading, facebookeError] = useSignInWithFacebook(auth);
    const [signInWithGithub, githubUser, githubLoading, githubError] = useSignInWithGithub(auth);

    useEffect(() => {
        if (googleError) {
            toast.error(FirebaseErrorMsg(googleError.message), { theme: "colored" })
        }
    }, [googleError])
    useEffect(() => {
        if (facebookeError) {
            toast.error(FirebaseErrorMsg(facebookeError.message), { theme: "colored" })
        }
    }, [facebookeError])
    useEffect(() => {
        if (githubError) {
            toast.error(FirebaseErrorMsg(githubError.message), { theme: "colored" })
        }
    }, [githubError])

    // navigat to target pages
    if (googleUser || facebookeUser || githubUser) {
        navigate(from, { replace: true });
    }

    // spinner
    if (googleLoading || facebookeLoading || githubLoading) {
        return (
            <p className="text-center">
                <Spinner animation="border" variant="primary" />
            </p>
        )
    }


    return (
        <>
            <p className="text-center my-3 divider"> <span>Or</span> </p>
            <p className="text-center"> <b>Login with social media</b> </p>

            <p className="text-center social_icons">
                <button onClick={() => signInWithGoogle()} > <FontAwesomeIcon icon={faGoogle} /> </button>
                <button onClick={() => signInWithFacebook()} > <FontAwesomeIcon icon={faFacebookF} /> </button>
                <button onClick={() => signInWithGithub()} > <FontAwesomeIcon icon={faGithub} /> </button>
            </p>

        </>
    );
};

export default SocialSignIn;