import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function CompraExitosa() {
    const location = useLocation();
    // Recuperamos los datos que nos mandó Checkout
    const orden = location.state?.orden;

    if (!orden) {
        return (
            <Container className="my-5 text-center">
                <h3>No hay información de compra reciente 😕</h3>
                <Link to="/" className="btn btn-primary mt-3">Volver al inicio</Link>
            </Container>
        );
    }

    return (
        <Container className="my-5 d-flex justify-content-center">
            <div className="bg-white p-5 shadow rounded w-100" style={{ maxWidth: '850px' }}>
                
                {/* Encabezado con Código */}
                <div className="d-flex justify-content-between align-items-start mb-4">
                    <div>
                        <h2 className="text-success fw-bold">
                            <i className="bi bi-check-circle-fill me-2"></i> 
                            Se ha realizado la compra. nro #{orden.numeroOrden}
                        </h2>
                        <p className="text-muted">Completa la siguiente información</p>
                    </div>
                    <div className="text-end text-muted small">
                        Código orden: <strong>{orden.codigoOrden}</strong>
                    </div>
                </div>

                {/* Datos del Cliente (Read Only style) */}
                <div className="bg-light p-4 rounded mb-4">
                    <Row className="mb-3">
                        <Col md={4}>
                            <small className="text-muted d-block">Nombre*</small>
                            <div className="fw-bold bg-white border rounded p-2 text-muted">{orden.cliente.nombre}</div>
                        </Col>
                        <Col md={4}>
                            <small className="text-muted d-block">Apellidos*</small>
                            <div className="fw-bold bg-white border rounded p-2 text-muted">{orden.cliente.apellidos}</div>
                        </Col>
                        <Col md={4}>
                            <small className="text-muted d-block">Correo*</small>
                            <div className="fw-bold bg-white border rounded p-2 text-muted text-truncate">{orden.cliente.email}</div>
                        </Col>
                    </Row>

                    <h5 className="fw-bold mt-4 mb-3">Dirección de entrega de los productos</h5>
                    <Row className="mb-3">
                        <Col md={8}>
                            <small className="text-muted d-block">Calle*</small>
                            <div className="fw-bold bg-white border rounded p-2 text-muted">{orden.direccion.calle}</div>
                        </Col>
                        <Col md={4}>
                            <small className="text-muted d-block">Departamento (opcional)</small>
                            <div className="fw-bold bg-white border rounded p-2 text-muted">{orden.direccion.dpto || '-'}</div>
                        </Col>
                    </Row>
                    <Row className="mb-3">
                        <Col md={6}>
                            <small className="text-muted d-block">Región*</small>
                            <div className="fw-bold bg-white border rounded p-2 text-muted">{orden.direccion.region}</div>
                        </Col>
                        <Col md={6}>
                            <small className="text-muted d-block">Comuna*</small>
                            <div className="fw-bold bg-white border rounded p-2 text-muted">{orden.direccion.comuna}</div>
                        </Col>
                    </Row>
                    <div className="mb-2">
                        <small className="text-muted d-block">Indicaciones para la entrega (opcional)</small>
                        <div className="fw-bold bg-white border rounded p-2 text-muted" style={{minHeight: '50px'}}>
                            {orden.direccion.indicaciones || 'Sin indicaciones especiales.'}
                        </div>
                    </div>
                </div>

                {/* Tabla de Productos */}
                <div className="table-responsive mb-4">
                    <table className="table align-middle">
                        <thead className="table-light">
                            <tr>
                                <th>Imagen</th>
                                <th>Nombre</th>
                                <th>Precio</th>
                                <th>Cantidad</th>
                                <th>Subtotal</th>
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

                {/* Total Pagado */}
                <div className="bg-white border rounded p-3 text-center mb-4 shadow-sm">
                    <h3 className="m-0 fw-bold text-dark">Total pagado: $ {orden.total}</h3>
                </div>

                {/* Botones de Acción */}
                <div className="d-flex justify-content-center gap-3">
                    <button className="btn btn-danger fw-bold" onClick={() => window.print()}>
                        Imprimir boleta en PDF
                    </button>
                    <button className="btn btn-success fw-bold" style={{backgroundColor: '#198754'}} onClick={() => alert('Boleta enviada al correo!')}>
                        Enviar boleta por email
                    </button>
                </div>

            </div>
        </Container>
    );
}

export default CompraExitosa;