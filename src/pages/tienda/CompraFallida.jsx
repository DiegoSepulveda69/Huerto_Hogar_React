import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function CompraFallida() {
    const location = useLocation();
    const navigate = useNavigate();
    const orden = location.state?.orden;

    if (!orden) {
        return (
            <Container className="my-5 text-center">
                <h3>No hay información de intento de compra 😕</h3>
                <button className="btn btn-primary mt-3" onClick={() => navigate('/')}>Volver al inicio</button>
            </Container>
        );
    }

    return (
        <Container className="my-5 d-flex justify-content-center">
            <div className="bg-white p-5 shadow rounded w-100" style={{ maxWidth: '850px' }}>
                
                <div className="mb-4 border-bottom pb-4">
                    <h3 className="text-danger fw-bold mb-2">
                        <i className="bi bi-x-circle-fill me-2"></i> 
                        No se pudo realizar el pago. nro #{orden.numeroOrden}
                    </h3>
                    <p className="text-muted mb-4">Detalle de compra</p>
                    
                    <div className="d-flex justify-content-center">
                        <button 
                            className="btn btn-success fw-bold px-5 py-2 shadow-sm" 
                            style={{ backgroundColor: '#198754', letterSpacing: '1px' }}
                            onClick={() => navigate('/checkout')} 
                        >
                            VOLVER A REALIZAR EL PAGO
                        </button>
                    </div>
                </div>

                <div className="bg-light p-4 rounded mb-4">
                    <Row className="mb-3">
                        <Col md={4}>
                            <label className="form-label text-muted small fw-bold">Nombre*</label>
                            <input type="text" className="form-control bg-secondary bg-opacity-10 border-0" value={orden.cliente.nombre} readOnly />
                        </Col>
                        <Col md={4}>
                            <label className="form-label text-muted small fw-bold">Apellidos*</label>
                            <input type="text" className="form-control bg-secondary bg-opacity-10 border-0" value={orden.cliente.apellidos} readOnly />
                        </Col>
                        <Col md={4}>
                            <label className="form-label text-muted small fw-bold">Correo*</label>
                            <input type="text" className="form-control bg-secondary bg-opacity-10 border-0" value={orden.cliente.email} readOnly />
                        </Col>
                    </Row>

                    <h5 className="fw-bold mt-4 mb-3 text-secondary">Dirección de entrega de los productos</h5>
                    <Row className="mb-3">
                        <Col md={8}>
                            <label className="form-label text-muted small fw-bold">Calle*</label>
                            <input type="text" className="form-control bg-secondary bg-opacity-10 border-0" value={orden.direccion.calle} readOnly />
                        </Col>
                        <Col md={4}>
                            <label className="form-label text-muted small fw-bold">Departamento (opcional)</label>
                            <input type="text" className="form-control bg-secondary bg-opacity-10 border-0" value={orden.direccion.dpto || ''} readOnly />
                        </Col>
                    </Row>
                    <Row className="mb-3">
                        <Col md={6}>
                            <label className="form-label text-muted small fw-bold">Región*</label>
                            <input type="text" className="form-control bg-secondary bg-opacity-10 border-0" value={orden.direccion.region} readOnly />
                        </Col>
                        <Col md={6}>
                            <label className="form-label text-muted small fw-bold">Comuna*</label>
                            <input type="text" className="form-control bg-secondary bg-opacity-10 border-0" value={orden.direccion.comuna} readOnly />
                        </Col>
                    </Row>
                    
                    <div className="mb-2">
                        <label className="form-label text-muted small fw-bold">Indicaciones para la entrega (opcional)</label>
                        <textarea className="form-control bg-secondary bg-opacity-10 border-0" rows="2" readOnly value={orden.direccion.indicaciones || 'Sin indicaciones.'}></textarea>
                    </div>
                </div>

                <div className="table-responsive mb-4">
                    <table className="table align-middle">
                        <thead className="table-light">
                            <tr>
                                <th scope="col">Imagen</th>
                                <th scope="col">Nombre</th>
                                <th scope="col">Precio</th>
                                <th scope="col">Cantidad</th>
                                <th scope="col">Subtotal</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orden.productos.map((item) => (
                                <tr key={item.producto_id}>
                                    <td>
                                        <div style={{ width: '50px', height: '50px', backgroundColor: '#eee' }} className="rounded overflow-hidden border">
                                            {item.imagenData && (
                                                <img src={`data:image/jpeg;base64,${item.imagenData}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="" />
                                            )}
                                        </div>
                                    </td>
                                    <td className="text-secondary fw-bold">{item.nombre_producto}</td>
                                    <td>${item.precio_producto}</td>
                                    <td>{item.cantidad}</td>
                                    <td className="fw-bold">${item.precio_producto * item.cantidad}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="bg-white border rounded p-3 text-center shadow-sm">
                    <h3 className="m-0 fw-bold text-dark">Total a pagar: $ {orden.total}</h3>
                </div>

            </div>
        </Container>
    );
}

export default CompraFallida;