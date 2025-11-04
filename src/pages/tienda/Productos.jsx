import React, { useState } from 'react';
import { productos as dbProductos } from '../../../public/js/productos';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function ProductosPage() {
  const [productos, setProductos] = useState(dbProductos); 
  
  const [carrito, setCarrito] = useState([]); 

  const agregarACarrito = (producto) => {
    setCarrito((currentCarrito) => {
      const itemExistente = currentCarrito.find(item => item.id === producto.id);
      
      if (itemExistente) {
        return currentCarrito.map(item =>
          item.id === producto.id
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        );
      } else {
        return [...currentCarrito, { ...producto, cantidad: 1 }];
      }
    });
  };

  return (
    <Container className="my-5">
      <h2 className="text-center mb-4">Nuestros Productos 🌿</h2>
      <Row>
        <Col md={8}>
          <Row>
            {productos.map(producto => (
              <Col md={4} key={producto.id} className="mb-4">
                <div className="border p-3 text-center">
                  <h5>{producto.nombre}</h5>
                  <p>${producto.precio}</p>
                  <button 
                    className="btn btn-primary"
                    onClick={() => agregarACarrito(producto)}>
                    Añadir al Carrito
                  </button>
                </div>
              </Col>
            ))}
          </Row>
        </Col>
        <Col md={4}>
          <div className="p-3 border bg-light sticky-top">
            <h4> Carrito ({carrito.length})</h4>
            {carrito.map(item => (
              <div key={item.id} className="d-flex justify-content-between my-2 border-bottom">
                <span>{item.nombre} (x{item.cantidad})</span>
                <span>${item.precio * item.cantidad}</span>
              </div>
            ))}
          </div>
          
        </Col>
      </Row>
    </Container>
  );
}

export default ProductosPage;