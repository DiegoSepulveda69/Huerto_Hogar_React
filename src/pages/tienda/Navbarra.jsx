import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { AppContext } from '../../context/AppContextProvider';

// Si tienes tu logo en la carpeta assets, importalo así:
// import logo from '../../assets/logo.png'; 

function NavBarra() {
  const { usuarioLogueado, setUsuarioLogueado, carrito } = useContext(AppContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    setUsuarioLogueado(null);
    navigate('/');
  };

  const totalItems = carrito.reduce((acc, item) => acc + item.cantidad, 0);

  return (
    <Navbar expand="lg" className="navbar-huerto shadow-sm sticky-top" variant="dark">
      <Container fluid>
        {/* LOGO: Ajustado para ser un poco más grande (45px) */}
        <Navbar.Brand as={Link} to="/" className="fw-bold d-flex align-items-center gap-2">
            <img 
              src="src/assets/logo_huerto_hogar.png" // Asegúrate que esta ruta sea correcta en tu proyecto
              alt="Logo"
              width="45" 
              height="45"
              className="d-inline-block align-top"
              onError={(e) => { e.target.style.display = 'none'; }} 
            />
            Huerto Hogar
        </Navbar.Brand>
        
        <Navbar.Toggle aria-controls="navbarScroll" />
        
        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto my-2 my-lg-0" navbarScroll>
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/categorias">Categorías</Nav.Link>
            <Nav.Link as={Link} to="/productos">Productos</Nav.Link>
            <Nav.Link as={Link} to="/nosotros">Nosotros</Nav.Link>
            <Nav.Link as={Link} to="/blogs">Blog</Nav.Link>
            <Nav.Link as={Link} to="/contactos">Contacto</Nav.Link>
          </Nav>

          <Form className="d-flex me-3">
            <Form.Control
              type="search"
              placeholder="Buscar..."
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-light">Buscar</Button>
          </Form>

          <Nav className="align-items-center gap-2">
            
            <Button 
                variant="light" 
                className="position-relative me-2 border-0 d-flex align-items-center gap-2"
                onClick={() => navigate('/productos')} 
                style={{color: '#2E8B57', fontWeight: 'bold'}}
            >
                🛒 <span className="d-none d-xl-inline">Carrito</span>
                {totalItems > 0 && (
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                        {totalItems}
                    </span>
                )}
            </Button>

            {usuarioLogueado ? (
                <NavDropdown 
                    title={<span className="fw-bold text-white">👤 {usuarioLogueado.nombre.split(' ')[0]}</span>} 
                    id="navbarScrollingDropdown" 
                    align="end"
                >
                    {usuarioLogueado.rol === 'admin' && (
                        <NavDropdown.Item as={Link} to="/administrador">⚡ Panel Admin</NavDropdown.Item>
                    )}
                    <NavDropdown.Item href="#">Mi Perfil</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item onClick={handleLogout} className="text-danger fw-bold">
                        Cerrar Sesión
                    </NavDropdown.Item>
                </NavDropdown>
            ) : (
                /* --- BOTONES PERSONALIZADOS --- */
                <div className="d-flex gap-2">
                    {/* Iniciar Sesión: Sin efecto hover de relleno, borde blanco fijo */}
                    <Link 
                        to="/inicio_sesion" 
                        className="btn fw-bold px-3"
                        style={{ 
                            border: '1px solid white', 
                            color: 'white',
                            textDecoration: 'none'
                        }}
                    >
                        Iniciar Sesión
                    </Link>
                    
                    {/* Crear Cuenta: Botón blanco con letra verde */}
                    <Link 
                        to="/registro" 
                        className="btn btn-light fw-bold px-3" 
                        style={{ 
                            backgroundColor: '#126824ff', // Fondo blanco
                            border: 'none'
                        }} 
                    >
                        Crear Cuenta
                    </Link>
                </div>
            )}
          </Nav>

        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBarra;