import { useEffect, useRef, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';

export default function NavigationBar() {
  const [expanded, setExpanded] = useState(false);
  const navbarRef = useRef<HTMLDivElement>(null);

  // Close navbar when clicking outside of it
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        navbarRef.current &&
        !navbarRef.current.contains(event.target as Node)
      ) {
        setExpanded(false);
      }
    };
    document.addEventListener('click', handleOutsideClick);

    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, []);

  return (
    <Navbar bg="light" expand="sm" expanded={expanded} ref={navbarRef}>
      <Container>
        <Navbar.Brand as={Link} to="/">
          Helsinki City Bikes
        </Navbar.Brand>
        <Navbar.Toggle
          aria-controls="basic-navbar-nav"
          onClick={() => setExpanded(!expanded)}
        />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto" onClick={() => setExpanded(false)}>
            <Nav.Link as={Link} to="/">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/journeys">
              Journeys
            </Nav.Link>
            <Nav.Link as={Link} to="/stations">
              Stations
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
