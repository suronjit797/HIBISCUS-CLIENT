import React, { useEffect } from 'react';
import { Spinner } from 'react-bootstrap';
import { useAuthState } from 'react-firebase-hooks/auth';
import { toast } from 'react-toastify';
import FirebaseErrorMsg from '../../Components/firebaseErrorMsg';
import auth from '../../firebase.init';
import HomeBanner from './HomeBanner';


const Home = () => {
    const [user, loading, error] = useAuthState(auth);



    // error toast
    useEffect(() => {
        if (error) {
            toast.error(FirebaseErrorMsg(error.message), { theme: "colored" })
        }
    }, [error])

    if (loading) {
        return (
            <section className="centerSpinner">
                <Spinner animation="border" variant="primary" />
            </section>
        )
    }

    console.log(user);


    return (
        <section className='home'>
            <HomeBanner />
        </section>
    );
};

export default Home;