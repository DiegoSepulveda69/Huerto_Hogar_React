import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import '../../estilos/tienda.css';
import logoHuerto from '../../assets/logo_huerto_hogar.png'

import { Link } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';

function NavBarra() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary navbar-huerto">
      <Container fluid>
        <Navbar.Brand href="#"> 
          <img
            src={logoHuerto}
            width="30"
            height="30"
            className="d-inline-block align-top me-2"
            alt="Logo Huerto Hogar"
          /> Huerto Hogar
          </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <LinkContainer to="/"> 
              <Nav.Link>Home</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/productos"> 
              <Nav.Link>Productos</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/nosotros"> 
              <Nav.Link>Nosotros</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/blogs"> 
              <Nav.Link>Blogs</Nav.Link>
            </LinkContainer>
            <Nav.Link href="#action5">Contacto</Nav.Link>
            <NavDropdown title="Usuarios" id="navbarScrollingDropdown">
              <NavDropdown.Item href="#actionDrop1">Iniciar Sesión</NavDropdown.Item>
              <NavDropdown.Item href="#actionDrop2">
                Registrarse
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-success">Search</Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBarra;