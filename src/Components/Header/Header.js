import { signOut } from 'firebase/auth';
import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap'
import { useAuthState } from 'react-firebase-hooks/auth';
import { NavLink, Link } from 'react-router-dom';
import auth from '../../firebase.init';

const Header = () => {

    // fire base
    const [user, loading, error] = useAuthState(auth);

    const handleSignOut = event =>{
        event.preventDefault()
        signOut(auth)
    }

    
    return (
        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand as={Link} to="/">React-Bootstrap</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        <Nav.Link as={NavLink} to="/">Home</Nav.Link>
                        {
                            user ? (
                                <Nav.Link onClick={handleSignOut}>Log out</Nav.Link>
                            ) : (
                                <Nav.Link as={NavLink} to="/login">Log in</Nav.Link>
                            )
                        }
                        <Nav.Link as={NavLink} to="/register">Register</Nav.Link>

                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Header;