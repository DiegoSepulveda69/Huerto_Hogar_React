import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AppContext } from '../../context/AppContextProvider';
import { useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';
import Modal from 'react-bootstrap/Modal'; 
import Form from 'react-bootstrap/Form';   

const statusClass = (role) => {
    if (!role) return 'bg-secondary text-white';
    const r = role.toUpperCase();
    if (r === 'ADMIN') return 'bg-danger text-white'; 
    if (r === 'USER') return 'bg-success text-white'; 
    return 'bg-warning text-dark';
};

function AdminUsuarios() {
    const [usuarios, setUsuarios] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false); 
    const [usuarioEditado, setUsuarioEditado] = useState(null); 
    const [rolOriginal, setRolOriginal] = useState(null); 
    
    const { usuarioLogueado } = useContext(AppContext);
    const navigate = useNavigate();

    const fetchUsuarios = async () => {
        setIsLoading(true);
        setError(null);
        
        const token = localStorage.getItem('token');

        if (usuarioLogueado?.rol !== 'admin' || !token) {
             navigate('/inicio_sesion'); 
             return;
        }

        try {
            const response = await axios.get('http://localhost:8080/api/v1/auth/admin/users', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setUsuarios(response.data);
        } catch (err) {
            console.error("Error al obtener usuarios:", err);
            setError('Acceso denegado o error de servidor al cargar usuarios.');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchUsuarios();
    }, [usuarioLogueado, navigate]); 

    const handleDelete = async (id, email) => {
        if (!window.confirm(`¿Estás seguro de que deseas eliminar al usuario ${email}?`)) return;

        const token = localStorage.getItem('token');
        try {
            await axios.delete(`http://localhost:8080/api/v1/auth/admin/users/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            fetchUsuarios(); 
        } catch (err) {
            console.error("Error al eliminar:", err);
            setError('Error al eliminar. Puede que no tengas permiso o es el administrador principal.');
        }
    };
    
    const handleEditClick = (user) => {
        const upperCaseRole = user.role.toUpperCase();
        setUsuarioEditado({ 
            ...user, 
            role: upperCaseRole 
        });
        setRolOriginal(upperCaseRole); 
        setShowModal(true);
    };

    const handleSaveEdit = async () => {
        if (!usuarioEditado) return;
        
        if (usuarioEditado.id === usuarioLogueado.id && usuarioEditado.role !== 'ADMIN') {
            setError('No puedes quitarte el rol de administrador a ti mismo.');
            setShowModal(false);
            return;
        }

        const token = localStorage.getItem('token');
        
        try {
            await axios.put(`http://localhost:8080/api/v1/auth/admin/users/${usuarioEditado.id}`, 
                { role: usuarioEditado.role }, 
                { headers: { Authorization: `Bearer ${token}` } }
            );

            setShowModal(false);
            setUsuarioEditado(null);
            setRolOriginal(null);
            fetchUsuarios(); 
            
        } catch (err) {
            console.error("Error al guardar edición:", err);
            let errorMessage = 'Error al actualizar el rol.';
            if (err.response && err.response.data && err.response.data.message) {
                 errorMessage = err.response.data.message; 
            }
            setError(errorMessage);
        }
    };


    if (isLoading) return <div className="admin-content p-4">Cargando usuarios...</div>;
    if (error) return (
        <div className="admin-content p-4">
            <div className="alert alert-danger mb-4">{error}</div>
            <Button variant="primary" onClick={() => setError(null)}>Cerrar Error</Button>
            <hr />
        </div>
    );

    return (
        <div className="admin-content p-4">
            <Container fluid>
                <header className="admin-header mb-4">
                    <h2>Gestión de Cuentas de Usuario</h2>
                    <p className="text-muted">Revisar y administrar roles de clientes y personal.</p>
                </header>

                <div className="table-responsive">
                    <Table striped bordered hover size="sm">
                        <thead className="table-dark">
                            <tr>
                                <th>ID</th>
                                <th>Nombre</th>
                                <th>Email</th>
                                <th>Rol</th>
                                <th>Teléfono</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {usuarios.map(user => (
                                <tr key={user.id}>
                                    <td>{user.id}</td>
                                    <td>{user.nombre}</td>
                                    <td>{user.email}</td>
                                    <td>
                                        <Badge className={statusClass(user.role)}>
                                            {user.role}
                                        </Badge>
                                    </td>
                                    <td>{user.telefono || 'N/A'}</td>
                                    <td className='d-flex gap-2'>
                                        <Button 
                                            variant="secondary" 
                                            size="sm" 
                                            onClick={() => handleEditClick(user)} 
                                        >
                                            Editar
                                        </Button>
                                        <Button 
                                            variant="danger" 
                                            size="sm" 
                                            onClick={() => handleDelete(user.id, user.email)}
                                            disabled={user.role === 'ADMIN'}
                                        >
                                            Eliminar
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
                {usuarios.length === 0 && <div className="alert alert-info mt-3">No hay usuarios registrados en el sistema.</div>}
            </Container>
            
            <Modal show={showModal} onHide={() => setShowModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Editar Rol de {usuarioEditado?.nombre}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Usuario: <strong>{usuarioEditado?.email}</strong></p>
                    <Form.Group>
                        <Form.Label>Seleccionar Nuevo Rol:</Form.Label>
                        <Form.Select 
                            value={usuarioEditado?.role}
                            onChange={(e) => setUsuarioEditado({...usuarioEditado, role: e.target.value})}
                        >
                            <option value="USER">USER (Cliente)</option>
                            <option value="ADMIN">ADMIN (Administrador)</option>
                        </Form.Select>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Cancelar
                    </Button>
                    <Button 
                        variant="primary" 
                        onClick={handleSaveEdit} 
                        disabled={!usuarioEditado || usuarioEditado.role === rolOriginal}
                    >
                        Guardar Cambios
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default AdminUsuarios;