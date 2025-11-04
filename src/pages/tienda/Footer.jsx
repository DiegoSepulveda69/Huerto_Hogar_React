import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import '../../estilos/tienda.css';

function Footer() {

  return (
    <footer className="footer-huerto">
      <Container>
        <Row className="text-center text-md-start">
          
          <Col md={4} className="mb-3 mb-md-0">
            <h5>Huerto Hogar</h5>
            <p>
              Llevando los productos más frescos de la temporada
              a la puerta de tu cassa
            </p>
          </Col>

          <Col md={4} className="mb-3 mb-md-0">
            <h5>Enlaces Rápidos</h5>
            <ul className="list-unstyled">
              <li><a href="#home" className="text-white text-decoration-none">Inicio</a></li>
              <li><a href="#about" className="text-white text-decoration-none">Sobre Nosotros</a></li>
              <li><a href="#products" className="text-white text-decoration-none">Productos</a></li>
              <li><a href="#contact" className="text-white text-decoration-none">Contacto</a></li>
            </ul>
          </Col>

          <Col md={4}>
            <h5>Contacto</h5>
            <ul className="list-unstyled">
              <li><i className="bi bi-geo-alt-fill me-2"></i> Dirección de la Tienda</li>
              <li><i className="bi bi-envelope-fill me-2"></i> info@huertohogar.com</li>
              <li><i className="bi bi-telephone-fill me-2"></i> +56 9 1234 5678</li>
            </ul>
          </Col>
        </Row>
        
        <Row className="mt-4 pt-3 border-top border-light opacity-75">
          <Col className="text-center">
            <p className="mb-0">&copy; {new Date().getFullYear()} Huerto Hogar. Todos los derechos reservados.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;