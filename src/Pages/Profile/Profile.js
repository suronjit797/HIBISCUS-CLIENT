import React, { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import FirebaseErrorMsg from '../../Components/firebaseErrorMsg';
import { Spinner } from 'react-bootstrap';

import './Profile.css'
import { toast } from 'react-toastify';

const Profile = () => {

    const [user, loading, error] = useAuthState(auth)

    // for error message
    useEffect(() => {
        if (error) {
            toast.error(FirebaseErrorMsg(error.message), { theme: "colored" })
        }
    }, [error])

    // loading spinner
    if (loading) {
        return (
            <section className="centerSpinner">
                <Spinner animation="border" variant="primary" />
            </section>
        )
    }

    console.log(user)

    return (
        <div className='container my-4'>
            <div className="profile">
                <p> <strong> Name:  </strong> {user.displayName} </p>
                <p> <strong> Email:  </strong> {user.email} </p>
                <p> <strong> Phone Number:  </strong> {user.phoneNumber ? user.phoneNumber : 'No phone number found'} </p>
                <p> <strong> Verified:  </strong> {
                    user.emailVerified ? (
                        <span className="text-success border border-2 border-success d-inline-block px-2 rounded py-1"> Verified </span>
                    ) : (
                        <span className="text-danger border border-2 border-danger d-inline-block px-2 rounded py-1"> Not Verified </span>
                    )
                } </p>
            </div>
        </div>
    );
};

export default Profile;