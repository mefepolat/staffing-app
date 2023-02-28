import {Container,Nav,Navbar} from 'react-bootstrap';



const NavBar = () => {
    return (
        <Navbar className='justify-content-end' sticky='top' bg='light' expand='md'>
            <Container >
                <Navbar.Brand href='/'>SAIN Staffing AI</Navbar.Brand>
                <Navbar.Toggle aria-controls='basic-navbar-nav' />
                <Navbar.Collapse id='basic-navbar-nav'>
                    <Nav className='justify-content-center'>
                        <Nav.Item>
                            <Nav.Link href='/login'>Sign In</Nav.Link>
                            </Nav.Item>
                        <Nav.Item>
                            <Nav.Link href='/register'>Sign Up</Nav.Link>
                            </Nav.Item>
                    </Nav>
                   
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
};

export default NavBar;