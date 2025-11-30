import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { AppContext } from '../../context/AppContextProvider'; 
import { useNavigate } from 'react-router-dom'; 

function Productos() {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const { carrito, agregarACarrito, eliminarDelCarrito, actualizarCantidad, vaciarCarrito, totalCarrito } = useContext(AppContext);
  
  const navigate = useNavigate();

  useEffect(() => {
    const cargarProductos = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/productos');
        setProductos(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error:", err);
        setError("Error al cargar productos. Revisa que tu backend esté encendido.");
        setLoading(false);
      }
    };
    cargarProductos();
  }, []);

  if (loading) return <div className="text-center mt-5 text-success"><h3>Cargando tu huerto... 🌱</h3></div>;
  if (error) return <div className="text-center mt-5 text-danger"><h3>{error}</h3></div>;

  return (
    <Container fluid className="my-5 px-4">
      <div className="alert alert-primary mb-4 text-center border-0 shadow-sm" style={{ backgroundColor: '#e3f2fd', color: '#0d47a1' }}>
        <strong>¡Arma tu pedido!</strong> Agrega productos a tu cesta y finaliza la compra cuando estés listo.
      </div>

      <Row>
        <Col lg={7}>
          <h3 className="mb-4 fw-bold text-secondary">Nuestros Productos</h3>
          <Row>
            {productos.map(prod => (
              <Col md={4} sm={6} key={prod.producto_id} className="mb-4">
                <div className="card h-100 border-0 shadow-sm" style={{ backgroundColor: '#f8f9fa' }}>
                  
                  <div className="ratio ratio-4x3 bg-white d-flex align-items-center justify-content-center overflow-hidden rounded-top">
                    {prod.imagenData ? (
                      <img 
                        src={`data:image/jpeg;base64,${prod.imagenData}`} 
                        alt={prod.nombre_producto} 
                        style={{ objectFit: 'cover', width: '100%', height: '100%' }} 
                      />
                    ) : (
                      <span className="text-muted small">Sin imagen</span>
                    )}
                  </div>

                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title fw-bold text-dark mb-1">{prod.nombre_producto}</h5>
                    <p className="text-muted small mb-2 text-truncate">{prod.descripcion_producto || 'Categoría'}</p>
                    
                    <h4 className="text-warning fw-bold mb-3">${prod.precio_producto}</h4>
                    
                    <button 
                        className="btn btn-dark mt-auto w-100 py-2 shadow-sm" 
                        onClick={() => agregarACarrito(prod)}
                    >
                      Añadir
                    </button>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        </Col>

        <Col lg={5}>
          <h3 className="mb-4 fw-bold text-secondary">Carrito de Compras</h3>
          
          {carrito.length === 0 ? (
            <div className="alert alert-light text-center border py-5">
                <h4>🛒</h4>
                <p>Tu carrito está vacío.</p>
            </div>
          ) : (
            <div className="bg-white p-3 shadow-sm rounded sticky-top" style={{ top: '20px' }}>
              
              <div className="table-responsive" style={{ maxHeight: '400px', overflowY: 'auto' }}>
                <table className="table align-middle">
                  <thead className="table-light sticky-top" style={{ top: 0 }}>
                    <tr className="text-muted small">
                      <th>Producto</th>
                      <th>Precio</th>
                      <th>Cant.</th>
                      <th>Total</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {carrito.map(item => (
                      <tr key={item.producto_id}>
                        <td className="small fw-bold">
                            <div className="d-flex align-items-center gap-2">
                                <div style={{ width: '40px', height: '40px', backgroundColor: '#eee', borderRadius: '4px', overflow: 'hidden' }}>
                                    {item.imagenData && (
                                        <img src={`data:image/jpeg;base64,${item.imagenData}`} width="100%" height="100%" style={{objectFit:'cover'}} alt=""/>
                                    )}
                                </div>
                                <span className="d-inline-block text-truncate" style={{ maxWidth: '120px' }}>
                                    {item.nombre_producto}
                                </span>
                            </div>
                        </td>
                        <td className="small text-muted">${item.precio_producto}</td>
                        <td>
                          <div className="d-flex align-items-center border rounded" style={{ width: 'fit-content' }}>
                            <button 
                                className="btn btn-sm btn-light px-2 py-0 border-end" 
                                onClick={() => actualizarCantidad(item.producto_id, item.cantidad - 1)}
                            >-</button>
                            <span className="px-2 small fw-bold">{item.cantidad}</span>
                            <button 
                                className="btn btn-sm btn-light px-2 py-0 border-start" 
                                onClick={() => actualizarCantidad(item.producto_id, item.cantidad + 1)}
                            >+</button>
                          </div>
                        </td>
                        <td className="small fw-bold text-success">${item.precio_producto * item.cantidad}</td>
                        <td>
                          <button 
                            className="btn btn-outline-danger btn-sm py-0 px-2 border-0" 
                            onClick={() => eliminarDelCarrito(item.producto_id)}
                            title="Eliminar"
                          >
                            ✕
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="d-flex justify-content-between align-items-center mt-3 border-top pt-3">
                <span className="text-muted small">{carrito.reduce((acc, item) => acc + item.cantidad, 0)} productos</span>
                <div className="d-flex align-items-center">
                    <h5 className="fw-bold mb-0 me-2 text-secondary">Total:</h5>
                    <h4 className="fw-bold mb-0 text-success">${totalCarrito}</h4>
                </div>
              </div>

              <div className="d-grid gap-2 mt-4">
                <button 
                    className="btn btn-success fw-bold py-2 shadow-sm" 
                    style={{ backgroundColor: '#198754' }}
                    onClick={() => navigate('/checkout')}
                >
                  Ir a Pagar
                </button>
                <button 
                    className="btn btn-link text-muted text-decoration-none small" 
                    onClick={vaciarCarrito}
                >
                  Vaciar carrito
                </button>
              </div>
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default Productos;