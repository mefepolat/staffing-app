import { Container, Nav, Navbar } from "react-bootstrap";
import { useContext } from "react";
import { UserContext } from "./UserContext";
import SignOutButton from "./SignOutButton";

const NavBar = () => {
  const { user } = useContext(UserContext);
 
  return (
    <Navbar className="justify-content-end" sticky="top" bg="light" expand="md">
      <Container>
        <Navbar.Brand href="/">SAIN Staffing AI</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="justify-content-center">
            {user ? (
                <>
                {user.user.employer && (
                  <Nav.Item>
                    <Nav.Link href="/admin">Manage</Nav.Link>
                  </Nav.Item>
                )}
                <Nav.Item>
                  <SignOutButton />
                </Nav.Item>
              </>
            ) : (
              <>
                <Nav.Item>
                  <Nav.Link href="/login">Sign In</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link href="/register">Sign Up</Nav.Link>
                </Nav.Item>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
