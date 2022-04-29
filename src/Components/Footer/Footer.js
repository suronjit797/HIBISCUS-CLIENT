import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebookF, faGithub, faGoogle, faLinkedinIn } from '@fortawesome/free-brands-svg-icons'
import { signOut } from 'firebase/auth';
import auth from '../../firebase.init';

import './Footer.css'

import visa from '../../images/cms/visa.jpg'
import americanExpress from '../../images/cms/americanExpress.jpg'
import discover from '../../images/cms/discover.jpg'
import masterCard from '../../images/cms/masterCard.jpg'
import { useAuthState } from 'react-firebase-hooks/auth';



const Footer = () => {

    const [user] = useAuthState(auth);

    const handleSignOut = event => {
        event.preventDefault()
        signOut(auth)
    }

    const handleFooterForm = event => {
        event.preventDefault()

    }




    return (
        <footer className='mt-auto bg-dark' >
            <div className="container">
                <div className="row py-5 text-center text-lg-start">
                    <div className="col-sm-6 col-lg-3">
                        <div className="footer_items">
                            <h5 className="fw-bold mt-5 mt-sm-0  mb-4"> Account </h5>
                            <Link to='/my-items'> My items </Link>
                            <Link to='/profile/:id'> Personal Information </Link>
                            {
                                user && <Link className='text-danger' to='/' onClick={handleSignOut}>Log out</Link>
                            }

                        </div>
                    </div>
                    <div className="col-sm-6 col-lg-3">
                        <div className="footer_items">
                            <h5 className="fw-bold mt-5 mt-sm-0  mb-4"> Our company </h5>
                            <Link to='/delivery'> delivery </Link>
                            <Link to='/notice'> Legal Notice </Link>
                            <Link to='/about'> About us </Link>
                            <Link to='/contact'> Contact us </Link>
                        </div>
                    </div>
                    <div className="col-sm-6 col-lg-3">
                        <div className="footer_items">
                            <h5 className="fw-bold mt-5 mt-lg-0 mb-4"> Contact Us </h5>
                            <a href="tel:+8801XXXXXXXXX"> 01XXXXXXXXX </a>
                            <a className='text-lowercase' href="mailto:suronjit797@gmail.com"> suronjit797@gmail.com </a>
                        </div>
                    </div>
                    <div className="col-sm-6 col-lg-3">
                        <div className="footer_items">
                            <h5 className="fw-bold mt-5 mt-lg-0 mb-4"> NEWSLETTER </h5>
                            <small>You may unsubscribe at any moment for any purpose.</small>
                            <form className='footer-form'>
                                <input
                                    type="email"
                                    name="footer_email"
                                    id="footer_email"
                                    placeholder='Your email address'
                                    autoComplete='off'
                                />
                                <button type="submit" className='btn primary_btn py-1 mt-3' onClick={handleFooterForm} >
                                    <span>SUBSCRIBE</span>
                                </button>
                            </form>
                        </div>
                    </div>
                </div>

                <hr />
                <div className="row align-items-center mt-3 mb-4">
                    <div className="col-md-3 my-2 text-center text-md-start">
                        <div className="social">
                            <a className='facebook' href='https://www.facebook.com/'>
                                <FontAwesomeIcon icon={faFacebookF} />
                            </a>
                            <a className='github' href='/'>
                                <FontAwesomeIcon icon={faGithub} />
                            </a>
                            <a className='google' href='/'>
                                <FontAwesomeIcon icon={faGoogle} />
                            </a>
                            <a className='linkedin' href='/'>
                                <FontAwesomeIcon icon={faLinkedinIn} />
                            </a>
                        </div>
                    </div>
                    <div className="col-md-6 my-2 text-center">
                        <p className='m-0'>© 2022 - Inventory Website by Suronjit Pal</p>
                    </div>
                    <div className="col-md-3 my-2 text-center text-md-end">
                        <div className="cms">
                            <Link to='/' > <img src={visa} alt="" /> </Link>
                            <Link to='/' > <img src={americanExpress} alt="" /> </Link>
                            <Link to='/' > <img src={discover} alt="" /> </Link>
                            <Link to='/' > <img src={masterCard} alt="" /> </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;