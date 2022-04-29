import { signOut } from 'firebase/auth';
import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap'
import { useAuthState } from 'react-firebase-hooks/auth';
import { NavLink, Link } from 'react-router-dom';
import auth from '../../firebase.init';

import Logo from '../../images/logo/logo_light.png'

import './Header.css'

const Header = () => {

    // fire base
    const [user] = useAuthState(auth);

    const handleSignOut = event => {
        event.preventDefault()
        signOut(auth)
    }



    return (
        <Navbar bg="dark" variant='dark' expand="md">
            <Container>
                <Navbar.Brand as={Link} to="/">
                    <img className='header_logo py-3' src={Logo} alt="company logo" />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto text-capitalize">
                        <Nav.Link as={NavLink} to="/">Home</Nav.Link>
                        <Nav.Link as={NavLink} to="/blogs">blogs</Nav.Link>

                        {/* login/ logout */}
                        {
                            user ? (
                                <>
                                    <Nav.Link as={NavLink} to="/manage-items">Manage items</Nav.Link>
                                    <Nav.Link as={NavLink} to="/add-items">add Items</Nav.Link>
                                    <Nav.Link as={NavLink} to="/my-items">My Items</Nav.Link>
                                    <Nav.Link className='text-danger' onClick={handleSignOut}>Log out</Nav.Link>
                                </>
                            ) : (
                                <>
                                    <Nav.Link as={NavLink} to="/login">Log in</Nav.Link>
                                    <Nav.Link as={NavLink} to="/register">Register</Nav.Link>
                                </>
                            )
                        }

                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Header;