import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';

export default function NavigationBar() {
  return (
    <Navbar bg="light" expand="sm">
      <Container>
        <Navbar.Brand as={Link} to='/'>Helsinki City Bikes</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to='/'>
              Home
            </Nav.Link>
            <Nav.Link as={Link} to='/journeys'>
              Journeys
            </Nav.Link>
            <Nav.Link as={Link} to='/stations'>
              Stations
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar >
  );
}
