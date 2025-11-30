import React, { useState } from 'react';
import axios from 'axios';
import Container from 'react-bootstrap/Container';

function AdminProductos() {
    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [precio, setPrecio] = useState('');
    const [stock, setStock] = useState('');
    const [imagen, setImagen] = useState(null);
    const [mensaje, setMensaje] = useState('');
    const [tipoMensaje, setTipoMensaje] = useState(''); 

    const handleFileChange = (e) => {
        setImagen(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('nombre_producto', nombre);
        formData.append('descripcion_producto', descripcion);
        formData.append('precio_producto', precio);
        formData.append('stock_producto', stock);
        formData.append('imagen_producto', imagen);

        try {
            await axios.post('http://localhost:8080/api/productos', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data' 
                }
            });

+            setMensaje('¡Producto subido exitosamente! 🌱');
            setTipoMensaje('success');
            
            setNombre('');
            setDescripcion('');
            setPrecio('');
            setStock('');
            setImagen(null);
            document.getElementById('fileInput').value = ""; 
            
        } catch (error) {
            console.error("Error al subir:", error);
            setMensaje('Hubo un error al subir el producto. Revisa que el servidor esté encendido.');
            setTipoMensaje('danger');
        }
    };

    return (
        <Container className="my-5">
            <div className="formulario p-4 shadow rounded bg-white mx-auto" style={{ maxWidth: '600px' }}>
                <h2 className="text-center text-success mb-4" style={{ fontWeight: 'bold', color: '#2e7d32' }}>
                    Subir Nuevo Producto 🍎
                </h2>
                
                {mensaje && <div className={`alert alert-${tipoMensaje} text-center`}>{mensaje}</div>}

                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label fw-bold">Nombre del Producto</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            placeholder="Ej: Manzanas Fuji"
                            value={nombre} 
                            onChange={e => setNombre(e.target.value)} 
                            required 
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label fw-bold">Descripción</label>
                        <textarea 
                            className="form-control" 
                            rows="2"
                            placeholder="Ej: Frescas y crujientes, venta por kilo"
                            value={descripcion} 
                            onChange={e => setDescripcion(e.target.value)} 
                            required 
                        />
                    </div>

                    <div className="row">
                        <div className="col-md-6 mb-3">
                            <label className="form-label fw-bold">Precio ($)</label>
                            <input 
                                type="number" 
                                className="form-control" 
                                placeholder="1200"
                                value={precio} 
                                onChange={e => setPrecio(e.target.value)} 
                                required 
                            />
                        </div>
                        <div className="col-md-6 mb-3">
                            <label className="form-label fw-bold">Stock (Unidades)</label>
                            <input 
                                type="number" 
                                className="form-control" 
                                placeholder="50"
                                value={stock} 
                                onChange={e => setStock(e.target.value)} 
                                required 
                            />
                        </div>
                    </div>

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
                    >
                        Subir Producto
                    </button>
                </form>
            </div>
        </Container>
    );
}

export default AdminProductos;