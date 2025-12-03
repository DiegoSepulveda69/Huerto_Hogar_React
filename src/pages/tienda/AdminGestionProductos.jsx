import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AppContext } from '../../context/AppContextProvider';
import { useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function AdminGestionProductos() {
    const [productos, setProductos] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [productoEnEdicion, setProductoEnEdicion] = useState(null); 
    
    const { usuarioLogueado } = useContext(AppContext);
    const navigate = useNavigate();

    const fetchProductos = async () => {
        setIsLoading(true);
        setError(null);
        const token = localStorage.getItem('token');
        
        if (usuarioLogueado?.rol !== 'admin' || !token) {
             navigate('/'); 
             return;
        }

        try {
            const response = await axios.get('http://localhost:8080/api/productos', {
                headers: {
                    Authorization: `Bearer ${token}` 
                }
            });
            setProductos(response.data);
        } catch (err) {
            console.error("Error al obtener productos:", err);
            setError('Error al cargar productos. ¿El servidor está corriendo?');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchProductos();
    }, [usuarioLogueado]); 

    const handleDelete = async (id) => {
        if (!window.confirm("¿Estás seguro de que deseas eliminar este producto?")) return;

        const token = localStorage.getItem('token');
        try {
            await axios.delete(`http://localhost:8080/api/productos/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            fetchProductos(); 
        } catch (err) {
            console.error("Error al eliminar:", err);
            setError('Error al eliminar. Verifica si tienes permisos de Administrador.');
        }
    };

    const renderEdicionForm = () => {
        if (!productoEnEdicion) return null;

        const handleSave = async (e) => {
            e.preventDefault();
            const token = localStorage.getItem('token');
            
            try {
               
                await axios.put(`http://localhost:8080/api/productos/${productoEnEdicion.producto_id}`, {
                    ...productoEnEdicion,
                    precio_producto: parseInt(productoEnEdicion.precio_producto),
                    stock_producto: parseInt(productoEnEdicion.stock_producto)
                }, {
                    headers: { Authorization: `Bearer ${token}` }
                });

                setProductoEnEdicion(null);
                fetchProductos(); 

            } catch (err) {
                console.error("Error al editar:", err);
                setError('Error al guardar cambios. Verifica si el backend soporta PUT.');
            }
        };

        return (
            <div className="bg-warning bg-opacity-25 p-4 my-4 rounded shadow-sm">
                <h4>Editando: {productoEnEdicion.nombre_producto}</h4>
                <Form onSubmit={handleSave}>
                    <Row>
                        <Col md={6}><Form.Group className="mb-3"><Form.Label>Nombre</Form.Label><Form.Control type="text" value={productoEnEdicion.nombre_producto} onChange={e => setProductoEnEdicion({...productoEnEdicion, nombre_producto: e.target.value})} /></Form.Group></Col>
                        <Col md={6}><Form.Group className="mb-3"><Form.Label>Precio</Form.Label><Form.Control type="number" value={productoEnEdicion.precio_producto} onChange={e => setProductoEnEdicion({...productoEnEdicion, precio_producto: e.target.value})} /></Form.Group></Col>
                    </Row>
                    <Form.Group className="mb-3"><Form.Label>Descripción</Form.Label><Form.Control as="textarea" rows={2} value={productoEnEdicion.descripcion_producto} onChange={e => setProductoEnEdicion({...productoEnEdicion, descripcion_producto: e.target.value})} /></Form.Group>
                    <div className="d-flex justify-content-end gap-2">
                        <Button variant="secondary" onClick={() => setProductoEnEdicion(null)}>Cancelar</Button>
                        <Button variant="primary" type="submit">Guardar Cambios</Button>
                    </div>
                </Form>
            </div>
        );
    };


    if (isLoading) return <div className="admin-content p-4">Cargando productos...</div>;
    if (error) return <div className="admin-content p-4"><div className="alert alert-danger">{error}</div></div>;

    return (
        <div className="admin-content p-4">
            <Container fluid>
                <header className="admin-header mb-4">
                    <h2>Gestión de Productos</h2>
                    <p className="text-muted">Edita, elimina y revisa el inventario de la tienda.</p>
                </header>

                {renderEdicionForm()}

                <div className="table-responsive">
                    <Table striped bordered hover size="sm">
                        <thead className="table-dark">
                            <tr>
                                <th>#ID</th>
                                <th>Nombre</th>
                                <th>Descripción</th>
                                <th>Precio</th>
                                <th>Stock</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {productos.map(prod => (
                                <tr key={prod.producto_id}>
                                    <td>{prod.producto_id}</td>
                                    <td>{prod.nombre_producto}</td>
                                    <td>{prod.descripcion_producto}</td>
                                    <td>${prod.precio_producto}</td>
                                    <td>{prod.stock_producto}</td>
                                    <td className='d-flex gap-2'>
                                        <Button 
                                            variant="warning" 
                                            size="sm" 
                                            onClick={() => setProductoEnEdicion(prod)}
                                        >
                                            Editar
                                        </Button>
                                        <Button 
                                            variant="danger" 
                                            size="sm" 
                                            onClick={() => handleDelete(prod.producto_id)}
                                        >
                                            Eliminar
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
                {productos.length === 0 && <div className="alert alert-info mt-3">No hay productos en el inventario.</div>}
            </Container>
        </div>
    );
}

export default AdminGestionProductos;