import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AppContext } from '../../context/AppContextProvider';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

// 1. Definimos las categorías estáticas (Simulación)
const CATEGORIAS_LISTA = [
    { id: 'todos', nombre: 'Todas', icono: '🌟' },
    { id: 'frutas', nombre: 'Frutas', icono: '🍎' },
    { id: 'verduras', nombre: 'Verduras', icono: '🥦' },
    { id: 'herramientas', nombre: 'Herramientas', icono: '🛠️' },
    { id: 'semillas', nombre: 'Semillas', icono: '🌱' },
];

function Categorias() {
    const [productos, setProductos] = useState([]);
    const [filtro, setFiltro] = useState('todos'); // Categoría seleccionada
    const [busqueda, setBusqueda] = useState(''); // Barra de búsqueda
    const [loading, setLoading] = useState(true);
    
    const { agregarACarrito } = useContext(AppContext);

    // 2. Cargar productos del Backend
    useEffect(() => {
        const fetchProductos = async () => {
            try {
                const res = await axios.get('http://localhost:8080/api/productos/all');
                setProductos(res.data);
            } catch (error) {
                console.error("Error cargando productos", error);
            } finally {
                setLoading(false);
            }
        };
        fetchProductos();
    }, []);

    // 3. Lógica de Filtrado Avanzado
    const productosFiltrados = productos.filter(prod => {
        const nombre = prod.nombre_producto.toLowerCase();
        const desc = prod.descripcion_producto ? prod.descripcion_producto.toLowerCase() : '';
        
        // Filtro por Categoría (Simulado buscando palabras clave)
        const coincideCategoria = 
            filtro === 'todos' ? true :
            filtro === 'frutas' ? (nombre.includes('manzana') || nombre.includes('naranja') || nombre.includes('fruta') || nombre.includes('platano')) :
            filtro === 'verduras' ? (nombre.includes('lechuga') || nombre.includes('zanahoria') || nombre.includes('tomate') || nombre.includes('verdura')) :
            filtro === 'herramientas' ? (nombre.includes('pala') || nombre.includes('tijera') || nombre.includes('guante')) :
            filtro === 'semillas' ? (nombre.includes('semilla')) : true;

        // Filtro por Barra de Búsqueda
        const coincideBusqueda = nombre.includes(busqueda.toLowerCase());

        return coincideCategoria && coincideBusqueda;
    });

    return (
        <Container className="my-5">
            {/* BARRA DE BÚSQUEDA */}
            <div className="d-flex justify-content-center mb-5">
                <div className="d-flex w-50">
                    <input 
                        type="text" 
                        className="form-control me-2" 
                        placeholder="Buscar producto..." 
                        value={busqueda}
                        onChange={(e) => setBusqueda(e.target.value)}
                    />
                    <button className="btn btn-outline-success">Buscar</button>
                </div>
            </div>

            {/* CARRUSEL DE CATEGORÍAS */}
            <div className="text-center mb-5">
                <h3 className="text-secondary fw-bold mb-4">Explorar Categorías</h3>
                <div className="d-flex justify-content-center gap-3 flex-wrap">
                    {CATEGORIAS_LISTA.map(cat => (
                        <div 
                            key={cat.id}
                            onClick={() => setFiltro(cat.id)}
                            className={`card category-card shadow-sm ${filtro === cat.id ? 'active-category' : ''}`}
                            style={{ width: '120px', cursor: 'pointer', transition: 'all 0.3s' }}
                        >
                            <div className="card-body text-center">
                                <div className="display-4 mb-2">{cat.icono}</div>
                                <h6 className="fw-bold m-0">{cat.nombre}</h6>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* TÍTULO DE SECCIÓN */}
            <div className="mb-4 border-bottom pb-2">
                <h2 className="text-success fw-bold text-capitalize">
                    {CATEGORIAS_LISTA.find(c => c.id === filtro)?.nombre || 'Productos'}
                </h2>
                <p className="text-muted">Mostrando {productosFiltrados.length} resultados</p>
            </div>

            {/* GRILLA DE PRODUCTOS */}
            {loading ? (
                <p className="text-center">Cargando catálogo...</p>
            ) : (
                <Row>
                    {productosFiltrados.length > 0 ? (
                        productosFiltrados.map(prod => (
                            <Col md={3} sm={6} key={prod.producto_id} className="mb-4">
                                <div className="card h-100 border-0 shadow-sm product-hover">
                                    <div className="ratio ratio-1x1 bg-light rounded-top overflow-hidden">
                                        {prod.imagenData ? (
                                            <img 
                                                src={`data:image/jpeg;base64,${prod.imagenData}`} 
                                                alt={prod.nombre_producto} 
                                                style={{objectFit: 'cover', width: '100%', height: '100%'}}
                                            />
                                        ) : <span className="text-muted d-flex align-items-center justify-content-center">Sin Foto</span>}
                                    </div>
                                    <div className="card-body d-flex flex-column">
                                        <h5 className="card-title text-dark fw-bold text-truncate">{prod.nombre_producto}</h5>
                                        <div className="mt-auto d-flex justify-content-between align-items-center">
                                            <span className="text-success fw-bold fs-5">${prod.precio_producto}</span>
                                            <button 
                                                className="btn btn-dark btn-sm rounded-pill px-3"
                                                onClick={() => agregarACarrito(prod)}
                                            >
                                                + Añadir
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </Col>
                        ))
                    ) : (
                        <div className="text-center py-5 text-muted">
                            <h4>🍂 No encontramos productos en esta categoría.</h4>
                            <p>Intenta seleccionar "Todas" para ver el catálogo completo.</p>
                        </div>
                    )}
                </Row>
            )}
        </Container>
    );
}

export default Categorias;