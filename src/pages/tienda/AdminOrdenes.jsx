import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AppContext } from '../../context/AppContextProvider.jsx';
import { useNavigate } from 'react-router-dom';

function AdminOrdenes() {
    const [ordenes, setOrdenes] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    
    const { usuarioLogueado } = useContext(AppContext);
    const navigate = useNavigate();

    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        const date = new Date(dateString);
        return date.toLocaleDateString('es-CL', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const calculateTotal = (detalles) => {
        return detalles ? detalles.reduce((sum, detalle) => sum + detalle.subtotal, 0) : 0;
    };

    useEffect(() => {
        if (usuarioLogueado?.rol !== 'admin') {
            navigate('/'); 
            return;
        }

        const token = localStorage.getItem('token');
        if (!token) {
            setError('No hay token de autenticación.');
            setIsLoading(false);
            navigate('/inicio_sesion');
            return;
        }

        const fetchOrdenes = async () => {
            try {
                
                const response = await axios.get('http://localhost:8080/api/ordenes/admin/all', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                
                const ordenesConTotal = response.data.map(orden => ({
                    ...orden,
                    total: orden.total || calculateTotal(orden.detalles),
                    fechaCreacion: orden.fechaCreacion || orden.fecha
                }));

                setOrdenes(ordenesConTotal);
                setError(null);
            } catch (err) {
                console.error("Error al obtener las órdenes:", err);
                
                if (err.response && (err.response.status === 403 || err.response.status === 401)) {
                    setError('Acceso denegado. Asegúrate de que tu token sea de administrador.');
                } else {
                    setError('Error al conectar con el servidor para obtener órdenes.');
                }
            } finally {
                setIsLoading(false);
            }
        };

        fetchOrdenes();
    }, [usuarioLogueado, navigate]);


    if (isLoading) {
        return <div className="admin-content p-4">Cargando órdenes...</div>;
    }

    if (error) {
        return <div className="admin-content p-4"><div className="alert alert-danger">{error}</div></div>;
    }
    
    return (
        <div className="admin-content p-4">
            <header className="admin-header mb-4">
                <h2>Gestión de Órdenes</h2>
                <p className="text-muted">Lista de todas las órdenes de compra realizadas por clientes.</p>
            </header>

            {ordenes.length === 0 ? (
                <div className="alert alert-info">Aún no hay órdenes registradas.</div>
            ) : (
                <div className="table-responsive">
                    <table className="min-w-full bg-white rounded shadow-md">
                        <thead className="bg-gray-100 border-b">
                            <tr>
                                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">ID</th>
                                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">Cliente</th>
                                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">Fecha</th>
                                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">Total</th>
                                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">Estado</th>
                                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">Detalles</th>
                            </tr>
                        </thead>
                        <tbody>
                            {ordenes.map(orden => (
                                <tr key={orden.id} className="border-b hover:bg-gray-50">
                                    <td className="py-3 px-4 text-sm">{orden.id}</td>
                                    <td className="py-3 px-4 text-sm">
                                        {orden.nombreCliente} <br/> 
                                        <small className="text-gray-500">{orden.emailCliente}</small>
                                    </td>
                                    <td className="py-3 px-4 text-sm">{formatDate(orden.fechaCreacion)}</td>
                                    <td className="py-3 px-4 text-sm font-bold">${orden.total ? orden.total.toLocaleString('es-CL') : 'N/A'}</td>
                                    <td className="py-3 px-4 text-sm">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                                            ${orden.estado === 'ENTREGADO' ? 'bg-green-100 text-green-800' :
                                              orden.estado === 'ENVIADO' ? 'bg-blue-100 text-blue-800' :
                                              orden.estado === 'CANCELADO' ? 'bg-red-100 text-red-800' :
                                              'bg-yellow-100 text-yellow-800'
                                            }`}>
                                            {orden.estado}
                                        </span>
                                    </td>
                                    <td className="py-3 px-4 text-sm">
                                        {orden.detalles?.length || 0} items
                                        <button 
                                            className="ml-2 text-indigo-600 hover:text-indigo-900 text-xs"
                                            onClick={() => alert(`Detalles de la Orden ${orden.id}:\n${JSON.stringify(orden.detalles, null, 2)}`)}
                                        >
                                            Ver
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

export default AdminOrdenes;