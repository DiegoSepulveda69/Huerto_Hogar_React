import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'; 
import { AppContext } from '../../context/AppContextProvider.jsx';

function Inicio_sesion() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate();
    const { setUsuarioLogueado } = useContext(AppContext);

    useEffect(() => {
        document.body.classList.add('iniciar-sesion');
        return () => {
            document.body.classList.remove('iniciar-sesion');
        };
    }, []);

    const handleLoginSuccess = (usuarioData, redirectPath) => {
        setUsuarioLogueado(usuarioData);
        navigate(redirectPath);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!email.trim() || !password.trim()) {
            setError('Por favor completa todos los campos.');
            return;
        }

        setIsLoading(true);

        try {
            // 1. PETICIÓN A LA NUEVA RUTA SEGURA
            const response = await axios.post('http://localhost:8080/api/v1/auth/authenticate', {
                email: email,
                password: password
            });

            // 2. EXTRAER TOKEN Y USUARIO
            const { token, usuario } = response.data;
            
            console.log("Login exitoso. Token:", token);

            // 3. GUARDAR EN STORAGE (Para persistencia)
            localStorage.setItem('token', token);
            localStorage.setItem('usuario', JSON.stringify(usuario));
            
            // 4. PREPARAR DATOS PARA EL CONTEXTO
            // Aseguramos que el rol venga en minúsculas para comparar
            const rolUsuario = (usuario.role || 'cliente').toLowerCase();
            
            const userData = { 
                id: usuario.id,
                nombre: usuario.nombre || 'Usuario', 
                email: usuario.email,
                rol: rolUsuario
            };
      
            // 5. REDIRECCIÓN
            if (rolUsuario === 'admin') {
                handleLoginSuccess(userData, '/administrador');
            } else {
                handleLoginSuccess(userData, '/');
            }

        } catch (err) {
            console.error("Error de login:", err);

            if (err.response) {
                // Spring Security devuelve 403 Forbidden si las credenciales fallan
                if (err.response.status === 403) {
                    setError('Correo o contraseña incorrectos.');
                } else {
                    setError('Error al iniciar sesión. Intenta nuevamente.');
                }
            } else if (err.request) {
                setError('No se pudo conectar con el servidor. Verifica que Spring Boot esté corriendo.');
            } else {
                setError('Ocurrió un error inesperado.');
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        // Usamos 'login-container' para respetar el CSS que arregla el navbar
        <div className="login-container">
            
            <form className="formulario p-4 rounded shadow" onSubmit={handleSubmit} style={{ width: '350px', background: '#fff' }}>
                <h2 className="text-center mb-4">Iniciar sesión</h2>

                {error && <div className="alert alert-danger">{error}</div>}

                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required
                        className="form-control"
                        placeholder="Ingrese su correo"
                    />
                </div>

                <div className="mb-3"> 
                    <label htmlFor="password" className="form-label">Contraseña</label>
                    <input
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        required
                        className="form-control"
                        placeholder="Ingrese su contraseña"
                    />
                    <small
                        className="text-secondary d-block mt-1"
                        style={{ cursor: 'pointer' }}
                        onClick={() => setShowPassword(prev => !prev)}
                    >
                        {showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                    </small>
                </div>

                <button
                    type="submit"
                    disabled={isLoading}
                    className="btn btn-primary w-100 mb-3"
                >
                    {isLoading ? 'Verificando...' : 'Ingresar'}
                </button>

                <p className="text-center">
                    ¿No tienes cuenta? <Link to="/registro">Registrarse</Link>
                </p>
            </form>
        </div>
    );
}

export default Inicio_sesion;







