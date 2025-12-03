import React, { useState, useContext } from 'react';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { AppContext } from '../../context/AppContextProvider';
import { useNavigate, useLocation } from 'react-router-dom'; 

function AdminProductos() {
    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [precio, setPrecio] = useState('');
    const [stock, setStock] = useState('');
    const [imagen, setImagen] = useState(null); 
    
    const [mensaje, setMensaje] = useState('');
    const [tipoMensaje, setTipoMensaje] = useState(''); 
    const [isLoading, setIsLoading] = useState(false);
    
    const { usuarioLogueado } = useContext(AppContext);
    const navigate = useNavigate();

    const handleFileChange = (e) => {
        setImagen(e.target.files[0]); 
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setMensaje(''); 

        const formData = new FormData();
        
        formData.append('nombre_producto', nombre);
        formData.append('descripcion_producto', descripcion);
        formData.append('precio_producto', precio);
        formData.append('stock_producto', stock);
        
        if (imagen) {
            formData.append('imagen_producto', imagen); 
        } else {
             setMensaje('La imagen es obligatoria para crear un nuevo producto.');
             setTipoMensaje('danger');
             setIsLoading(false);
             return;
        }
        
        const token = localStorage.getItem('token');

        try {
            
            await axios.post('http://localhost:8080/api/productos', formData, {
                 headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}` 
                }
            });

        
            setMensaje('¡Producto subido exitosamente! 🌱');
            setTipoMensaje('success');
            
            setNombre('');
            setDescripcion('');
            setPrecio('');
            setStock('');
            setImagen(null);
            document.getElementById('fileInput').value = ""; 
            
        } catch (error) {
            console.error("Error al subir producto:", error);
            let msg = 'Hubo un error al subir el producto. ';
            if (error.response && error.response.status === 403) {
                 msg = 'Acceso denegado. Debes iniciar sesión como Administrador.';
            } else if (error.code === 'ERR_NETWORK') {
                 msg = 'No se pudo conectar con el servidor. ¿Spring Boot está encendido?';
            }
            
            setMensaje(msg);
            setTipoMensaje('danger');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Container className="my-5">
            <div className="formulario p-4 shadow rounded bg-white mx-auto" style={{ maxWidth: '600px' }}>
                <h2 className="text-center text-success mb-4 fw-bold" style={{ color: '#2e7d32' }}>
                    Subir Nuevo Producto 🍎
                </h2>
                
                {mensaje && <div className={`alert alert-${tipoMensaje} text-center`}>{mensaje}</div>}

                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label fw-bold">Nombre del Producto</label>
                        <input type="text" className="form-control" placeholder="Ej: Manzanas Fuji" value={nombre} onChange={e => setNombre(e.target.value)} required />
                    </div>

                    <div className="mb-3">
                        <label className="form-label fw-bold">Descripción</label>
                        <textarea className="form-control" rows="2" placeholder="Ej: Frescas y crujientes, venta por kilo" value={descripcion} onChange={e => setDescripcion(e.target.value)} required />
                    </div>

                    <Row>
                        <Col md={6} className="mb-3">
                            <label className="form-label fw-bold">Precio ($)</label>
                            <input type="number" className="form-control" placeholder="1200" value={precio} onChange={e => setPrecio(e.target.value)} required />
                        </Col>
                        <Col md={6} className="mb-3">
                            <label className="form-label fw-bold">Stock (Unidades)</label>
                            <input type="number" className="form-control" placeholder="50" value={stock} onChange={e => setStock(e.target.value)} required />
                        </Col>
                    </Row>

                    <div className="mb-4">
                        <label className="form-label fw-bold">Imagen del Producto</label>
                        <input 
                            id="fileInput"
                            type="file" 
                            className="form-control" 
                            accept="image/*" 
                            onChange={handleFileChange} 
                            required 
                        />
                        <div className="form-text">Formatos permitidos: JPG, PNG.</div>
                    </div>

                    <button 
                        type="submit" 
                        className="btn btn-success w-100 py-2 fw-bold"
                        style={{ backgroundColor: '#2e7d32', border: 'none' }}
                        disabled={isLoading}
                    >
                        {isLoading ? 'Subiendo...' : 'Subir Producto'}
                    </button>
                </form>
                
                <button 
                    type="button" 
                    className="btn btn-outline-secondary w-100 py-2 fw-bold mt-3"
                    onClick={() => navigate('/admin/productos/gestionar')}
                >
                    Ir a Gestión (Editar/Eliminar)
                </button>

            </div>
        </Container>
    );
}

export default AdminProductos;