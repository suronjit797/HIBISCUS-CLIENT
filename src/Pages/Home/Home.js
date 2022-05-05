import React, { useEffect, useState } from 'react';
import { Row, Spinner } from 'react-bootstrap';
import { useAuthState } from 'react-firebase-hooks/auth';
import { toast } from 'react-toastify';
import FirebaseErrorMsg from '../../Components/firebaseErrorMsg';
import InventoryCard from '../../Components/InventoryCard/InventoryCard';
import auth from '../../firebase.init';
import HomeBanner from './HomeBanner';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import HomeSummary from './HomeSummary';


const Home = () => {
    const navigate = useNavigate()

    const [user, loading, error] = useAuthState(auth);
    const [inventories, setInventories] = useState([])

    useEffect(() => {
        axios.get('/api/inventory?limits=6')
            .then(res => setInventories(res.data))
            .catch(error => console.dir(error))
    }, [user])

    useEffect(() => {
        document.title = 'Home - HIBISCUS'
    }, [])




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



    return (
        <section className='home'>
            <HomeBanner />

            <div className="container">

                {/* Inventory summary */}

                <HomeSummary />



                {/* inventory section */}
                <h2 className="text-center fw-bold mt-5 mb-4"> Inventory Items </h2>
                <div className="pmt-4 mb-5">
                    <Row xs={1} md={2} lg={3} className="g-4">
                        {
                            inventories.map(inventory => <InventoryCard key={inventory._id} inventory={inventory} />)
                        }
                    </Row>
                    <div className="text-center mt-4">
                        <button className="btn neomorphs_btn text-capitalize px-5" onClick={() => navigate('/inventory')}> <b> Go to inventory page </b> </button>
                    </div>
                </div>

                {/* add 2 more section......... */}


            </div>



        </section>
    );
};

export default Home;